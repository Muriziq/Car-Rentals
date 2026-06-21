const express = require('express');
const router = express.Router();
const {verifyAccessToken}= require("../middleware/verifyJWT")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {rolesList} = require("../middleware/roles_list")
const allUsers = {
    users: require("../models/allUsers.json") || [],
    setUsers: (value)=>{
        this.users = value
    }

}
const fsPromises = require("fs").promises
const path = require("path");
const { rolesList } = require('../middleware/roles_list');
router.post("/register",async (req,res)=>{
    const {firstName,lastName,userName,email,country,state,password} = req.body;
    if(!firstName || !lastName || !userName || !email || !country || !state || !password) {
        return res.status(400).json({msg:"All fields are required"})
    }
    const existingUser = users.find(user => user.email === email);
    if(existingUser) {
        return res.status(400).json({msg:"User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const roles = Object.values(user.roles)
        const refreshToken = jwt.sign({userID: existingUser.id}, process.env.REFRESH_TOKEN, {expiresIn: "7d"});
    const accessToken = jwt.sign({userID: existingUser.id,roles:roles}, process.env.ACCESS_TOKEN, {expiresIn: "10m"});
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 24 *60 * 60 * 1000
    });
    const newUser = {
        id: users.length + 1,
        firstName,
        lastName,
        userName,
        email,
        country,
        state,
        roles: {
            users: rolesList.users
        },
        password:hashedPassword,
        refreshToken:refreshToken
    }
    
    allUsers.setUsers([...allUsers.users,newUser]);
    await fsPromises.writeFile(path.join(__dirname, "../models/allUsers.json"),JSON.stringify(allUsers.users));
    res.status(200).json(accessToken)
})

router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({msg:"All fields are required"})
    }
    const existingUser = allUsers.users.find(user => user.email === email);
    if(!existingUser) {
        return res.status(400).json({msg:"User not found"})
    }
    const isPasswordValid = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordValid) {
        return res.status(400).json({msg:"Invalid password"})
    }
    const refreshToken = jwt.sign({id: existingUser.id}, process.env.REFRESH_TOKEN, {expiresIn: "7d"});
    const accessToken = jwt.sign({id: existingUser.id}, process.env.ACCESS_TOKEN, {expiresIn: "10m"});
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 24 *60 * 60 * 1000
    });
    const otherUsers = allUsers.users.filter(user=>user.id !== existingUser.id)
    existingUser.refreshToken = refreshToken
    allUsers.setUsers([otherUsers,existingUser])
      await fsPromises.writeFile(path.join(__dirname, "../models/allUsers.json"),JSON.stringify(allUsers.users));
    res.status(200).json(accessToken)
})
router.get("/profile",verifyAccessToken,(req,res)=>{
    const user = allUsers.users.find(user => user.email === req.user);
    if(!user) {
        return res.status(400).json({msg:"User not found"})
    }
    res.status(200).json(user)
})
router.post("/logout",async(req,res)=>{
    const user = allUsers.users.find(user => user.email === req.user);
    if(!user) {
        return res.status(400).json({msg:"User not found"})
    }
    const otherUsers = allUsers.users.filter(user => user.id !== user.id)
    user.refreshToken = "";
    allUsers.setUsers([...otherUsers,user])
    await fsPromises.writeFile(path.join(__dirname, "../models/allUsers.json"),JSON.stringify(allUsers.users));
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
    res.status(200).json({msg:"Logout successful"})
})
module.exports = router;