const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// LOGIN
router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    // Verify the user's credentials
    User.findOne({ email }, (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Error finding user" });
      }
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Compare the submitted password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: "Error logging in" });
        }
  
        if (!isMatch) {
          return res.status(401).json({ message: "Incorrect password" });
        }
  
        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
        // Send the token to the client
        res.json({ token });
      });
    });
  });
  
  

module.exports = router;
