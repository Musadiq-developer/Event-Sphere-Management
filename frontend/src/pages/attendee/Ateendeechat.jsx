import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Send, User, ArrowLeft } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { toast } from 'react-toastify';

const AttendeeChat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  const otherId = queryParams.get('withId'); 
  const otherName = queryParams.get('withName'); 
  const myId = localStorage.getItem('userId'); 

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  // 1. History Fetch Function
  const fetchMessages = async () => {
    if (!myId || !otherId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/history/${myId}/${otherId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("History load error:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 4000); // 4 sec refresh
    return () => clearInterval(interval);
  }, [otherId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 2. Send Message (Sahi Roles Ke Saath)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const payload = {
        senderId: myId,
        receiverId: otherId,
        // SCHEMA ENUM MATCH: 'Attendee' ki jagah 'User' bhej rahe hain
        senderModel: 'User', 
        receiverModel: 'Exhibitor',
        text: newMessage
      };

      const res = await axios.post('http://localhost:5000/api/messages/send', payload);
      
      // Screen par foran dikhane ke liye
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Message error:", err.response?.data);
      toast.error("Message fail: Schema enum mismatch ho sakta hai");
    }
  };

  return (
    <DashboardLayout title="Chat Space">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-all">
        <ArrowLeft size={18} /> <span className="text-xs font-bold uppercase tracking-wider">Back</span>
      </button>

      <div className="max-w-4xl mx-auto bg-[#0b141a] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col h-[75vh] shadow-2xl">
        
        {/* Header */}
        <div className="p-5 bg-[#202c33] border-b border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 border border-purple-500/30">
            <User size={24} />
          </div>
          <div>
            <h3 className="text-white font-black tracking-tight">{otherName || "Exhibitor"}</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] text-green-500 uppercase font-black tracking-tighter">Live Session</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#0b141a] custom-scrollbar">
          {messages.map((msg, index) => {
            // Check matching for both string and object IDs
            const isMe = msg.senderId === myId || msg.senderId?._id === myId;
            
            return (
              <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] px-4 py-2.5 shadow-xl ${
                  isMe 
                  ? 'bg-[#005c4b] text-white rounded-[1.2rem] rounded-tr-none' 
                  : 'bg-[#202c33] text-gray-200 rounded-[1.2rem] rounded-tl-none border border-white/5'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className="text-[9px] opacity-40 block mt-1 text-right font-medium">
                    {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-5 bg-[#202c33] flex gap-3 items-center">
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-[#2a3942] border border-transparent rounded-2xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-500"
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-500 p-4 rounded-2xl text-white shadow-lg shadow-purple-900/20 active:scale-90 transition-all">
            <Send size={20} />
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AttendeeChat;