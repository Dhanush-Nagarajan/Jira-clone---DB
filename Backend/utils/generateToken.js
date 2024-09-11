import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000,
        secure: process.env.NODE_ENV === "production",
    });

    return token; 
};

export default generateTokenAndSetCookie;
