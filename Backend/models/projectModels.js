import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
	{
		Project_type: {
			type: String,
			required: true,
			enum: ['Team-managed project', 'Company-managed project']
		},
		Project_name: {
			type: String,
			required: true,
            unique: true,
		},
		Access: {
			type: String,
			required: true,
			enum: ['Private', 'Limited','Open']
		},
        Key: {
			type: String,
			required: true,
			minlength: 1,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}
	},
	{ timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;