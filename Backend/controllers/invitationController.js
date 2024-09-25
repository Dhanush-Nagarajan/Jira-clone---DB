import crypto from "crypto";
import nodemailer from "nodemailer";
import Invitation from "../models/invitationModels.js";
import Project from "../models/projectModels.js";
import User from "../models/userModels.js";
                                   

export const inviteMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { emails } = req.body; 

    if (!emails || emails.length === 0) {
      return res.status(400).json({ error: "Email is required." });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project does not exist!" });
    }

    
    for (const email of emails) {
      const user = await User.findOne({ email });

      if (user) {
        continue; 
      }

      const token = crypto.randomBytes(32).toString("hex");

      const newInvitation = new Invitation({
        email,
        projectId,
        token,
      });

      await newInvitation.save();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sa0922494@gmail.com',
          pass: process.env.mailPass, 
        },
      });

      const inviteLink = `http://localhost:3000/signup?token=${token}`;

      const mailOptions = {
        from:'"Jira Clone" <sa0922494@gmail.com>',
        to: email,
        subject: 'Project Invitation',
        text: `You are invited to join the project. Register here: ${inviteLink}`,
      };

      await transporter.sendMail(mailOptions);
    }

    res.status(200).json({ message: "Invitations sent successfully" });
  } catch (error) {
    console.log("Error in inviteMember controller:", error.message);
    res.status(500).json({ error: error.message });
  }
};


export const verifyInvitation = async (req, res, next) => {
  try {
    const { token } = req.query;

    const invitation = await Invitation.findOne({ token });

    if (!invitation || invitation.status === 'Accepted') {
      return res.status(400).json({ error: "Invalid or expired invitation token" });
    }

    req.invitation = invitation;
    next();
  } catch (error) {
    console.log("Error in verifyInvitation middleware:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
