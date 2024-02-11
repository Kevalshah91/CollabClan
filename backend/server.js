const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const repositoryRoutes = require("./routes/repositories");
const room = require("./routes/room");
const editor = require("./routes/editorRoutes");
const generateToken = require("./config/generateToken");
// const HomepageRoutes = require("./routes/HomepageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

dotenv.config();
mongoose.set("strictQuery", true);
connectDB();
const app = express();

app.use(express.json()); // to accept json data
app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  res.send("Server running");
});
app.get("/api/users", async (req, res) => {
  const users = await User.find({ collection_name: "User" });
  res.json(users);
});
app.use("/api/user", userRoutes);
app.use("/api/repository", repositoryRoutes);
app.use("/api/room", room);
app.use("/api/editor", editor);
// app.use("/api/HomePage", HomepageRoutes);

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
app.use(cors());
const User = mongoose.model("User");

// PDF UPLOAD

// const userSchema = mongoose.model("User");
const upload = multer({ storage: storage });
app.post("/register", upload.single("file"), async (req, res) => {
  const { name, username, password, github, email, file } = req.body;

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
    github,
    pdf: file,
    email,
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
      email: user.email,
      // Add more fields as needed
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

app.post("/addrepo", async (req, res) => {
  const { repo_link, userId } = req.body;
  // const userId = req.params.userId;

  try {
    console.log(userId);
    // Find the user by ID

    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the repo_link to the user's repo_links array
    user.repo_links.push(repo_link);

    // Save the updated user document
    await user.save();

    return res
      .status(200)
      .json({ message: "Repo link added successfully", user });
  } catch (error) {
    console.error("Error adding repo link:", error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);

  if (req.file && req.file.filename) {
    const fileName = req.file.filename;
  } else {
    res.status(400).send("File not uploaded");
  }
  try {
    await userSchema.create({ pdf: fileName });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    userSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`server started on port ${PORT}`.yellow.bold));
