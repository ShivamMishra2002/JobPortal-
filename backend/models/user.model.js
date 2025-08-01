import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber :{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        reqiured:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},// url to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},// create relation b/w company table and user table
        profilePhoto:{
            type:String,
            default:""

        }
    },
},{timestamps:true}); // for time stamp record

export const User = mongoose.model('User',userSchema)