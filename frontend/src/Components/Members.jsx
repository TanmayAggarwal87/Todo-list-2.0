import React, { useState } from 'react'
import userJson from "../assets/users.json"
import { X } from 'lucide-react'
///
///
/// ABHI ADD USERS , REMOVE USERS WALA FEATURE PENDING H 
///
///
///


function Members() {
  const [member,setMember] = useState(userJson)
  return (
    <div>
      <div className="flex justify-center items-center flex-row w-[500px] mt-4">
        <input className='input m-3 max-w-full'></input>
        <button className='btn btn-warning'>Add Member</button>
      </div>

      <div>
        <ul className='list bg-base-100 rounded-box shadow-2xl mr-3 w-full '>
          {member.map((members,index)=>(
              <li className="list-row mt-0 w-full" key={members.id} >
                <div className='flex justify-between items-center flex-row w-[480px]'>
                  <div className='flex justify-center items-center flex-row'>
                    <div className='mr-3'><img className="size-10 rounded-box" src={members.avatar}/></div>
                    <div>
                      <div>{members.name}</div>
                      <div className="text-xs uppercase font-semibold opacity-60">{members.role}</div>
                    </div>
                  </div>
                    <div>
                      <button className='cursor-pointer'><X/></button>
                      
                    </div>
                  

                  
                </div>
                
              
              
            </li>

          ))}
        </ul>
      </div>
    </div>


  )
}
///
///
/// ABHI ADD USERS WALA FEATURE PENDING H 
///
///
//
export default Members