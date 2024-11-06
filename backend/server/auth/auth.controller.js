const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const AuthHandler = require('./auth.handler');

dotenv.config();

// login function
const login = async (req, res, next) => {
  try {
    if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
      return res.status(401).json({message:"Invalid Format"});
    }
    const { email, password } = req.body;
    const user = await AuthHandler.getUserByQuery({ email });
    console.log(user);
    if (!user) {
      return res.status(401).json({message:"Invalid credentials"});
    }
    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch) {
      return res.status(401).json({message:"Incorrect Password"});
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie('token', token);
    res.status(200).json({ user, token });
  } catch (err) {
    next(err); 
  }
};

// signup function
const signup = async (req, res, next) => {
  try {
    if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('password')) {
        return res.status(401).json({message:"Invalid Format"});
      }
    const { email, password,} = req.body;
    const existingUser = await AuthHandler.getUserByQuery({email});
    console.log(existingUser)
    if (existingUser.length > 1) {
      return res.status(409).json({message:"User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AuthHandler.addUser({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (err) {
    next(err); 
  }
};

module.exports = { login, signup };