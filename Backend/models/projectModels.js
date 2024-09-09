import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
	{
		template: {
			type: String,
			required: true,
			enum: ['Kanban', 'Scrum', 'Top-level planning', 'Cross-team planning', 'Product roadmap', 'Bug tracking']
		},
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
	},
	{ timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;