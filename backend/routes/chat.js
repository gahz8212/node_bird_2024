const express = require("express");
const router = express.Router();
// router.post("/room/:id/chat", (req, res) => {
router.post("/chat", (req, res) => {
  const { message } = req.body;
  // const { id } = req.params;
  console.log("req.user", req.user.name);
  // req.app.get("io").of("/chat").to(id).emit("chat", messages:{message,user:req.user.name});
  req.app.get("io").of("/room").emit("chat", { message, user: req.user.name });
  return res.send("ok");
});
module.exports = router;
