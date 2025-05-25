import * as authService from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userToken = await authService.RegisterUser(name, email, password);
        res.cookie("token", userToken, cookieOptions);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: userToken
        }); 
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
    
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userToken = await authService.LoginUser(email, password);
        res.cookie("token", userToken, cookieOptions);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: userToken
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}