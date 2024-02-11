const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      require: true,
    },
    roomId: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    code: {
      type: String,
      default: "",
    },
    roomLimit: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
    },
    repo_link: {
      type: String,
      default: "",
    },
    members: {
      type: Array,
      userId: {
        type: String,
      },
      name: {
        type: String,
      },

      isSuperUser: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
