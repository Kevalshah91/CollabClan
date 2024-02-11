const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

// PDF UPLOAD
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// const userSchema = mongoose.model("User");
const upload = multer({ storage: storage });

// app.post("/upload-files", upload.single("file"), async (req, res) => {
//   console.log(req.file);

//   if (req.file && req.file.filename) {
//     const fileName = req.file.filename;
//   } else {
//     res.status(400).send("File not uploaded");
//   }
//   try {
//     await userSchema.create({ pdf: fileName });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });

// app.get("/get-files", async (req, res) => {
//   try {
//     userSchema.find({}).then((data) => {
//       res.send({ status: "ok", data: data });
//     });
//   } catch (error) {}
// });

const registerUser = asyncHandler(upload.single("file"), async (req, res) => {
  if (req.file && req.file.filename) {
    const fileName = req.file.filename;
  } else {
    res.status(400).send("File not uploaded");
  }
  const { name, username, password, pic, github } = req.body;

  if (!name || !username || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    username,
    password,
    pic,
    github,
    pdf: fileName,
    // Add more fields as needed
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      pic: user.pic,
      github: user.github,
      pdf: user.fileName,
      // Add more fields as needed
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      userName: user.username,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

//
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
