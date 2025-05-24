import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : "15m",
    })
    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn : "7d",
    })
    return {accessToken, refreshToken};
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly : true, // prevent XSS attacks, cross site scripting attack
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict", // prevent CSRF attack, cross site request forgery
        maxAge : 15 * 60 * 1000, // 15 minutes 
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly : true, // prevent XSS attacks, cross site scripting attack
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict", // prevent CSRF attack, cross site request forgery
        maxAge : 7 * 24 * 60 * 60 * 1000, // 7 days 
    })
}

export const signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "user already exist" });
        }
        const user = await User.create({ username, email, password });

        //authenticate
        const {accessToken, refreshToken} = generateTokens(user._id);

        setCookies(res, accessToken, refreshToken);

        res.status(201).json({
            _id : user._id,
            username : user.username,
            email : user.email,
            accessToken : accessToken,
            refreshToken : refreshToken,
        });
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        
        if(user && (await user.comparePassword(password))){
            const {accessToken, refreshToken} = generateTokens(user._id);

            setCookies(res, accessToken, refreshToken);

            res.json({
                _id : user._id,
                username : user.username,
                email : user.email,
                accessToken : accessToken,
                refreshToken : refreshToken,
            })
        }
        else {
            res.status(401).json({message : "Invalid email or password"});
        }
    } catch (error) {
        res.status(500).json({ message : error.message})
    }   
};

