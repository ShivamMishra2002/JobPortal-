import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
        unique:true
    },
   description :{
        type:String,
       
    },
    website :{
        type:String
      
    },
    location :{
        type:String
    },
    logo :{
        type:String // Url to Company logo

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',// owener of company
        required:true
    }
},{timestamps:true});

export const Company = mongoose.model("Company",companySchema);