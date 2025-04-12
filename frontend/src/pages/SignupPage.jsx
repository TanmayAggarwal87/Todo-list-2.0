import { Eye, EyeOff, Loader2, Lock, Mail, NotepadText, User } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from "react-hot-toast"
import TodoAuthPattern from '../Components/TodoAuthPattern';


function SignupPage() {
  
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })
  const {signup,isSigningUp} = useAuthStore()
  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  }

  return (
    <div className='h-screen flex justify-between items-center'>
      <div className='h-screen w-full flex justify-center items-center max-h-full '>
        <div className='flex justify-center items-center flex-col '>
          <div id="intro" className='flex justify-center items-center flex-col gap-1 mb-24'>
            <div className='bg-primary/10 rounded-xl p-2'>
              <NotepadText size={35} className='text-primary'/>
            </div>
            
            <span className='font-bold text-xl'>Create Account</span>
            <span className='font-semibold text-lg text-gray-500'>Get started with your free account</span>

          </div>
          <form id="form" className='flex justify-center items-center flex-col ' onSubmit={handleSubmit}>
          <div className='flex flex-col items-start justify-center '>
              <span className='mb-1 font-medium'>Full Name</span>
              
              <div className='relative'>
                <User color='gray' size={18} className='absolute left-2 top-5.5 transform -translate-y-1/2 z-10' />
                <input type="text" placeholder="John Doe" 
                  className="input w-xs md:w-md mb-8 pl-8 border border-gray-300 rounded-xl" 
                  value={formData.name}
                  onChange={(e)=>setFormData({...formData,name:e.target.value})}
                />
                
              </div>
            </div>

            <div className='flex flex-col items-start justify-center '>
              <span className='mb-1 font-medium'>Email</span>
              
              <div className='relative'>
                <Mail color='gray' size={18} className='absolute left-2 top-5.5 transform -translate-y-1/2 z-10' />
                <input type="text" placeholder="JohnDoe@gmail.com" 
                  className="input w-xs md:w-md mb-8 pl-8 border border-gray-300 rounded-xl" 
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                />
                
              </div>
            </div>

          
            <div className="form-control flex justify-center items-start flex-col">
              <label className="flex justify-center items-start ">
                <span className="label-text font-medium mb-1 ">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-xs md:w-md pl-10 rounded-xl`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

          
            <button className="btn btn-wide btn-primary max-w-md max-h-screen py-6 mt-8" type='submit' disabled={isSigningUp}>
              {isSigningUp ?(
                <>
                  <Loader2 className='h-5 w-5 animate-spin'/>
                  Loading.....
                </>
              ):(
              
              "Sign In"
              )
              }
            
              </button>
            <div className="text-center mt-5">
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Login
                </Link>
              </p>
            </div>

          

          </form>

        </div>

      </div>
      <div className=' h-screen w-full hidden lg:flex'>
        <TodoAuthPattern
        title={"Join our community"}
        subtitle={"Create an account to start organizing your life, one task at a time."}
        />  

      </div>
    </div>
  )
}

export default SignupPage