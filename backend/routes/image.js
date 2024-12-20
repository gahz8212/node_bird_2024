const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, file.originalname);
    },
  }),
});
router.post("/images", upload.array("images"), (req, res) => {
  try {
    const files = req.files.map((file) => ({ url: `/img/${file.filename}` }));
    console.log(files);
    req.app
      .get("io")
      .of("/room")
      .emit("chat", { user: req.user.name, image: files });
    return res.status(200).json("image_ok");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
module.exports = router;
