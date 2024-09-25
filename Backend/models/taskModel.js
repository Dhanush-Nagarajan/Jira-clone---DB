import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    Project_ID :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    issue:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum: ['To-Do', 'In Progress', 'Done'],
        default:"To-Do"
    },
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    }
});

const Task = mongoose.model("Task",taskSchema);
export default Task;