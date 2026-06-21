const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    if(!req.cookies?.refreshToken) return res.sendStatus(401);
    const user = users.find(user => user.refreshToken === req.cookies.refreshToken);
    if(!user) return res.sendStatus(403);
    const roles = Object.values(user.roles)
    const refreshToken = req.cookies.refreshToken;
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN,(err,decoded)=>{
        if(err) return res.sendStatus(403);
        const accessToken = jwt.sign({userID: user.id,roles:roles}, process.env.ACCESS_TOKEN, {expiresIn: "10m"})
        res.json(accessToken)
    })
})

module.exports = router