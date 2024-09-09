import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

const Team = mongoose.model("Team", TeamSchema);

export default Team;