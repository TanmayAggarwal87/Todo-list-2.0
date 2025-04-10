import { Ellipsis , Loader2, Star } from 'lucide-react'
import React, {useEffect, useState } from 'react'
import members from "../assets/users.json"
import { useTaskStore } from '../store/useTaskStore'
import { useAuthStore } from '../store/useAuthStore'
import { useMembersStore } from '../store/useMembersStore'

function TodoTask() {

  const [addNewTask,setAddNewTask] = useState({
    task:"",
  })
  const {authUser} = useAuthStore()
  const{addTask,displayTask,tasks,deleteTask,completeTask,starredTasks,assignTask,unassignTask} = useTaskStore()
  const {members} = useMembersStore()

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!addNewTask.task.trim()) return; 

    addTask(addNewTask);
    setAddNewTask({ task: "" });
    await displayTask()
  }

  const isAdmin = members?.[0]?.user?._id === authUser?._id;
  const isAssigned = (task) => task?.assignedTo === authUser?._id;

const groupedTasks = tasks.reduce((acc, task) => {
  const assignedMember = members.find(m => m.user._id === task.assignedTo);
  const assignedTo = assignedMember ? assignedMember.user.name : "Open to all";
  if (!acc[assignedTo]) acc[assignedTo] = [];
  acc[assignedTo].push(task);
  return acc;
}, {});

// Sort each group based on priority
Object.keys(groupedTasks).forEach(group => {
  groupedTasks[group].sort((a, b) => {
    // Sort by: starred & not completed → starred & completed → unstarred & not completed → unstarred & completed
    const getPriority = (task) => {
      if (task.isStarred && !task.isCompleted) return 0;
      if (task.isStarred && task.isCompleted) return 1;
      if (!task.isStarred && !task.isCompleted) return 2;
      return 3; // unstarred + completed
    };
    return getPriority(a) - getPriority(b);
  });
});
 
  useEffect(()=>{ displayTask() },[])

  return (
    <div className=''>
      <form onSubmit = {handleSubmit}>
        <div className="flex justify-center items-center flex-row w-[500px] mt-4">
          <input className='input m-3 max-w-full' value={addNewTask.task} 
          onChange={(e)=>setAddNewTask({...addNewTask,task:e.target.value})}></input>
          <button className='btn btn-primary' type='submit'>Add Task</button>
        </div>
      </form>
      
      <div className='m-4 space-y-6'>
        {Object.entries(groupedTasks).map(([userName, userTasks]) => (
          <div key={userName}>
            <h2 className="text-lg font-bold mb-2 ml-2">{userName}</h2>
            <ul className="list bg-base-100 rounded-box shadow-md">
              {userTasks.map((task,index)=>(
                <li key={task._id} id={`list-${task._id}`} className={`list-row list transition duration-500 
                  ${task.isCompleted
                    ? "bg-white border-2 border-gray-600 text-black"
                    : "bg-primary/100 text-white " 
                  } 
                  ${task.isStarred 
                    ? "bg-gradient-to-r bg-primary/100 to-yellow-500" 
                    : "bg-primary/100"
                  } 
                  ${task.isStarred && task.isCompleted 
                    ?"bg-gradient-to-r from-[#ffffff] to-yellow-500 text-black" 
                    :" bg-primary/100" 
                  } mb-2`}>
                  <input type="checkbox"  className="checkbox border-white bg-transparent checked:bg-white
                  checked:text-black checked:border-black"
                  disabled={!(isAssigned(task) || isAdmin)} 
                  checked={task.isCompleted}
                  onChange={()=>completeTask(task._id)}/>
                  {task.task}
                  <div className="dropdown cursor-pointer ">
                    <div tabIndex={0} role="button" className=" cursor-pointer m-1"><Ellipsis/></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 border-2 border-black rounded-box z-1 w-52 p-2 text-black shadow-sm relative right-5 md:left-0">
                      <li><button onClick={() => starredTasks(task._id)} className='flex justify-between items-center'><div>Star</div>
                      <div>
                          <Star className="transition-all duration-300"
                          size={24}
                          stroke={task.isStarred ? "yellow" : "gray"}
                          fill={task.isStarred? "yellow" : "none"}/>
                      </div> </button></li>

                      {isAdmin
                      ?<li>
                      {!task.assignedTo 
                      ?
                      <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className=" mb-1">Assign to </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm">
                          {members.map((member)=>(
                            <li key={member.user._id}><a  onClick={() => assignTask(task._id,member.user._id,member.user.name)} >{member.user.name}</a></li>
                          ))}
                        </ul>
                      </div>
                      :<div className='flex justify-center items-center p-0 mb-1'><button className='mb-1 btn btn-warning w-full'onClick={() => unassignTask(task._id)}>Unassign</button></div>
                      }
                      </li>
                      :<ul></ul>}
                      
                      <li><button className='btn btn-error' onClick={()=>deleteTask(task._id)}>Delete Task</button></li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoTask
