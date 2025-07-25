
import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfiledialog from './UpdateProfiledialog'
import { useSelector } from 'react-redux'

// const skills = ["Html", "Css", "JavaScript", "ReactJs"];
const isResume = true;

const Profile = () => {


  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-6 my-6'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-4'>
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://img.freepik.com/free-psd/gradient-versus-logo-template_23-2151514112.jpg" alt="profile" />
            </Avatar>
            <div>
              <h2 className='font-semibold text-lg'>{user?.fullname} </h2>
              <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant='outline' size="icon">
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        <div className='mt-4 space-y-2 text-sm text-gray-700'>
          <div className='flex items-center gap-2'><Mail className="h-4 w-4" /> {user?.email} </div>
          <div className='flex items-center gap-2'><Contact className="h-4 w-4" /> {user?.phoneNumber}</div>
        </div>

        <div className='mt-4'>
          <h3 className='text-sm font-medium mb-1'>Skills:</h3>
          <div className='flex flex-wrap gap-2'>
            {user?.profile?.skills && user.profile.skills.length > 0 ? (
              user.profile.skills.map((item, i) => (
                <Badge key={i}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className='mt-4 text-sm'>
          <Label className='font-medium'>Resume:</Label><br />
          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user.profile.resume}
              className='text-blue-500 hover:underline'
            >
              {user.profile.resumeOriginalName || "View Resume"}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>

      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-xl p-6'>
        <h2 className='font-bold text-lg mb-4'>Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfiledialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
