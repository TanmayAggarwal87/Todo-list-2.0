import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import TodoTask from './Components/TodoTask'
import Members from './Components/Members'
import {createBrowserRouter, Routes,Route, Navigate} from "react-router-dom"
import Home from './pages/Home'
import SettingsPage from './pages/SettingsPage'
import { useAuthStore } from './store/useAuthStore'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import PageNotFound from './pages/PageNotFound'
import { Loader, Loader2 } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'



function App() {

  const {checkAuth, authUser,isCheckingAuth} = useAuthStore();
  const {theme} = useThemeStore()

  useEffect(()=>{
    checkAuth()

  },[checkAuth])


  if(isCheckingAuth && !authUser){
    return(
      <div className='flex justify-centre items-center h-screen w-full'>
        <Loader2 className="size-10 animate-spin"/>
      </div>
    )

  }

  return (
    <div data-theme={theme} className='min-h-screen max-h-full'>
      <Navbar/>

      <Routes>
        <Route path='/' element={authUser?<Home/>:<Navigate to="/login"/>}/>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
        <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to="/"/>}/>
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>

        <Route path='*' element={<PageNotFound/>}/>
        
      </Routes>
      <Toaster/>
      

    </div>
  )
}

export default App
