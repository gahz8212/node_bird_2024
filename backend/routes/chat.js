const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Chat, User } = require("../models");
const { use } = require("passport");
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    filename(req, file, cb) {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, file.originalname);
    },
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
  }),
});
router.post("/images", upload.array("images"), async (req, res) => {
  try {
    const files = req.files.map((file) => ({ url: `/img/${file.filename}` }));
    const user = await User.findOne({ where: { id: req.user.id } });

    const images = files.map((file) => file.url).toString();
    const image = await Chat.create({ image: images, name: req.user.name });
    user.addChat(image);
    // console.log(
    images.split(",").map((image) => ({
      url: `${image}`,
    }));
    // );

    // const images = await Promise.all(
    //   files.map((file) =>
    //     Chat.create({ image: file.url, UserId: req.user.id })
    //   )
    // );
    // await user.addImages(images.map((image) => image[0]));

    req.app
      .get("io")
      .of("/room")
      .emit("chat", { user: req.user.name, images: files });

    const userChat = await Chat.findAll({
      where: { id: 3 },
      attributes: ["name"],
      include: [User, Image],
    });
    console.log(userChat);
    return res.status(200).json("image_ok");
  } catch (e) {
    return res.status(400).json(e.message);
  }
});
router.post("/chat", async (req, res) => {
  // router.post("/chat", (req, res) => {
  // const { id } = req.params;
  const { message } = req.body;
  const user = await User.findOne({ where: { id: req.user.id } });
  const chats = await Chat.create({ chat: message, name: req.user.name });
  user.addChats(chats);
  req.app
    .get("io")
    .of("/room")
    // .to(id)
    .emit("chat", { message, user: req.user.name });
  return res.send("ok");
});
module.exports = router;
