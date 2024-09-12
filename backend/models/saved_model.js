import mongoose from "mongoose";

const SavedSchema=mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
    string:{
          type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
    },
    Date:{
        type: Date, 
        default: Date.now
    }
},{timestamps:true})


const Saved=mongoose.model('Saved',SavedSchema)
export default Saved