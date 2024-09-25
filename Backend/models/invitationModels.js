import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  projectId: { 
    type: mongoose.Schema.ObjectId, 
    ref: "Project", 
    required: true 
  },
  token: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Accepted'], 
    default: 'Pending' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: '1d' 
  } 
});

const Invitation = mongoose.model("Invitation", invitationSchema);

export default Invitation;
