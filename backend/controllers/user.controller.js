import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing ",
                success: false
            });
        };
              const file = req.file;
             const fileUri = getDataUri(file);
             // const cloudResponse = await cloudinary.uploader(fileUri.content);
             const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

                   

        // check krne ke liye is email se phle regis.hai ya nhi
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false,

            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // 10 is showing max length  of password
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}
// now for login  

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing ",
                success: false
            });
        };// check email
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password ",
                success: false,

            })
        }
        // now check password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password ",
                success: false,

            })
        };
        // check role is correct or not
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role ",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        // generate token 
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        // token ko cookies me store krna 
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
6
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// this is my patch req
export const updateProfile = async (req, res) => {
    try {
        // console.log("Request Data",req)
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        // console.log(file)
        // CLOUDINARY aayega idhar
        let cloudResponse;
        if(file){
            const fileUri= getDataUri(file);
          
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }
        console.log("cloudiiii",cloudResponse)
       
        // skills will come in form of string so we have to convert in array
        let skillsArray;
        if(skills){
             skillsArray = skills.split(",");
        }
        const userId = req.id;//middleware authentication se aaega 
        // console.log("User id", userId);

        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "user not found ",
                success: false
            });
        }
       


        // updating data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray
       
        //  For resume 

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        await  user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}




// business logic