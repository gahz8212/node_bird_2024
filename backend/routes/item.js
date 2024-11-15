const express = require("express");
const router = express();
const multer = require("multer");
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
// router.post("/images", upload.array("images"), async (req, res) => {
//   try {
//     console.log("image_ok");
//     const files = req.files.map((file) => ({ url: `/img/${file.filename}` }));
//     return res.status(200).json(files);
//   } catch (e) {
//     res.status(400).json(e.message);
//   }
// });
module.exports = router;
// const express = require("express");
// const multer = require("multer");
// const router = express.Router();
// const upload = multer({
//   storage: multer.diskStorage({
//     filename(req, file, cb) {
//       file.originalname = Buffer.from(file.originalname, "latin1").toString(
//         "utf8"
//       );
//       cb(null, file.originalname);
//     },
//     destination(req, file, cb) {
//       cb(null, "uploads/");
//     },
//   }),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });
// router.post("/images", upload.array("images"), async (req, res) => {
//   try {
//     const files = req.files.map((file) => ({ url: `/img/${file.filename}` }));
//     return res.status(200).json(files);
//   } catch (e) {
//     return res.status(400).json(e.message);
//   }
// });
// module.exports = router;
