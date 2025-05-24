import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
    }
// Create new user
    const newUser = new User({
        name,
        email,
        password, // Note: Password should be hashed before saving in production
    });
    
    try {
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
}
    
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.find
}