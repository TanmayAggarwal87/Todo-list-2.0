import React from 'react'
import TodoTask from '../Components/TodoTask'
import Members from '../Components/Members'

function Home() {
  return (
    <div className='flex justify-between items-start flex-row mt-4'>
      <div className='flex justify-start items-start flex-col max-w-full'>
        <TodoTask/>
      </div>
      <div>
        <Members/>
      </div>
        
        
    </div>
  )
}

export default Home