const express=require("express")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const user=require("../models/user")

const router=express.Router();
const JWT_SECRET = "your_secret_key_here"; // put in .env later


//signup
async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.render("home", { id: null, urls: [] });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Signup failed");
  }
}


async function handleUserLogin(req,res) {
    
    try{
        const {email,password}=req.body

        const user=await user.findOne({email});

        if(!user){
            return res.render("login",{error:"Invalid Email Password"})

        }

        const isMatch=await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.render("login",{error:"Inavlid password or email"})
        }

        const token=jwt.sign({id:user._id},JWT_SECRET);

        res.cookies("token",token,{httpOnly:true})
        return res.redirect("/dashboard");
        
        

    }catch(err){
        console.log(err);
        return res.status(500).send("Login failed")
        
    }
}

