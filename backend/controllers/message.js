import Message from "../models/message.js";

export const createNewMessage = async (req, res) => {
  const body = req.body;

  try {
    const result = await Message.create({
      roomId: body.roomId,
      senderId: body.senderId,
      senderName: body.senderName,
      text: body.text,
    });
    return res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId });
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).json(e);
  }
};

export default { createNewMessage, getMessages };
