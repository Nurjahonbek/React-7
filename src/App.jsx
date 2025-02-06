
import { useState, useEffect } from 'react'
import image from './assets/btn.create.png'
import del from './assets/Group 2.png'
import back from './assets/back.svg'
import done from './assets/Vector.svg'

import { ToastContainer, Slide, toast } from 'react-toastify';
import './App.css'

function App() {

    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])

    const notify = () =>
      toast.success('Todo muvaffaqiyatli qo`shildi', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
        });

    function addTask() {
      if (task.trim()) {
        const newtask = {id: Date.now(), text: task, isdone: false }
        const up = [...tasks, newtask]
        setTasks(up)
        update(up)
        setTask("")
        notify()
      }
    }

    useEffect(() => {
      const save = JSON.parse(localStorage.getItem("tasks")) || []
      setTasks(save)
    }, [])

    function update(up) {
      localStorage.setItem('tasks', JSON.stringify(up))
    }

    function removeTask(id) {
      const up = tasks.filter(task => task.id !== id)
      setTasks(up)
      update(up)

      toast.success('Muvaffaqiyatli o`chirildi', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        });
    }

    function doneTask(id) {
      const up = tasks.map(task =>
        task.id == id ? { ...task, isdone: true } : task
      )
      setTasks(up)
      update(up)
      toast.success('Siz bu Todoni bajarib bo`ldingiz ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        });
    }

    function editTask(id) {
      const up = tasks.map(task =>
        task.id == id ? { ...task, isdone: false } : task
      )
      setTasks(up)
      update(up)

      toast.success('Sizning mashqingiz Todoga qo`shildi', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        });
    }
    
    useEffect(() => {
      const loader = document.querySelector(".gif")
      if (loader) {
        loader.classList.add("disppear")
      }
    }, [])
    
    return (
      <div>
        <div className="container">
        <div className="gif">
        <img src='https://pichold.ru/wp-content/uploads/2022/11/%D0%BA%D0%B5%D0%BA%D0%BF-54.gif' />
        </div>
          <h1><span>T</span>o<span>d</span>o <span>A</span>pp</h1>
          <div className="box">
            <input type="text" id='text' value={task} 
              onChange={(e) => setTask(e.target.value)} 
              placeholder="Add a new task"
               onKeyDown={(e) => e.key == 'Enter' && addTask()} />
            <button onClick={addTask}>
              <img src={image} />
            </button>
          </div>
          <div className="counter" style={{ display: tasks.length > 0 ? 'block' : 'none' }}>
            Tasks to do - {tasks.filter(t => !t.isdone).length}
          </div>
          <ul className="list">
            {tasks.filter(t => !t.isdone).map((task) => 
              (<li key={task.id}>
                {task.text}
                <div className='btn-box'>
                  <button onClick={() => doneTask(task.id)}>
                    <img src={done} />
                  </button>
                  <button onClick={() => removeTask(task.id)}>
                    <img src={del} />
                  </button>
                </div>
              </li>))}
          </ul>
          <div className="counter" style={{ display: tasks.some(t => t.isdone) ? 'block' : 'none' }}>
            Done - {tasks.filter(t => t.isdone).length}
          </div>

          <ul className="list list1">
            {tasks.filter(t => t.isdone).map((task) => 
              (<li key={task.id}>
                {task.text}
                <button onClick={() => editTask(task.id)}>
                  <img src={back} />
                </button>
              </li>))}
          </ul>
                <ToastContainer />
        </div>
      </div>
    )
}

export default App



