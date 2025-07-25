import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge' // ✅ Import Badge
import { useNavigate } from 'react-router-dom'

const Job = () => {

  const navigate = useNavigate();
  const jobid = "dfjvndjtgn";
  return (
    <div className="border p-5 rounded-md shadow-xl max-w-md mx-auto mt-10">
      <div className="flex items-center justify-between mb-4">
        {/* Avatar on the left */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://img.freepik.com/free-psd/gradient-versus-logo-template_23-2151514112.jpg?semt=ais_hybrid&w=740" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-gray-700 text-medium">Company Name</p>
            <p className='text-gray-600'>India</p>
          </div>
        </div>

        {/* Right section: date + bookmark */}
        <div className="flex flex-col items-end">
          <p className="text-gray-500 text-sm mb-2">2 days ago</p>
          <Button variant="outline" size="icon" className="rounded-full">
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>
      </div>
         <h1 className='font-bold text-lg my-2 '>Title</h1>
      {/* Title at the bottom */}
      <p className="text-sm text-gray-700 mt-4 italic">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa debitis quasi expedita illo quia voluptatum natus ullam qui ut eum!
      </p>

      {/* Badges */}
      <div className='flex items-center gap-2 mt-4'>
        <Badge className="text-blue-700 font-bold" variant="ghost">12 Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">Part Time</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">20 LPA</Badge>
      </div>

      {/* Action Buttons */}
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick ={()=>navigate('/description/${jobid}')}variant='outline'>Details</Button>
        <Button className="bg-[#7209b7]">Save for Later</Button>
      </div>
    </div>
  )
}

export default Job
