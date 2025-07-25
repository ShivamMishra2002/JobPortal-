import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import toast from 'react-hot-toast'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios';


const UpdateProfiledialog = ({ open, setOpen }) => {
    const [loading,setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
         file: user?.resume
    });

   const dispatch = useDispatch();


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills || "");
    
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
              const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if(res.data.success){
            dispatch(setUser(res.data.user));
            toast.success(res.data.message);
            }
        } catch (error) {
            console.log("Caught error");
            toast.error(error?.response?.data?.message || "Something went wrong!");
        }

        finally{
            setLoading(false);
        }
        
    
        setOpen(false);
    };
    

    return (
        <div>
            <Dialog open={open} onOpenChange={(openState) => setOpen(openState)}>
                <DialogContent className="sm:max-w-[435px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className='text-right'>Name:</Label>
                                <Input
                                    id="name"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3" // ✅ Typo fix
                                />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className='text-right'>Email:</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3" // ✅ Typo fix
                                />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className='text-right'>Number:</Label>
                                <Input
                                    id="Number"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3" // ✅ Typo fix
                                />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className='text-right'>Bio:</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3" // ✅ Typo fix
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className='text-right'>skills:</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3" // ✅ Typo fix
                                />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className='text-right'>Resume:</Label>
                                <Input
                                    onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    className="col-span-3" // ✅ Typo fix
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button> : <Button type="submit" className='w-full my-4'>Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfiledialog


