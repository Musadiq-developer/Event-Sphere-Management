import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, MapPin, Ticket, ArrowLeft, User, 
  Building2, MessageSquare, Loader2, CheckCircle, Clock, 
  ShieldCheck, Zap, Bookmark, BookmarkCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { toast } from 'react-toastify';

const ExpoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [expo, setExpo] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [booths, setBooths] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('schedule');
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [sessionBookmarks, setSessionBookmarks] = useState([]); 

  const userFromStorage = localStorage.getItem('user');
  const currentUser = userFromStorage ? JSON.parse(userFromStorage) : null;
  const currentUserId = currentUser?._id || currentUser?.id || localStorage.getItem('userId');

  useEffect(() => {
    fetchFullDetails();
    if (currentUserId) {
      checkRegistrationStatus();
      fetchUserBookmarks();
    }
  }, [id, currentUserId]);

  const fetchFullDetails = async () => {
    try {
      setLoading(true);
      const [expoRes, sessionsRes, boothsRes] = await Promise.all([
        axios.get(`http://localhost:5000/attendee/expo/${id}`),
        axios.get(`http://localhost:5000/attendee/sessions/${id}`),
        axios.get(`http://localhost:5000/api/booths/expo/${id}`)
      ]);
      setExpo(expoRes.data);
      setSessions(sessionsRes.data);
      setBooths(boothsRes.data);
    } catch (err) {
      toast.error("Failed to load expo details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookmarks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bookmarks/my-ids/${currentUserId}`);
      setSessionBookmarks(res.data);
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
    }
  };

  const toggleBookmark = async (e, sessionId) => {
    e.stopPropagation();
    if (!currentUserId) return toast.warn("Please login.");
    try {
      const res = await axios.post(`http://localhost:5000/api/bookmarks/toggle`, {
        attendeeId: currentUserId,
        sessionId: sessionId
      });
      if (res.data.isBookmarked) {
        setSessionBookmarks(prev => [...prev, sessionId]);
        toast.success("Added to schedule");
      } else {
        setSessionBookmarks(prev => prev.filter(sid => sid !== sessionId));
        toast.info("Removed from schedule");
      }
    } catch (err) {
      toast.error("Error updating bookmark.");
    }
  };

  const handleStartChat = (booth) => {
    const exhibitorId = booth.bookedBy?._id || booth.bookedBy;
    if (!exhibitorId) return toast.error("Exhibitor contact unavailable.");
    const sellerName = booth.companyName || 'Exhibitor';
    navigate(`/attendee/messages?withId=${exhibitorId}&withName=${encodeURIComponent(sellerName)}&withRole=Exhibitor`);
  };

  const checkRegistrationStatus = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/attendee/dashboard/${currentUserId}`);
      const alreadyBooked = res.data.upcomingExpos.some(booking => booking.expoId._id === id);
      if (alreadyBooked) setIsRegistered(true);
    } catch (err) {
      console.log("Status check failed");
    }
  };

  const handleRegistration = async () => {
    if (!currentUserId) return toast.warn("Please login.");
    try {
      setRegLoading(true);
      const res = await axios.post(`http://localhost:5000/attendee/register`, {
        attendeeId: currentUserId,
        expoId: id
      });
      if (res.status === 201) {
        toast.success("Registered Successfully!");
        setIsRegistered(true);
      }
    } catch (err) {
      toast.error("Registration failed.");
    } finally {
      setRegLoading(false);
    }
  };

  if (loading) return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="animate-spin text-purple-500 mb-4" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Processing Request...</p>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title="">
      <div className="min-h-screen text-white p-2">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-purple-400 mb-8 transition-all group">
          <ArrowLeft size={18} /> 
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Portal</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden relative">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                {expo?.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <div className="bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-[9px] font-black border border-purple-500/20 uppercase tracking-widest">
                  {expo?.theme}
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest">
                  <MapPin size={14} className="text-purple-500" />
                  <span>{expo?.location}</span>
                </div>
              </div>

              <div className="flex gap-8 border-b border-white/5 mb-10 overflow-x-auto scrollbar-hide">
                {['about', 'schedule', 'exhibitors'].map((tab) => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)} 
                    className={`pb-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-purple-400' : 'text-gray-500 hover:text-white'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 shadow-[0_0_15px_#a855f7]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[250px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'about' && (
                    <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-gray-400 leading-relaxed text-lg font-light">
                      {expo?.description}
                    </motion.p>
                  )}
                  {activeTab === 'schedule' && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-3">
                      {sessions.map((s) => (
                        <div key={s._id} className="bg-white/[0.02] border border-white/5 p-5 rounded-[1.5rem] flex justify-between items-center hover:bg-white/[0.05] transition-all">
                          <div>
                            <h4 className="text-lg font-bold text-white">{s.title}</h4>
                            <p className="text-[10px] text-purple-500 font-black uppercase tracking-widest mt-1">{s.speaker || "Guest TBA"}</p>
                          </div>
                          <button onClick={(e) => toggleBookmark(e, s._id)} className={`p-2 ${sessionBookmarks.includes(s._id) ? 'text-purple-500' : 'text-gray-700'}`}>
                            <BookmarkCheck size={24} fill={sessionBookmarks.includes(s._id) ? "currentColor" : "none"} />
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  {activeTab === 'exhibitors' && (
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {booths.filter(b => b.status === 'Booked').map((b) => (
                        <div key={b._id} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] group hover:border-purple-500/30 transition-all">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="bg-purple-600/20 p-3 rounded-2xl text-purple-400">
                              <Building2 size={24} />
                            </div>
                            <h4 className="text-lg font-black text-white">{b.companyName}</h4>
                          </div>
                          <button 
                            onClick={() => handleStartChat(b)} 
                            className="w-full py-4 bg-white/5 text-white border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-purple-600 hover:border-purple-600 transition-all flex items-center justify-center gap-2"
                          >
                            <MessageSquare size={16} /> Open Channel
                          </button>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-10 sticky top-8 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              
              <div className="flex items-center justify-between mb-8">
                <div className="px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-[9px] font-black uppercase tracking-widest">
                  Secure Portal
                </div>
                <div className="p-3 bg-white/5 rounded-2xl">
                  <Ticket className="text-white" size={20} />
                </div>
              </div>
              
              <h3 className="text-2xl font-black mb-4 leading-tight text-white uppercase tracking-tight">
                Event Access
              </h3>
              
              <p className="text-xs text-gray-500 font-medium leading-relaxed mb-8">
                Generate your digital entry pass and synchronize it with your mobile device for seamless entry.
              </p>

              <button 
                onClick={handleRegistration}
                disabled={regLoading || isRegistered}
                className={`w-full py-5 rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-3
                  ${isRegistered 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default' 
                    : 'bg-white text-black hover:bg-gray-200 shadow-[0_10px_30px_rgba(255,255,255,0.05)] active:scale-95'}`}
              >
                {regLoading ? <Loader2 className="animate-spin" size={18} /> : isRegistered ? <><ShieldCheck size={18} /> REGISTERED</> : "GET TICKET"}
              </button>

              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                     <Zap size={16} className="text-purple-500" />
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                       Immediate Activation
                     </p>
                   </div>
                   <div className="flex items-center gap-3">
                     <CheckCircle size={16} className="text-purple-500" />
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                       QR Code Secured
                     </p>
                   </div>
                </div>
              </div>

              <div className="mt-8 pt-6 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
                <span>VisionEye Verified</span>
                <ShieldCheck size={18} className="opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExpoDetails;