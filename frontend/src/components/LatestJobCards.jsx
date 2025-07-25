import React from 'react'
import { Badge } from './ui/badge'
import { Ghost } from 'lucide-react'

const LatestJobCards = () => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer '>
      <div>
        <h1 className='font-medium text-lg'>company Name</h1>
        <p className='text-sm text-gray-600'>India</p>
      </div>

      <div>
        <h1>Job Title</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing Lorem ipsum dolor sit amet.</p>
      </div>

      <div className='flex items-center gap-2 mt-4 '>
        <Badge className="text-blue-700 font-bold " variant="ghost">12 Position</Badge>
        <Badge className="text-[#F83002] font-bold " variant="ghost">Part Time</Badge>
        <Badge className="text-[#7209b7] font-bold " variant="ghost">20LPA</Badge>

      </div>

    </div>
  )
}

export default LatestJobCards