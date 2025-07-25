// import React from 'react'
// import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
// import { Button } from '../ui/button'
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
// import { User2, LogOut, Store } from 'lucide-react' // ✅ Corrected icon import
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios';
// import { setuser } from "@/redux/authSlice";
// import toast from 'react-hot-toast'


// const Navbar = () => {

//     const { user } = useSelector(store => store.auth);
//     const dispatch = useDispatch();
//          const navigate = useNavigate();

//     const logoutHandler  = async()=>{
//           try {
//             const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});

//             if(res.data.success){
//                  dispatch(setuser(null));
//                 navigate("/");
//                 toast.success(res.data.message);
//             }
            
//           } catch (error) {
//             console.log("error");
//             toast.error(error.response.data.message || "Logout failed");
//           }
//     };

//     return (
//         <div className='bg-white'>
//             <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>

//                 <div>
//                     <h1 className='text-2xl font-bold'>
//                         Job <span className='text-[#F83002]'>Portal</span>
//                     </h1>
//                 </div>

//                 <div className='flex items-center gap-12'>
//                     <ul className='flex font-medium items-center gap-5'>
//                         <li><Link to="/">Home</Link></li>
//                         <li><Link to="/jobs">Jobs</Link></li>
//                         <li><Link to="/browse">Browse</Link></li>
//                     </ul>

//                     {
//                         !user ? (
//                             <div className="flex items-center gap-2">
//                                 <Link to="/login"><Button variant="outline">Login</Button></Link>
//                                 <Link to="signup"> <Button className="bg-[#6A38C2] hover:bg-[#5b38a6] ">Signup</Button></Link>

//                             </div>
//                         ) : (
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Avatar className="h-9 w-9 rounded-full overflow-hidden cursor-pointer">
//                                         <AvatarImage
//                                             src="https://github.com/shadcn.png"
//                                             alt="@shadcn"
//                                             className="object-cover h-full w-full"
//                                         />
//                                     </Avatar>

//                                 </PopoverTrigger>

//                                 <PopoverContent className="p-4 bg-white rounded-md shadow-md w-fit">
//                                     <div className="flex items-center gap-4">
//                                         <Avatar className="h-10 w-10 rounded-full overflow-hidden">
//                                             <AvatarImage
//                                                 src="https://github.com/shadcn.png"
//                                                 alt="@shadcn"
//                                                 className="object-cover h-full w-full"
//                                             />
//                                         </Avatar>
//                                         <div>
//                                             <h4 className='font-medium text-sm'>{user.fullname}</h4>
//                                             <p className='text-sm text-muted-foreground'>{user.email}</p>
//                                         </div>
//                                     </div>

//                                     <div className="mt-3 flex flex-col items-start gap-4">
//                                         {/* View Profile */}<div>
//                                         <span className="text-sm text-gray-800 cursor-pointer hover:underline flex items-center gap-1">
//                                             <User2 className="h-4 w-4" />
//                                             <Link to="/profile">
//                                                 <Button variant="link">View Profile</Button>
//                                             </Link>
//                                         </span>
//                                         </div>
//                                         {/* Logout */}
//                                         <div className="text-sm text-red-600 cursor-pointer flex items-center">
//                                        <LogOut/>
//                                        <Button onClick = {logoutHandler} variant ="link">Logout</Button>
//                                     </div>
//                              </div>


//                                 </PopoverContent>
//                             </Popover>
//                         )
//                     }
//                 </div>
//             </div>
//           </div>
//     )
// }

// export default Navbar


import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { User2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '@/utils/constant';



const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/browse">Browse</Link></li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b38a6]">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-9 w-9 rounded-full overflow-hidden cursor-pointer">
                  <AvatarImage
                    src= {user?.profile?.profilePhoto}
                    alt="User Avatar"
                    className="object-cover h-full w-full"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent
                className="p-4 bg-white rounded-md shadow-md w-64 z-[100]"
                sideOffset={8}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="User"
                      className="object-cover h-full w-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{user.fullname}</h4>
                    <p className="text-xs text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link to="/profile" className="flex items-center gap-2 text-sm hover:underline">
                    <User2 className="w-4 h-4" />
                    View Profile
                  </Link>

                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-sm text-red-600 hover:underline"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
