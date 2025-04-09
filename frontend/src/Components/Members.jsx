import React, { useState,useEffect } from 'react'
import userJson from "../assets/users.json"
import { X } from 'lucide-react'
import { useMembersStore } from '../store/useMembersStore'
///
///
/// ABHI ADD USERS , REMOVE USERS WALA FEATURE PENDING H 
///
///
///



function Members() {
   const [addNewMember,setAddNewMember] = useState({
      addMemberId:"",
    })
  const {members,addMember,getMembers,removeMembers} = useMembersStore();


  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!addNewMember.addMemberId.trim()) return; 

    addMember(addNewMember);
    setAddNewMember({ addMemberId: "" });
 
  }

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center flex-row w-[500px] mt-4">
          <input className='input m-3 max-w-full' value={addNewMember.addMemberId} 
            onChange={(e)=>setAddNewMember({...addNewMember,addMemberId:e.target.value})}></input>
          <button className='btn btn-warning' type='submit'>Add Member</button>
        </div>
      </form>
      

      <div>
        <ul className='list bg-base-100 rounded-box shadow-2xl mr-3 w-full '>
          {members.map((member)=>(
              <li className="list-row mt-0 w-full" key={member._id} >
                <div className='flex justify-between items-center flex-row w-[480px]'>
                  <div className='flex justify-center items-center flex-row'>
                    <div className='mr-3'><img className="size-10 rounded-box" src={member.user.profilePic} /></div>
                    <div>
                      <div>{member.user.name}</div>
                      <div className="text-xs uppercase font-semibold opacity-60">{member.role}</div>
                    </div>
                  </div>
                    <div>
                      <button className='cursor-pointer' onClick={()=>removeMembers(member.user._id)}><X/></button>
                      
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