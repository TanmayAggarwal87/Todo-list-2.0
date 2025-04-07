import { Ellipsis , Loader2, Star } from 'lucide-react'
import React, {useEffect, useState } from 'react'
import members from "../assets/users.json"
import { useTaskStore } from '../store/useTaskStore'



function TodoTask() {
  const [TodoTask,setTodoTask] = useState(["Eat","Code","Sleep"])
  const [newTask,setNewTask]= useState("")
  const [users,setUsers] = useState(members)
  const [addNewTask,setAddNewTask] = useState({
    task:"",
  })
  const{addTask,displayTask,tasks,deleteTask} = useTaskStore()


// with backend fuvntionality
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!addNewTask.task.trim()) return; 

    addTask(addNewTask);
    setAddNewTask({ task: "" });
    displayTask()
  }

  // with backend


  
    


// no backend funvtionality
  function handleCompletedTask(event) {
    const listItem = event.target.closest("li") 

    if (event.target.checked) {
      listItem.classList.add("bg-white", "text-gray-500","border-2", "border-gray-600")
      listItem.classList.remove("bg-[#422ad5]", "text-white")
    } else {
      listItem.classList.remove("bg-white", "text-gray-500","border-2", "border-gray-600")
      listItem.classList.add("bg-[#422ad5]", "text-white")
    }
  }

  const [starredTasks, setStarredTasks] = useState([]); 

  function toggleStar(index) {  
    setStarredTasks((prevStarredTasks) => {
      if (prevStarredTasks.includes(index)) {
        return prevStarredTasks.filter(i => i !== index);
      } else {
        return [...prevStarredTasks, index];
      }
    });
  }
 
  useEffect(()=>{ displayTask()  },[])
  console.log(tasks)
  return (
    <div className=''>
      <form onSubmit = {handleSubmit}>
        <div className="flex justify-center items-center flex-row w-[500px] mt-4">
          <input className='input m-3 max-w-full' value={addNewTask.task} 
          onChange={(e)=>setAddNewTask({...addNewTask,task:e.target.value})}></input>
          <button className='btn btn-primary' type='submit'>Add Task</button>
        </div>
      </form>
      
      <div className='m-4'>
      <ul className="list bg-base-100 rounded-box shadow-md">
        {!tasks?(
          <p>Nothing to do?</p>
        )
        :
        
          tasks.map((task,index)=>(
            <li key={index} id={`list-${task._id}`} className={`list-row list transition duration-500 
              ${starredTasks.includes(task._id) 
                ? "bg-gradient-to-r from-[#422ad5] to-yellow-500" 
                : "bg-[#422ad5] text-white"
              } mb-2 text-white`}>
              <input type="checkbox"  className="checkbox border-white bg-transparent checked:bg-white checked:text-black checked:border-black" onClick={handleCompletedTask}/>
              {task.task}
              <div className="dropdown cursor-pointer ">
                <div tabIndex={0} role="button" className=" cursor-pointer m-1"><Ellipsis/></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 border-2 border-black rounded-box z-1 w-52 p-2 text-black shadow-sm">
                  <li><button onClick={() => toggleStar(task._id)} className='flex justify-between items-center'><div>Star</div>
                  <div>
                      <Star className="transition-all duration-300"
                      size={24}
                      stroke={starredTasks.includes(task._id) ? "yellow" : "gray"}
                      fill={starredTasks.includes(task._id) ? "yellow" : "none"}/>
                  </div> </button></li>
                  <li>
                    
                    <div className="dropdown dropdown-hover">
                      <div tabIndex={0} role="button" className=" m-1">Assign to </div>
                      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {members.map((member,index)=>(
                          <li key={member.id}><a>{member.name}</a></li>
                          

                        ))}
                        
                      </ul>
                    </div>
                    
                  </li>
                  <li><button className='btn btn-error' onClick={()=>{deleteTask(task._id); displayTask()}}>Delete Task</button></li>
                </ul>
              </div>
              
            </li>
          ))}
      </ul>
        
      </div>

      
    </div>
  )
}

export default TodoTask