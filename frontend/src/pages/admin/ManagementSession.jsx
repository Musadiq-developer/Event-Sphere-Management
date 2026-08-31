import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, Trash2, Clock, User, MapPin, Loader2, AlertTriangle, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

const ManageSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Records fetch karne ka logic
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/admin/manage/sessions');
      setSessions(Array.isArray(res.data) ? res.data : (res.data.sessions || []));
    } catch (err) {
      toast.error("Records load nahi ho sakay.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Delete Confirmation Logic (Manage Expo ki tarah Toast based)
  const confirmDelete = (id, title) => {
    const Msg = ({ closeToast }) => (
      <div className="flex flex-col gap-3 p-1">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle size={20} />
          <span className="font-bold">Confirm Delete</span>
        </div>
        <p className="text-sm text-gray-200">
          Delete session <span className="text-purple-400 font-semibold">"{title}"</span>? 
          This action is permanent.
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <button 
            onClick={closeToast}
            className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              closeToast();
              executeDelete(id);
            }}
            className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors shadow-lg shadow-red-500/20"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    );

    toast.warn(<Msg />, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      icon: false
    });
  };

  const executeDelete = async (id) => {
    const loadingToast = toast.loading("Deleting session...");
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/admin/manage/sessions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessions(prev => prev.filter(s => s._id !== id));
      
      toast.update(loadingToast, { 
        render: "Session deleted successfully!", 
        type: "success", 
        isLoading: false, 
        autoClose: 3000 
      });
    } catch (err) {
      toast.update(loadingToast, { 
        render: "Delete fail ho gaya.", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };

  return (
    <div className="page-transition">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Manage Sessions</h2>
          <p className="text-gray-400 text-sm">Manage speaker schedules, timings, and talk locations.</p>
        </div>
        <Link 
          to="/admin/dashboard/add-session" 
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/20"
        >
          <Plus size={18} /> Add New Session
        </Link>
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-purple-400">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="text-gray-400 animate-pulse">Loading schedules...</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-300 text-xs uppercase tracking-widest border-b border-white/10">
                  <th className="px-8 py-5 font-bold">Session & Speaker</th>
                  <th className="px-8 py-5 font-bold">Timing</th>
                  <th className="px-8 py-5 font-bold">Location</th>
                  <th className="px-8 py-5 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sessions.length > 0 ? (
                  sessions.map((session) => (
                    <tr key={session._id} className="hover:bg-white/[0.02] transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors">
                            {session.title}
                          </span>
                          <div className="flex items-center gap-2 text-gray-500 text-xs mt-1 italic uppercase tracking-wider">
                            <User size={12} className="text-purple-500/70" />
                            {session.speaker}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1 text-gray-300 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-purple-500" />
                            {new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase ml-5">
                            <Calendar size={10} />
                            {new Date(session.startTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin size={16} className="text-purple-500" />
                          <span className="text-sm">{session.location}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => navigate(`/admin/dashboard/edit-session/${session._id}`)} 
                            className="p-2.5 bg-white/5 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white border border-white/5 transition-all duration-300"
                            title="Edit Session"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => confirmDelete(session._id, session.title)}
                            className="p-2.5 bg-white/5 text-red-400 rounded-xl hover:bg-red-500 hover:text-white border border-white/5 transition-all duration-300"
                            title="Delete Session"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-20">
                      <div className="flex flex-col items-center gap-3 text-gray-500">
                        <Clock size={48} strokeWidth={1} />
                        <p>No sessions scheduled yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSessions;