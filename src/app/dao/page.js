import Activeproposal from '@/Components/DAO/Activeproposal'
import Completedproposal from '@/Components/DAO/Completedproposal'
import Navbar from '@/Components/Navbar/Navbar'
import React from 'react'

function page() {
  return (
    <div className="h-screen text-black">
    <Activeproposal/>
    <Completedproposal/>
    </div>
  )
}

export default page
