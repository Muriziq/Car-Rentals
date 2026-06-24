const express = require('express');
const jwt = require("jsonwebtoken")
const verifyAccessToken = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(err) return res.sendStatus(403);
        req.id = decoded.id;
        req.role= decoded.role
        req.region = decoded.region
        next();
    })
}

module.exports = {verifyAccessToken}