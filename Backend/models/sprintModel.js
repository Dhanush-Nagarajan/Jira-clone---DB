import mongoose from "mongoose";

const SprintSchema = new mongoose.Schema({
    Project_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "Project",
    },
    Sprint_title :{
        type : String,
        required: true
    },
    Tasks: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Task",
            },
        ],
    },
},
{
    timestamps: true,
});

const Sprint = mongoose.model("Sprint", SprintSchema);
export default Sprint;
