import mongoose from "mongoose";
const userSchema  = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
})
const User =  mongoose.model("User",userSchema);

const tagsSchema = new mongoose.Schema({
    title:{type:String,required:true , unique:true}
})

const Tag  = mongoose.model("Tag",tagsSchema);

const contentTypes = ['image', 'video', 'article', 'audio']; 
const contentSchema = new mongoose.Schema({
    link:{type:String ,required:true},
    type:{type:String,enum:contentTypes,required:true},
    title:{type:String,required:true},
    tags:{type:[mongoose.Types.ObjectId],ref:"Tag" ,default:[],required:false},
    userId:{type:mongoose.Types.ObjectId,ref:"User" , required:true}
})

const Content = mongoose.model("Content",contentSchema);

const linkSchema = new mongoose.Schema({
    hash:{type:String , required:true},
    userId:{type:mongoose.Types.ObjectId,ref:"User" , required:true}
})

const Link = mongoose.model("Link",linkSchema);

export { User, Link, Tag, Content };

