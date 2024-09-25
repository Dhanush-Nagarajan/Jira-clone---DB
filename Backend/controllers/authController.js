import bcrypt from "bcryptjs";
import User from "../models/userModels.js";
import Invitation from "../models/invitationModels.js";
import Project from "../models/projectModels.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
      const { fullName, email, password, confirmPassword } = req.body;
      const { token } = req.query; // For invited users
  
    //   console.log("Received token: ", token);
  
      const lowerCaseEmail = email.toLowerCase();
  
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match!" });
      }
  
      // Check if the user already exists
      const user = await User.findOne({ email: lowerCaseEmail });
      if (user) {
        return res.status(400).json({ error: "Email already exists!" });
      }
  
      // If token is provided, validate the invitation
      let invitation = null;
      if (token) {
        invitation = await Invitation.findOne({ token });
        if (!invitation || invitation.status !== 'Pending') {
          return res.status(400).json({ error: "Invalid or expired invitation token." });
        }
  
        // Check if the invitation's email matches the registration email
        if (invitation.email.toLowerCase() !== lowerCaseEmail) {
          return res.status(400).json({ error: "Email does not match the invitation email." });
        }
      }
  
      // Hash the password and create the user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        fullName,
        email: lowerCaseEmail,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      if (newUser) {
        // Generate token and set it in the cookie
        generateTokenAndSetCookie(newUser._id, res);
  
        // If user signed up through an invitation, add them to the project
        if (invitation) {
          const project = await Project.findById(invitation.projectId);
          if (project) {
            project.participants.push(newUser._id);
            await project.save();
  
            // Mark invitation as 'Accepted'
            invitation.status = 'Accepted';
            await invitation.save();
          }
        }
  
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        });
      } else {
        res.status(400).json({ error: "Invalid user data!" });
      }
    } catch (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
    
  
export const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid email or password"});
        }
        const token = generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token
        });
        
    } catch (error) {
        console.log("Error in Login controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const logout = (req, res) => {
    try {
      res.clearCookie('jwt');
      res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
      console.log("Error in Logout controller", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  