import { Conversation } from "../models/Conversation.js";
import { Message } from "../models/Message.js";

// Create or get conversation
export const startConversation = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    res.json(conversation);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;
    const senderId = req.user.id;

    const message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text
    });

    res.json(message);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get messages
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversation: conversationId
    }).populate("sender", "name");

    res.json(messages);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};