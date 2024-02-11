import { Router } from 'express';
import { createNewMessage, getMessages } from '../controllers/message.js';
const router = Router();

// add
router.post("/messages", createNewMessage);

// get
router.get("/messages/:roomId", getMessages);

export default router;
