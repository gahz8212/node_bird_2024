const express = require("express");
const router = express.Router();
router.post("/chat", (req, res) => {
  // router.post("/chat", (req, res) => {
  // const { id } = req.params;
  const { message } = req.body;

  req.app
    .get("io")
    .of("/room")
    // .to(id)
    .emit("chat", { message, user: req.user.name });
  return res.send("ok");
});
module.exports = router;
