import React from 'react'
import dynamic from 'next/dynamic'
import TaskList from '@/components/task/TaskList'
import ProtectedRoute from '@/components/route/ProtectedRoute'

const DynamicNavigation = dynamic(
  () => import('../../components/base/Navigation'),
  { ssr: !!false }
)

const Tasks = () => {
  return (
    <ProtectedRoute>
      <DynamicNavigation />
      <div className='flex justify-center py-6'>
        <TaskList />
      </div>
    </ProtectedRoute>
  )
}

export default Tasks