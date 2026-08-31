import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, BookmarkX, Clock, User, BookmarkPlus, Ticket } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { toast } from 'react-toastify';

const MyBookmarks = () => {
  const [bookmarkedSessions, setBookmarkedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const userFromStorage = localStorage.getItem('user');
  const currentUser = userFromStorage ? JSON.parse(userFromStorage) : null;
  const currentUserId = currentUser?._id || currentUser?.id || localStorage.getItem('userId');

  useEffect(() => {
    if (currentUserId) fetchMyBookmarks();
    else setLoading(false);
  }, [currentUserId]);

  const fetchMyBookmarks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/bookmarks/details/${currentUserId}`);
      setBookmarkedSessions(res.data);
    } catch (err) {
      if (err.response?.status !== 404) toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (sessionId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/bookmarks/toggle`, {
        attendeeId: currentUserId,
        sessionId: sessionId
      });
      if (!res.data.isBookmarked) {
        setBookmarkedSessions(prev => prev.filter(s => s._id !== sessionId));
        toast.info("Removed from schedule");
      }
    } catch (err) {
      toast.error("Failed to remove bookmark");
    }
  };

  if (loading) return (
    <DashboardLayout title="">
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <Loader2 className="animate-spin text-purple-400 mb-4" size={40} />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Updating Schedule...</p>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title="">
      {/* Main Container - Responsive Padding */}
      <div className="max-w-7xl mx-auto pb-10 md:pb-20 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 md:mb-14 text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">My Entry Passes</h1>
          <div className="h-[3px] w-12 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
        </div>

        {bookmarkedSessions.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 sm:p-16 md:p-24 text-center backdrop-blur-md transition-all">
            <BookmarkPlus size={48} className="text-purple-400/30 mx-auto mb-6" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">No Passes Found</h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">Your bookmarked sessions will appear here as digital entry passes.</p>
          </div>
        ) : (
          /* Responsive Grid Logic */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {bookmarkedSessions.map((session) => (
              <div 
                key={session._id} 
                className="bg-[#242630] border border-white/10 p-6 md:p-8 rounded-[1.8rem] md:rounded-[2.2rem] flex flex-col justify-between hover:bg-[#2a2d3a] hover:border-purple-500/30 transition-all duration-500 relative group shadow-2xl overflow-hidden min-h-[340px]"
              >
                {/* Visual Glass Effect Overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-[50px] group-hover:bg-purple-600/10 transition-all duration-700"></div>

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <span className="text-[7px] md:text-[8px] font-bold bg-purple-900/30 text-purple-300 px-3 md:px-4 py-1.5 rounded-full uppercase tracking-widest border border-purple-500/10 backdrop-blur-sm">
                      General Admission Pass
                    </span>
                    <div className="bg-purple-600 p-2.5 rounded-xl shadow-lg shadow-purple-900/40 group-hover:rotate-12 transition-transform duration-300">
                      <Ticket size={18} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Title - line clamp for clean multi-line support */}
                  <h4 className="text-lg md:text-xl font-bold text-white mb-5 leading-tight group-hover:text-purple-300 transition-colors line-clamp-2">
                    {session.title}
                  </h4>

                  {/* Info Row */}
                  <div className="space-y-3.5 mb-6 md:mb-8">
                    <div className="flex items-center gap-3 text-gray-400 text-xs font-medium">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                        <Clock size={14} className="text-purple-500" />
                      </div>
                      {new Date(session.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-xs font-medium">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                        <User size={14} className="text-purple-500" />
                      </div>
                      <span className="truncate">{session.speaker || "Keynote Session"}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Interactive Area */}
                <div className="pt-5 border-t border-white/5 flex justify-between items-center mt-auto">
                  <button className="text-[9px] md:text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] hover:text-purple-300 transition-colors">
                    View Digital Pass
                  </button>
                  <button 
                    onClick={() => removeBookmark(session._id)}
                    className="p-2.5 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all duration-300 border border-red-500/10 active:scale-90 group/remove"
                    title="Remove Pass"
                  >
                    <BookmarkX size={16} className="group-hover/remove:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyBookmarks;