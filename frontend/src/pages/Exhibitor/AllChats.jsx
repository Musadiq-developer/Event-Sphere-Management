import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, MessageSquare, Loader2, Send, ArrowLeft, ShieldAlert, Headset } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext'; 

const AllChats = () => {
  const { user: currentUser } = useAuth(); 
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const scrollRef = useRef();

  const myId = currentUser?._id || currentUser?.id;
  const myRole = currentUser?.role;

  useEffect(() => { 
    if (myId) fetchAllConversations(); 
  }, [myId]);

  useEffect(() => { 
    scrollRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [messages]);

  const fetchAllConversations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/messages/conversations/${myId}`);
      setConversations(res.data);
    } catch (err) { 
      toast.error("Failed to load chats"); 
    } finally { 
      setLoading(false); 
    }
  };

  const startAdminChat = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/admin-details`);
      const adminData = res.data;
      
      if (adminData._id === myId) {
        toast.info("You are the Admin.");
        return;
      }

      const adminChat = {
        _id: adminData._id,
        contactDetails: { name: adminData.name, role: 'Admin' }
      };
      openChat(adminChat);
    } catch (err) { 
      toast.error("Organizer is offline"); 
    }
  };

  const openChat = async (chat) => {
    setSelectedChat(chat);
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/history/${myId}/${chat._id}`);
      setMessages(res.data);
      await axios.put(`http://localhost:5000/api/messages/read/${myId}/${chat._id}`);
    } catch (err) { 
      toast.error("Error loading history"); 
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat || !myRole) {
        if(!myRole) toast.error("User role not found. Please re-login.");
        return;
    }

    // Logic: Sender Ka model set karna
    const sModel = (myRole === 'Admin' || myRole === 'Attendee') ? 'User' : 'Exhibitor';

    // Logic: Receiver ka model decide karna (Check based on chat role)
    let rModel = 'User'; // Default
    if (selectedChat.contactDetails?.role === 'Exhibitor') {
      rModel = 'Exhibitor';
    } else if (selectedChat.contactDetails?.role === 'Admin') {
      rModel = 'User';
    } else if (selectedChat.contactDetails?.role === 'Attendee') {
      rModel = 'User';
    }

    const payload = {
      senderId: myId,
      receiverId: selectedChat._id,
      senderModel: sModel,
      receiverModel: rModel,
      text: newMessage
    };

    try {
      const res = await axios.post('http://localhost:5000/api/messages/send', payload);
      setMessages(prev => [...prev, res.data]);
      setNewMessage("");
      fetchAllConversations(); 
    } catch (err) { 
      console.error("Send Error:", err.response?.data);
      toast.error(err.response?.data?.message || "Failed to send message"); 
    }
  };

  const filteredChats = conversations.filter(c => 
    (c.contactDetails?.name || c.contactDetails?.companyName || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[85vh] max-w-6xl mx-auto bg-[#161b30] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>

      {/* Sidebar */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-white/10 flex flex-col bg-[#11162d]/80 backdrop-blur-xl relative z-10 ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
            <MessageSquare className="text-purple-400" size={24} /> 
            Inbox
          </h1>
          
          {myRole !== 'Admin' && (
            <button 
              onClick={startAdminChat}
              className="w-full mb-6 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all shadow-lg active:scale-95 border border-purple-400/20"
            >
              <Headset size={18} /> Contact Organizer
            </button>
          )}

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-[#0d1121] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-purple-500/50 outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
          {loading ? (
            <div className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-purple-500" /></div>
          ) : filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div 
                key={chat._id} 
                onClick={() => openChat(chat)} 
                className={`p-4 mx-2 my-1 rounded-2xl flex items-center gap-4 cursor-pointer transition-all border ${
                  selectedChat?._id === chat._id 
                    ? 'bg-purple-600/20 border-purple-500/40 shadow-lg shadow-purple-900/20' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md ${chat.contactDetails?.role === 'Admin' ? 'bg-gradient-to-tr from-pink-600 to-purple-600' : chat.contactDetails?.role === 'Exhibitor' ? 'bg-gradient-to-tr from-blue-600 to-indigo-600' : 'bg-gradient-to-tr from-emerald-600 to-teal-600'}`}>
                  {(chat.contactDetails?.name || chat.contactDetails?.companyName)?.[0] || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate flex items-center gap-2">
                    {chat.contactDetails?.name || chat.contactDetails?.companyName}
                    {chat.contactDetails?.role === 'Admin' && <ShieldAlert size={14} className="text-pink-500" />}
                  </h4>
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] text-purple-400 font-bold uppercase">{chat.contactDetails?.role}</p>
                    <p className="text-[10px] text-gray-500">{chat.lastMessageDate ? new Date(chat.lastMessageDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""}</p>
                  </div>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{chat.lastMessage}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-10 text-gray-500 text-sm italic">No conversations found</div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col bg-[#0d1121]/60 backdrop-blur-md relative z-10 ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
        {selectedChat ? (
          <>
            <div className="p-5 bg-[#11162d]/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedChat(null)} className="md:hidden text-gray-400 hover:text-white"><ArrowLeft size={24}/></button>
                <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center border border-purple-500/20 text-purple-400 font-bold">
                  {(selectedChat.contactDetails?.name || selectedChat.contactDetails?.companyName || "?")[0]}
                </div>
                <div>
                  <div className="text-white font-bold text-base leading-tight truncate max-w-[150px] md:max-w-xs">
                    {selectedChat.contactDetails?.name || selectedChat.contactDetails?.companyName}
                  </div>
                  <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mt-0.5">
                    {selectedChat.contactDetails?.role}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-transparent">
              {messages.map((msg, i) => {
                const isMe = (msg.senderId?._id || msg.senderId) === myId;
                return (
                  <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3.5 rounded-2xl max-w-[75%] text-sm shadow-md ${
                        isMe 
                        ? 'bg-purple-600 text-white rounded-tr-none' 
                        : 'bg-[#1a2036] text-gray-200 rounded-tl-none border border-white/5'
                    }`}>
                      {msg.text}
                      <div className={`text-[8px] mt-1 opacity-50 ${isMe ? 'text-right' : 'text-left'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={scrollRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-[#11162d]/90 border-t border-white/10 flex gap-3">
              <input 
                value={newMessage} 
                onChange={(e)=>setNewMessage(e.target.value)} 
                className="flex-1 bg-[#0d1121] border border-white/10 rounded-xl py-3.5 px-5 text-white text-sm outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-500" 
                placeholder="Type your message..." 
              />
              <button type="submit" className="bg-purple-600 p-3.5 rounded-xl text-white transition-all hover:bg-purple-500 active:scale-95 shadow-lg shadow-purple-900/20">
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <div className="p-6 rounded-full bg-white/5 mb-4">
                <MessageSquare size={48} className="opacity-30 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold text-lg">Your Messages</h3>
            <p className="text-sm opacity-60 mt-1">Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllChats;