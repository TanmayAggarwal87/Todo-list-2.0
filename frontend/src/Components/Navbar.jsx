import React from 'react'
import {Settings,LogOut,NotepadText, User} from "lucide-react"
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'



function Navbar() {


  const {authUser,logout}= useAuthStore()
  return (
    <div className=' flex justify-between text-center flex-row max-w-screen py-2 mx-2'>
        <div className='logo  flex justify-centre items-center text-center font-bold '>
          <div className='bg-primary/10 p-2 rounded-xl mr-2'>
          <Link to="/"><NotepadText className='text-primary' /> </Link>
          
          </div>
        ToDo<span className='text-primary/100 '>Share</span>

        </div>
        <div className="items flex justify-centre items-center relative text-center  mr-2 gap-2.5">
        
          <Link to="/settings">
            <button className='cursor-pointer'>
              <div className='flex justify-centre text-centre mr-3 '><Settings size={20} /> 
              <span className='hidden md:flex'>Settings</span>
              </div>
            </button>
          </Link>
          <Link to="/profile">
          <button className='cursor-pointer'>
              <div className='flex justify-centre text-centre mr-3 '><User  size={20}   /> 
                <span className='hidden md:flex'>Profile</span>
              </div>
            </button>
          </Link>

           {authUser
           ?<button className='cursor-pointer' onClick={logout}><div className='flex justify-centre text-centre'><LogOut size={20} className=''/><span className='hidden md:flex'>Logout</span></div></button>
           :<div></div>} 
          
        </div>
    </div>
  )
}

export default Navbar