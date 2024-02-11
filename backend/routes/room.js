const {
  createRoom,
  getRoomsOfUser,
  joinRoom,
  codeSave,
  deleteRoom,
  setRoomLimit,
  roomMembers,
  removeMember,
  getCode
} = require("../controllers/room.js");
const express = require("express");
const router = express.Router();

// new room
router.post("/room", createRoom);

// join room
router.post("/joinroom", joinRoom);

// get rooms of a user
router.get("/:userId", getRoomsOfUser);

router.get("/code/:roomId", getCode);

// post code to DB
router.post("/code", codeSave);

router.put("/deleteroom", deleteRoom);

router.put("/roomlimit", setRoomLimit);

router.get("/members/:roomId", roomMembers);

router.post("/removeuser", removeMember);


module.exports = router;
