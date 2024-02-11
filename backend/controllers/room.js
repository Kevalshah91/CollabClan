let nanoid;

async function generateId() {
  if (!nanoid) {
    const nanoidModule = await import("nanoid");
    nanoid = nanoidModule.nanoid;
  }
  return nanoid();
}

// Call generateId() to generate an ID
async function run() {
  const id = await generateId();
  console.log(id);
}

run();

// Use nanoid() outside of the generateId function
if (nanoid) {
  console.log(nanoid());
}

const Room = require("../models/room");
const createRoom = async (req, res) => {
  console.log(req.body)
  const { userName, roomName, password, roomLimit } = req.body;
  if (!userName || !roomName || !password) {
    res.status(422).json({ error: "please add all field" });
    return;
  }
  const newRoom = new Room({
    roomId: nanoid(6),
    members: [{ userId: nanoid(4), name: userName, isSuperUser: true }],
    roomName,
    password,
    roomLimit,
  });

  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
    console.log(savedRoom);
    console.log("create room called");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRoomsOfUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const room = await Room.find({
      "members.userId": userId,
    });
    console.log("get room of user called");
    res.status(200).json(room);
  } catch (e) {
    res.status(500).json(e);
  }
};

const joinRoom = async (req, res) => {
  const { userName, roomId, password } = req.body;
  console.log(req.body);
  if (!userName || !roomId || !password) {
    res.status(422).json({ error: "Please add all fields" });
  } else {
    const room = await Room.findOne({ roomId: roomId });
    if (!room) {
      res.status(422).json({ error: "Invalid Room Id or password" });
    } else if (room.isDeleted) {
      res.status(422).json({ error: "Room is deleted" });
    } else if (room.password === password) {
      
        try {
          const newUser = {
            userId: nanoid(4),
            name: userName,
            isSuperUser: false,
          };
          const join_room = await Room.updateOne(
            { roomId: roomId },
            { $push: { members: newUser } },
            { new: true }
          );

          res.status(200).json({
            userId: newUser.userId,
            userName: newUser.name,
            roomId: roomId,
            roomName: room.roomName,
          });
          console.log(join_room);
        } catch (error) {
          res.status(422).json({ error: error.message });
        }
      
    } else{
      res.status(422).json({ error: "Wrong password" });

    }
  }
};

const codeSave = async (req, res) => {
  const { roomId, code } = req.body;
  const result = await Room.findOneAndUpdate(
    { roomId: roomId },
    { $set: { code: code } },
    { new: true }
  );
  res.status(200).json(result);

  return true;
};

const deleteRoom = async (req, res) => {
  const result = await Room.findOneAndUpdate(
    { roomId: req.body.roomId },
    { $set: { isDeleted: true } },
    { new: true }
  );
  console.log("Room deleted");
  res.status(200).json(result);
};

const setRoomLimit = async (req, res) => {
  const result = await Room.findOneAndUpdate(
    { roomId: req.body.roomId },
    { $set: { roomLimit: req.body.limit } },
    { new: true }
  );
  console.log(`Limit is changed to ${req.body.limit}`);
  res.status(200).json(result);
};

const roomMembers = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.find({
      roomId: roomId,
    }).select({ members: 1, _id: 0 });
    res.status(200).json(room[0].members);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
};

const getCode = async (req, res) => {

  const { roomId } = req.params;
  try {
    const room = await Room.find({
      roomId: roomId,
    }).select({ code: 1, _id: 0 });
    console.log(room)
    res.status(200).json(room);
  } catch (e) {
    res.status(500).json(e);
    console.log(e);
  }
};

const removeMember = async (req, res) => {
  const { roomId, name } = req.body;

  const result = await Room.updateOne(
    { roomId: roomId},
    {
      $pull: { members: { name: name } },
    },
    { new: true }
  );
  console.log("User deleted");
  res.status(200).json(result);
};
module.exports = {
  createRoom,
  getRoomsOfUser,
  joinRoom,
  codeSave,
  removeMember,
  roomMembers,
  setRoomLimit,
  deleteRoom,
  getCode
};
