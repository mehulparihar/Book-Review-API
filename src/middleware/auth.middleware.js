import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({message : "Unauthorized - No token provided"});
        }
        try { 
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");

            if(!user){
                return res.status(401).json({message : "User not found"});
            }
            req.user = user;
            console.log(user);
            next();
        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({message : "Unauthorized - access token expired"});
            }
            throw error;
        }
    } catch (error) {
        return res.status(401).json({message : "Unauthorized - Invalid  access token"});
    }
};