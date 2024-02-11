const express = require("express");
const router = express.Router();
const {
  getProblemId,
  execute,
  updatePoints,
  getPoints,
} = require("../controllers/editor");
router.post("/problemId", getProblemId);
router.post("/execute", execute);
router.post("/updatePoints", updatePoints);
router.post("/getPoints", getPoints);
module.exports = router;
