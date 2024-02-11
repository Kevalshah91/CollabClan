const express = require("express");
const router = express.Router();
const {
  getAllProblems,
  getProblemById,
  selectrepository,
  uploadProblem,
  deleteproblem,
  adminProblem,
} = require("../controllers/repositories.js");

router.get("/fetch", getAllProblems);
router.get("/fetch/:id", getProblemById);
router.post("/select", selectrepository);
router.post("/delete", deleteproblem);
router.post("/upload", uploadProblem);
router.get("/adminps", adminProblem);
module.exports = router;
