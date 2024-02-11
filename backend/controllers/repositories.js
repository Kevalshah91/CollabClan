const Problem = require("../models/problem");
const Room = require("../models/room");
const getAllProblems = async (req, res) => {
  const allProblems = await Problem.find({});
  // await Problem.findByIdAndDelete(problem.id) -> delete incomplete problems

  res.send(allProblems);
};

const getProblemById = async (req, res) => {
  const fetchId = req.params.id;
  if (fetchId == "") {
    res.send({});
  }
  Problem.findById(fetchId, (err, val) => {
    if (err) {
      console.log(err);
    } else {
      res.send(val);
    }
  });
};
const selectrepository = async (req, res) => {
  console.log("vuyiyv");
  const { roomId, repo_link } = req.body;
  const filter = { roomId: roomId }; // Find documents where orderNumber equals "1001"
  const update = { $set: { repo_link: repo_link } }; // Set the customerName field to "John Doe"

  Room.updateOne(filter, update, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`${res.modifiedCount} document(s) updated`);
    }
  });
};

const deleteproblem = async (req, res) => {
  const { problem_id } = req.body;
  const filter = { _id: problem_id };
  Problem.deleteOne(filter, (err, val) => {
    if (err) {
      console.error(err);
    } else {
      res.send(val);
      console.log(` document(s) updated`);
    }
  });
};

const uploadProblem = async (req, res) => {
  console.log(req.body);
  const {
    title,
    problem,
    difficulty,
    input,
    output_format,
    testcases,
    output,
  } = req.body;
  const byAdmin = true;
  if (
    !title ||
    !problem ||
    !difficulty ||
    !input ||
    !output_format ||
    !testcases ||
    !output
  ) {
    res.status(422).json({ error: "please add all field" });
    return;
  }
  const newProblem = new Problem({
    title,
    problem,
    difficulty,
    input,
    output_format,
    testcases,
    output,
    byAdmin,
  });

  try {
    const savedProblem = await newProblem.save();
    res.status(200).json(savedProblem);
    console.log(savedProblem);
    console.log("Create Problem called");
  } catch (err) {
    res.status(500).json(err);
  }
};
const adminProblem = async (req, res) => {
  const adminPs = await Problem.find({ byAdmin: true });
  // await Problem.findByIdAndDelete(problem.id) -> delete incomplete problems

  res.send(adminPs);
};

module.exports = {
  getAllProblems,
  getProblemById,
  selectrepository,
  uploadProblem,
  deleteproblem,
  adminProblem,
};
