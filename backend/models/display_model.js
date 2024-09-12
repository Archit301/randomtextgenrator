import mongoose from "mongoose";

const DisplaySchema=mongoose.Schema({
    content:{
        type:String
    },
    createdAt:{
        type: Date, 
        default: Date.now
    }
})


const Display=mongoose.model('Display',DisplaySchema)
export default Display