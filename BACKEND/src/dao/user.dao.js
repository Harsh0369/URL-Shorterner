import User from "../models/userModel.js";

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    }
    catch (error) {
        throw new Error("Error fetching user by email: " + error.message);
    }   
}

export const createUser = async (name, email, password) => {
  const newUser = new User({ name, email, password });
  await newUser.save();
  return newUser;
};
