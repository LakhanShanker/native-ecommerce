const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require('dotenv').config();
const DB = process.env.DATABASE
const url = "https://native-ecommerce.onrender.com/"
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
mongoose
  .connect(
   DB,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to mongo bd");
  })
  .catch((err) => {
    console.log("Error connection", err);
  });

app.listen(port, () => {
  console.log("Server is runing on port", port);
});

const User = require("./models/user");
const Order = require("./models/order");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lakhanshanker12345@gmail.com",
      pass: "fkyl vncb fjdo fvjp",
    },
  });
  const mailOptions = {
    from: "lakhan.com",
    to: email,
    subject: "Email Verification",
    text: `Plese click on the verification link to verify your mail : https://native-ecommerce.onrender.com/verify/${verificationToken}`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Error sending verification email", err);
  }
};
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const newUser = new User({ name, email, password });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    await newUser.save();
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(200).json({ message: "Registered Success" });
  } catch (err) {
    console.log("error registering user", err);
    res.status(500).json({ message: "Registeration failed" });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid Verification code" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Email Verified Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Email Verification Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("lakhan req", user);
    if (!user) {
      return res.status(401).json({ messgae: "Invalid email or password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ messgae: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login Failed" });
  }
});

app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.addresses.push(address);
    await user.save();
    res.status(200).json({ message: "Address created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding address" });
  }
});

app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ messgae: "User not found" });
    }
    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (err) {
    res.status(500).json({ message: "Error retreiveing addresses" });
  }
});

app.post("/orders", async(req,res)=> {
  try{
    const {userId, cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({message:'User not found'});
    }
    const products = cartItems.map((item)=>({
      name :item.title,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }))
    const order = new Order({
      user:userId,
      products:products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod
    })
    await order.save();
    res.status(200).json({message:'Order created successfully', data:order});
  }catch(err){
    res.status(500).json({ message: "Error creating orders" });
  }
})

app.get('/profile/:userId',async (req,res)=>{
  try{
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({message:'User not found'});
    }
    res.status(200).json({user});
  }catch(err){
    res.status(500).json({ message: "Error getting Profile" });
  }
})

app.get('/orders/:userId', async (req,res)=>{
  try{
    const userId = req.params.userId;
    const orders = await Order.find({user: userId}).populate('user');
    console.log(orders);
  
    if(!orders || orders.length === 0){
      return res.status(400).json({message:'No Orders found for this user'});
    }
    res.status(200).json({orders});
  }catch(err){
    res.status(500).json({ message: "Error getting orders" });
  }
})