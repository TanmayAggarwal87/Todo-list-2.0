import React from 'react'
import TodoTask from '../Components/TodoTask'
import Members from '../Components/Members'

function Home() {
  return (
    <div className='flex md:justify-between justify-center items-start md:flex-row flex-col mt-4'>
      <div className='flex justify-start items-start flex-col w-screen '>
        <TodoTask/>
      </div>
      <div className='w-full md:max-w-full'>
        <Members/>
      </div>
        
        
    </div>
  )
}

export default Home