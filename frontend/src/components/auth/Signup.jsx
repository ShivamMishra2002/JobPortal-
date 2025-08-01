
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link ,useNavigate} from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from "lucide-react";



const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""

    });
       const {loading}= useSelector(store=>store.auth)
       const dispatch  = useDispatch();
       const navigate = useNavigate();

       
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });

    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("password",input.password);
        formData.append("role",input.role);
                if(input.file){
                    formData.append("file",input.file);
                }


        try {

            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => navigate("/login"), 1500);
            }
            
        } catch (error) {
            const errMsg = error?.response?.data?.message || "Something went wrong";
            toast.error(errMsg);
        }
     finally {dispatch(setLoading(false));
     }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-[60%] border border-grey-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign up</h1>

                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type="text" value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter Full Name" />
                    </div>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter Email" />
                    </div>

                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter PhoneNumber" />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter Password" />
                    </div>

                    <div className='flex items-center justify-between gap-4 my-3'>
                        <RadioGroup defaultValue="student" className="flex items-center gap-6">
                            <div className="flex items-center space-x-2">
                                <input type="radio" name="role" value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer'
                                />

                                <Label htmlFor="student">Student</Label>
                            </div>


                            <div className="flex items-center space-x-2">
                                <input type="radio" name="role" value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className='cursor-pointer' />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>


                        </RadioGroup>

                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer min-w-[200px]"
                            />
                        </div>
                    </div>

                    {
                    loading ?<Button className="w-full my-4"> <Loader2 className = 'mr-2 h-4 w-4 animate-spin'/>Please Wait</Button> :   <Button type="submit" className='w-full my-4'>signup</Button>
                    }
                    <span className='text-sm'>Already have an account?<Link to="/login" className="text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;

