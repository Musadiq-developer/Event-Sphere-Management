import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Bookmark aur BookmarkCheck icons add kiye hain
import { Calendar, MapPin, Ticket, Search, X, Loader2, Lock, Bookmark, BookmarkCheck } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { toast } from 'react-toastify';

const ExploreExpos = () => {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState([]); // Bookmarks state
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpos();
  }, [searchTerm]);

  const fetchExpos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/attendee/explore?search=${searchTerm}`);
      setExpos(res.data);
    } catch (err) {
      toast.error("Exhibitions load nahi ho sakeen.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Bookmark Function
  const toggleBookmark = (e, id) => {
    e.stopPropagation(); // Card click event ko rokne ke liye
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(b => b !== id));
      toast.info("Removed from bookmarks");
    } else {
      setBookmarks([...bookmarks, id]);
      toast.success("Added to bookmarks!");
    }
    // TODO: Yahan aap apni backend API call kar sakte hain:
    // axios.post('/api/bookmarks', { expoId: id })
  };

  return (
    <DashboardLayout title="Explore Exhibitions">
      {/* Search Bar Code remains same... */}

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" size={40} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expos.map((expo) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const eventEnd = new Date(expo.endDate || expo.startDate);
            const isExpired = eventEnd < today;
            const isBookmarked = bookmarks.includes(expo._id);

            return (
              <div 
                key={expo._id} 
                onClick={() => !isExpired && navigate(`/attendee/expo/${expo._id}`)} 
                className={`group relative border rounded-[2.5rem] p-8 transition-all duration-500 flex flex-col justify-between min-h-[340px]
                  ${isExpired 
                    ? 'bg-black/40 border-white/5 cursor-not-allowed opacity-50 grayscale' 
                    : 'bg-white/5 border-white/10 cursor-pointer hover:border-purple-500/50 hover:bg-white/[0.08]'
                  }`}
              >
                {/* Top Actions: Badge & Bookmark */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    isExpired ? 'bg-gray-800 text-gray-500 border-gray-700' : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                  }`}>
                    {expo.theme}
                  </div>

                  {/* Bookmark Button */}
                  {!isExpired && (
                    <button 
                      onClick={(e) => toggleBookmark(e, expo._id)}
                      className={`p-2.5 rounded-xl transition-all duration-300 border ${
                        isBookmarked 
                        ? 'bg-purple-500 border-purple-400 text-white' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                    </button>
                  )}
                  
                  {isExpired && (
                    <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-500/30 flex items-center gap-1">
                      <Lock size={12} /> Closed
                    </div>
                  )}
                </div>

                <div>
                  <h3 className={`text-2xl font-black mb-4 leading-tight ${isExpired ? 'text-gray-500' : 'text-white group-hover:text-purple-400'}`}>
                    {expo.title}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar size={18} className={isExpired ? "text-gray-700" : "text-purple-500"} />
                      <p className={isExpired ? "text-gray-600" : "text-gray-400 font-bold"}>
                        {new Date(expo.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <MapPin size={18} className={isExpired ? "text-gray-700" : "text-purple-500"} />
                      <p className={isExpired ? "text-gray-600" : "text-gray-400"}>{expo.location}</p>
                    </div>
                  </div>
                </div>

                {/* Footer remains same... */}
                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isExpired ? 'text-gray-700' : 'text-purple-400'}`}>
                    {isExpired ? 'EVENT ENDED' : 'JOIN EXHIBITION'}
                  </span>
                  {!isExpired && (
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-purple-600 text-white transition-all shadow-lg group-hover:shadow-purple-500/20">
                      <Ticket size={20} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ExploreExpos;