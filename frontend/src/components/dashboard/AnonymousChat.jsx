import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Users, Shield, ShieldOff, Bot, Smile } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockChatMessages } from '../../data/mockData';
import { cn, formatTime } from '../../utils/helpers';

const AnonymousChat = () => {
  const { anonymousMode, toggleAnonymousMode } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(12);
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);

  // Simulate WebSocket connection
  useEffect(() => {
    // Mock WebSocket URL - in a real app, this would be your actual WebSocket endpoint
    const mockWsUrl = 'wss://skillmitra-chat.example.com/anonymous';
    
    const connectWebSocket = () => {
      try {
        // Simulate WebSocket connection
        setIsConnected(true);
        setMessages(mockChatMessages);
        
        // Simulate receiving messages periodically
        const interval = setInterval(() => {
          if (Math.random() < 0.3) { // 30% chance of new message
            const botMessages = [
              "Anyone working on React projects this week?",
              "Looking for a Python mentor for data science!",
              "Just completed the JavaScript challenge 🎉",
              "Who wants to pair program on a Node.js app?",
              "Need help with CSS animations, any experts here?"
            ];
            
            const newMsg = {
              id: Date.now(),
              sender: `Anonymous_${Math.floor(Math.random() * 100)}`,
              message: botMessages[Math.floor(Math.random() * botMessages.length)],
              timestamp: new Date().toISOString(),
              isBot: false
            };
            
            setMessages(prev => [...prev, newMsg]);
          }
        }, 10000); // Every 10 seconds
        
        return () => clearInterval(interval);
      } catch (error) {
        console.log('WebSocket connection simulation:', error);
        setIsConnected(false);
      }
    };

    if (anonymousMode) {
      connectWebSocket();
    } else {
      setIsConnected(false);
      setMessages([]);
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [anonymousMode]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !isConnected) return;

    const message = {
      id: Date.now(),
      sender: 'You',
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isBot: false,
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate typing response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "That's a great question! I've had similar experiences.",
          "I can help with that! Let me share some resources.",
          "Have you tried the documentation approach?",
          "I'm also learning that skill. Want to study together?",
          "There's a great tutorial for that on the platform!"
        ];
        
        const response = {
          id: Date.now() + 1,
          sender: 'SkillMentor_42',
          message: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toISOString(),
          isBot: false
        };
        
        setMessages(prev => [...prev, response]);
      }, 2000);
    }, 1000);
  };

  if (!anonymousMode) {
    return (
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Anonymous Chat</h3>
        </div>
        
        <div className="text-center py-8">
          <ShieldOff className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Anonymous Mode Required
          </h4>
          <p className="text-gray-600 mb-4">
            Enable anonymous mode to join the community chat and connect with mentors privately.
          </p>
          <button
            onClick={toggleAnonymousMode}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <Shield className="w-4 h-4" />
            <span>Enable Anonymous Mode</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-96 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-purple-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Anonymous Chat</h3>
          <div className={cn(
            "flex items-center space-x-1 px-2 py-1 rounded-full text-xs",
            isConnected ? "bg-success-100 text-success-700" : "bg-red-100 text-red-700"
          )}>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isConnected ? "bg-success-500" : "bg-red-500"
            )} />
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{onlineUsers} online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex space-x-3",
              message.isOwn && "justify-end"
            )}
          >
            {!message.isOwn && (
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0",
                message.isBot ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
              )}>
                {message.isBot ? (
                  <Bot className="w-4 h-4" />
                ) : (
                  message.sender.slice(0, 2).toUpperCase()
                )}
              </div>
            )}
            
            <div className={cn(
              "max-w-xs lg:max-w-md",
              message.isOwn && "order-first"
            )}>
              {!message.isOwn && (
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium text-gray-700">
                    {message.sender}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              )}
              
              <div className={cn(
                "px-3 py-2 rounded-lg text-sm",
                message.isOwn 
                  ? "bg-primary-500 text-white ml-auto" 
                  : message.isBot 
                    ? "bg-blue-50 text-blue-900 border border-blue-200"
                    : "bg-gray-100 text-gray-900"
              )}>
                {message.message}
              </div>
              
              {message.isOwn && (
                <div className="text-xs text-gray-500 text-right mt-1">
                  {formatTime(message.timestamp)}
                </div>
              )}
            </div>
            
            {message.isOwn && (
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                You
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
            <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-600">
              Someone is typing...
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isConnected ? "Type your message..." : "Connect to start chatting..."}
            disabled={!isConnected}
            className="input-field pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <Smile className="w-4 h-4" />
          </button>
        </div>
        <button
          type="submit"
          disabled={!newMessage.trim() || !isConnected}
          className="btn-primary p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Footer */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        Your identity is protected. Be respectful and helpful! 🤝
      </div>
    </div>
  );
};

export default AnonymousChat;
