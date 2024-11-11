const express = require("express");
const router = express.Router();
router.post("/chat", (req, res) => {

  const { message } = req.body;
  console.log( "message:", message, req.user.dataValues.name);
  req.app.get("io").of("/room").emit("chat", message);
  return res.send("ok");
});
module.exports = router;
