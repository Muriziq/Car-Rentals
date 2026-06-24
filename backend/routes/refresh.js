const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.get("/", async (req, res) => {
  if (!req.cookies?.refreshToken) return res.sendStatus(401);
    const refreshToken = req.cookies.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { id: user._id, role: user.role, region: user.assignedRegion },
      process.env.ACCESS_TOKEN,
      { expiresIn: "15m" },
    );
    res.json(accessToken);
  });
});

module.exports = router;
