import { UserModel } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//create
export const userSignUp = async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
    //check if user already exists

    let existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User Already Exists" });
    }

    //Create a new User

    const newUser = new UserModel({
      firstName,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    //create a payload with use ID and firstName
    const payload = {
      newUser: {
        id: newUser.id,
        name: newUser.firstName,
      },
    };

    jwt.sign(payload, "randomString", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
