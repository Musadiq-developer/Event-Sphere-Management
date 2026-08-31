import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  MessageSquare, 
  Trash2, 
  User, 
  Star, 
  Calendar, 
  RefreshCcw, 
  AlertTriangle, 
  Loader2, 
  CheckCircle2 
} from 'lucide-react';

const ManageFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/feedback/all');
      setFeedbacks(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/feedback/update-status/${id}`, { status: newStatus });
      if (res.data.success) {
        setFeedbacks(feedbacks.map(fb => fb._id === id ? { ...fb, status: newStatus } : fb));
        toast.success(`Status updated to ${newStatus}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update Failed");
    }
  };

  const handleDelete = (id) => {
    const Msg = ({ closeToast }) => (
      <div className="flex flex-col gap-3 p-1 text-left">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle size={20} />
          <span className="font-bold uppercase tracking-tighter">Confirm Purge</span>
        </div>
        <p className="text-sm text-gray-200">Delete this feedback entry? This action is permanent.</p>
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={closeToast} className="px-3 py-1.5 text-[10px] font-bold uppercase bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
            Cancel
          </button>
          <button 
            onClick={() => { closeToast(); executeDelete(id); }}
            className="px-3 py-1.5 text-[10px] font-bold uppercase bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg shadow-red-500/20"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    );
    toast.warn(<Msg />, { position: "top-center", autoClose: false, closeOnClick: false, draggable: false, icon: false });
  };

  const executeDelete = async (id) => {
    const loadingToast = toast.loading("Processing...");
    try {
      await axios.delete(`http://localhost:5000/api/feedback/${id}`);
      setFeedbacks(feedbacks.filter(fb => fb._id !== id));
      toast.update(loadingToast, { render: "Feedback Deleted", type: "success", isLoading: false, autoClose: 2000 });
    } catch (err) {
      toast.update(loadingToast, { render: "Delete Failed", type: "error", isLoading: false, autoClose: 2000 });
    }
  };

  return (
    <div className="page-transition p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Manage Feedbacks & Ratings</h2>
          <p className="text-gray-400 text-sm">Monitor and moderate all user submitted responses.</p>
        </div>
        <button 
          onClick={fetchFeedbacks}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-95"
        >
          <RefreshCcw size={18} className={`${loading && 'animate-spin'}`} /> Refresh Data
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-purple-400">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="text-gray-400 animate-pulse uppercase tracking-[0.2em] text-[10px] font-bold">Synchronizing Logs...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.length > 0 ? (
            feedbacks.map((fb) => (
              <div key={fb._id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-md relative overflow-hidden group hover:border-purple-500/40 transition-all duration-300">
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-600/20 p-3 rounded-2xl text-purple-400 border border-purple-500/20">
                      <User size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg truncate w-36 capitalize tracking-tight flex items-center gap-2">
                        {fb.userId?.name || "Anonymous User"}
                        {fb.status === 'Resolved' && <CheckCircle2 size={14} className="text-emerald-500" />}
                      </h4>
                      <div className="flex gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i < (fb.rating || 0) ? "#A855F7" : "none"} 
                            className={i < (fb.rating || 0) ? "text-purple-500" : "text-gray-600"} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(fb._id)} 
                    className="p-2.5 bg-white/5 text-red-400 rounded-xl hover:bg-red-500 hover:text-white border border-white/5 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="bg-black/20 p-5 rounded-2xl mb-4 border border-white/5 min-h-[100px] relative">
                  <span className="absolute top-2 right-4 text-[9px] text-gray-600 font-bold uppercase tracking-tighter">
                    {fb.type || "Feedback"}
                  </span>
                  <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-1">Sub: {fb.subject}</p>
                  <p className="text-gray-400 text-sm leading-relaxed italic line-clamp-3 pt-2">"{fb.message}"</p>
                  
                  {fb.status !== 'Resolved' && (
                    <button 
                      onClick={() => handleStatusUpdate(fb._id, 'Resolved')}
                      className="absolute bottom-2 right-4 text-[9px] font-bold text-emerald-500 hover:text-emerald-400 transition-colors uppercase tracking-widest flex items-center gap-1"
                    >
                      <CheckCircle2 size={12} /> Mark Resolved
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-center text-[10px] font-black text-gray-500 uppercase tracking-widest pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1.5 text-purple-400/70">
                    <Calendar size={13} /> {new Date(fb.createdAt).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-0.5 rounded border ${fb.status === 'Resolved' ? 'border-emerald-500/30 text-emerald-500' : 'border-amber-500/30 text-amber-500'}`}>
                    {fb.status || 'Pending'}
                  </span>
                </div>
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-600/5 blur-3xl rounded-full group-hover:bg-purple-600/10 transition-all"></div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <MessageSquare size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-500 uppercase tracking-widest text-xs">No feedbacks found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageFeedbacks;