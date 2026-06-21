const express = require('express');
const { decode } = require('jsonwebtoken');
const verifyAccessToken = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
        if(err) return res.sendStatus(403);
        req.userID = decoded.userID;
        req.roles = decoded.roles
        next();
    })
}

module.exports = {verifyAccessToken}