import React, { useState, useEffect, useRef } from 'react';
import { Send, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';

export const Chat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', senderId: 'system', text: 'Welcome to the secure chat.', timestamp: new Date(Date.now() - 3600000) },
    { id: '2', senderId: 'other', text: 'Hi! I saw your order. I can start working on it today.', timestamp: new Date(Date.now() - 300000) }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: user._id,
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate response
    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: 'other',
        text: "Thanks! I'll keep you updated on the progress.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] p-4 flex flex-col">
      <div className="bg-white rounded-t-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-bold text-slate-900">Project Discussion</h3>
            <p className="text-xs text-green-500 font-medium flex items-center">
              <span className="block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-50 border-x border-slate-200 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === user?._id;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'}`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-1 ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white rounded-b-xl shadow-sm border border-slate-200 p-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 border"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-indigo-600 text-white p-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};