import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, MessageSquare, Loader2, Calendar, Send, CheckCircle2, ArrowLeft as ArrowIcon, AlignLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { toast } from 'react-toastify';

const FeedBack = () => {
  const navigate = useNavigate();
  const [registeredExpos, setRegisteredExpos] = useState([]);
  // Ab hum sirf ID nahi, rating bhi store karenge: [{id: '123', rating: 5}]
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExpo, setSelectedExpo] = useState(null);
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const userId = localStorage.getItem('userId')?.replace(/["']/g, "");

  useEffect(() => {
    fetchMyEvents();
    // LocalStorage se data nikalna
    const savedSubmissions = JSON.parse(localStorage.getItem(`submitted_info_${userId}`) || "[]");
    setSubmittedData(savedSubmissions);
  }, [userId]);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/attendee/dashboard/${userId}`);
      setRegisteredExpos(res.data.upcomingExpos || []);
    } catch (err) {
      toast.error("Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return toast.warning("Please select stars!");
    if (!message.trim()) return toast.warning("Please write a message.");

    try {
      setSubmitting(true);
      await axios.post('http://localhost:5000/api/feedback/submit', {
        userId,
        targetId: selectedExpo.expoId._id,
        subject: `Feedback for ${selectedExpo.expoId.title}`,
        message: message.trim(),
        rating,
        userModel: "User"
      });
      
      toast.success("Feedback Submitted Successfully!");
      
      // Naya data object jisme rating bhi hai
      const newFeedbackEntry = { id: selectedExpo.expoId._id, rating: rating };
      const updatedSubmissions = [...submittedData, newFeedbackEntry];
      
      setSubmittedData(updatedSubmissions);
      localStorage.setItem(`submitted_info_${userId}`, JSON.stringify(updatedSubmissions));
      
      setSelectedExpo(null);
      setRating(0);
      setMessage("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Server Error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <DashboardLayout title="Event Feedbacks">
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-purple-500" size={40} />
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title="Event Feedbacks">
      <AnimatePresence mode="wait">
        {!selectedExpo ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 page-transition"
          >
            {registeredExpos.map((item) => {
              // Check karna kya is expo ka feedback submit ho gaya hai
              const submission = submittedData.find(s => s.id === item.expoId?._id);
              const isSubmitted = !!submission;

              return (
                <div 
                  key={item._id} 
                  onClick={() => !isSubmitted && setSelectedExpo(item)} 
                  className={`group relative overflow-hidden rounded-[2.5rem] p-8 transition-all duration-500 border shadow-2xl flex flex-col justify-between min-h-[280px] 
                    ${isSubmitted ? "bg-white/[0.02] border-white/5 opacity-80" : "bg-white/5 border-white/10 cursor-pointer hover:border-purple-500/50 hover:bg-white/[0.08]"}`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${isSubmitted ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-purple-500/10 text-purple-400 border-purple-500/20"}`}>
                        {isSubmitted ? "Submitted" : "Registered"}
                      </div>
                      {isSubmitted && <CheckCircle2 size={20} className="text-emerald-500" />}
                    </div>
                    <h3 className="text-2xl font-black mb-4 leading-tight text-white group-hover:text-purple-400 transition-colors">{item.expoId?.title}</h3>
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-purple-500" />
                      <p className="text-gray-400 text-xs font-bold uppercase">{new Date(item.expoId?.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                    {isSubmitted ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Your Rating</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              size={14} 
                              fill={submission.rating >= star ? "#10b981" : "none"} 
                              className={submission.rating >= star ? "text-emerald-500" : "text-gray-700"}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">Give Rating</span>
                        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-purple-600 transition-all text-purple-400 group-hover:text-white">
                          <MessageSquare size={20} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-5xl mx-auto p-4 page-transition"
          >
            <button 
              onClick={() => setSelectedExpo(null)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors font-bold text-sm"
            >
              <ArrowIcon size={20} /> Back to Events
            </button>

            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
              <form className="auth-form space-y-6" onSubmit={handleFeedbackSubmit}>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Rate Your Experience</h2>
                  <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mt-1 italic">
                    Event: {selectedExpo.expoId.title}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                  <div className="lg:col-span-2 form-group">
                    <label className="form-label text-gray-300 mb-3 block">Overall Rating</label>
                    <div className="bg-black/20 border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center transition-all h-[180px]">
                      <div className="flex gap-3 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            className="transform transition-all hover:scale-110 active:scale-90"
                          >
                            <Star 
                              size={32} 
                              fill={(hover || rating) >= star ? "#A855F7" : "none"} 
                              className={`transition-all duration-300 ${(hover || rating) >= star ? "text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]" : "text-gray-600"}`}
                            />
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em]">
                        {rating > 0 ? `Rating: ${rating} / 5` : "Tap to rate"}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-3 form-group">
                    <label className="form-label text-gray-300 mb-3 block">Detailed Feedback</label>
                    <div className="input-wrapper relative">
                      <AlignLeft className="input-icon absolute left-4 top-4 text-gray-400" size={20} />
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-control w-full pl-12 pt-3 min-h-[180px] bg-black/20"
                        placeholder="Briefly describe your experience at the expo..."
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="btn-primary w-full py-4 text-lg shadow-xl shadow-purple-900/20 flex items-center justify-center gap-2 group transition-all"
                >
                  {submitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <span>Submit Feedback</span>
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default FeedBack;