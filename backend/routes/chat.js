const express = require("express");
const router = express.Router();
router.post("/", (req, res) => {
  const { message } = req.body;
  console.log("message", message);
});
module.exports = router;
