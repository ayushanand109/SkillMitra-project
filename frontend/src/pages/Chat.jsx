
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { userId } = useParams();
  const receiverId = userId;

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  const token = localStorage.getItem("skillmitra_token");

  useEffect(() => {
    startConversation();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startConversation = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/chat/conversation",
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setConversationId(res.data._id);
      fetchMessages(res.data._id);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMessages = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/messages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/chat/message",
        {
          conversationId,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMessages(conversationId);
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  const currentUserId = JSON.parse(
    localStorage.getItem("skillmitra_user")
  )?.id;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <div className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">
          SkillMitra Chat
        </h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.map((msg) => {
          const isSender = msg.sender._id === currentUserId;

          return (
            <div
              key={msg._id}
              className={`flex ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow ${
                  isSender
                    ? "bg-primary-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                {!isSender && (
                  <div className="text-xs font-semibold mb-1">
                    {msg.sender.name}
                  </div>
                )}

                {msg.text}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />

      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4 flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2 outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default Chat;

