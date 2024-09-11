import bcrypt from "bcryptjs";
import User from "../models/userModels.js";
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async(req,res)=>{
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        const lowerCaseEmail = email.toLowerCase();
 
        if(password !== confirmPassword) {
            return res.status(400).json({error:"Password do not match!"})
        };

        const user = await User.findOne({ email: lowerCaseEmail });

        if(user){
            return res.status(400).json({error:"email already exists!"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${email}`;

        const newUser = new User({
            fullName,
            email,
            password: hashpassword,
            profilePic:  boyProfilePic
        });

       if (newUser){
         generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });
       }

       else{
        res.status(400).json({error:"Invalid user data!"});
       };


    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(201).json({error:"Internal server error"});
        
    }
}

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
            profilePic: user.profilePic,
            token
        });
        
    } catch (error) {
        console.log("Error in Login controller",error.message);
        res.status(201).json({error:"Internal server error"});
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
  