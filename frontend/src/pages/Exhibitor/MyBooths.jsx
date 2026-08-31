import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Box, Clock, CheckCircle, XCircle, MapPin, CreditCard, RefreshCcw, ArrowLeft } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyBooths = () => {
  const [myBooths, setMyBooths] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // FIXED: Added parentheses to properly initialize the hook
  const navigate = useNavigate(); 
  
  const loggedInUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchMyBooths = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/booths/all', config);
      
      const filtered = res.data.filter(booth => {
        const bookerId = booth.bookedBy?._id || booth.bookedBy;
        return String(bookerId) === String(loggedInUserId);
      });
      
      setMyBooths(filtered);
    } catch (err) {
      toast.error("Failed to load your booths");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooths();
  }, []);

  return (
    <div className="p-8 page-transition text-white">
  
      
      {/* Navigation Button */}
      <button 
        type="button" 
        onClick={() => navigate('/exhibitor/dashboard')}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Exhibitor Dashboard
      </button>

      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold">My Reserved Booths</h2>
          <p className="text-gray-400 mt-1">Track the status of your booth applications and reservations.</p>
        </div>
        <button 
          onClick={fetchMyBooths} 
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all"
        >
          <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="animate-spin text-purple-500" size={48} />
          <p className="text-gray-500">Checking your reservations...</p>
        </div>
      ) : myBooths.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.02]">
          <Box size={64} className="text-gray-700 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400">No Booths Found</h3>
          <p className="text-gray-500 mt-2 text-center max-w-sm">
            You haven't reserved any booths yet. Go to the "Floor Plan" to start booking.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBooths.map((booth) => (
            <div key={booth._id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:border-purple-500/30 transition-all group relative overflow-hidden shadow-lg">
              
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-purple-600/10 rounded-2xl border border-purple-500/20">
                  <Box className="text-purple-400" size={24} />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                  booth.status === 'Booked' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                  booth.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                  'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                  {booth.status}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">Booth #{booth.boothNumber}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                    <MapPin size={14} className="text-purple-500" />
                    {booth.expoId?.title || "Event Location"}
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-y border-white/5">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-400 font-medium text-emerald-400">Rs. {booth.price}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">{booth.category}</span>
                </div>

                <div className="pt-2">
                  {booth.status === 'Pending' && (
                    <div className="flex items-center gap-2 text-yellow-500/80 text-xs">
                      <Clock size={14} /> Application is under review by admin
                    </div>
                  )}
                  {booth.status === 'Booked' && (
                    <div className="flex items-center gap-2 text-green-500/80 text-xs">
                      <CheckCircle size={14} /> Congratulations! Your slot is confirmed
                    </div>
                  )}
                  {booth.status === 'Rejected' && (
                    <div className="flex items-center gap-2 text-red-500/80 text-xs">
                      <XCircle size={14} /> This request was declined. Contact Admin.
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-600/5 blur-3xl rounded-full"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooths;