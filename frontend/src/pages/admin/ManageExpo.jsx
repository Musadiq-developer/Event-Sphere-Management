import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, MapPin, Calendar, Loader2, Plus, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageExpos = () => {
  const navigate = useNavigate();
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExpos = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/admin/get');
      setExpos(response.data);
    } catch (error) {
      console.error("Error fetching expos:", error);
      toast.error("Failed to load expos data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpos();
  }, []);

  // --- MODERN CONFIRMATION LOGIC ---
  const handleDelete = (id) => {
    // Custom Toast Content for Confirmation
    const Msg = ({ closeToast }) => (
      <div className="flex flex-col gap-3 p-1">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle size={20} />
          <span className="font-bold">Confirm Delete</span>
        </div>
        <p className="text-sm text-gray-200"> Delete Expo permanently? This cannot be undone.</p>
        <div className="flex justify-end gap-2 mt-2">
          <button 
            onClick={closeToast}
            className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
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
    const loadingToast = toast.loading("Processing request...");
    try {
      await axios.delete(`http://localhost:5000/admin/delete/${id}`);
      setExpos(expos.filter(expo => expo._id !== id));
      
      toast.update(loadingToast, { 
        render: "Expo deleted successfully!", 
        type: "success", 
        isLoading: false, 
        autoClose: 3000 
      });
    } catch (error) {
      toast.update(loadingToast, { 
        render: "Error deleting expo.", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="page-transition">
    

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Manage Expos</h2>
          <p className="text-gray-400 text-sm">Manage and monitor all your scheduled exhibition events.</p>
        </div>
        <Link 
          to="/admin/dashboard/create-expo" 
           className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/20"
        >
          <Plus size={18} /> Create New Expo
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-purple-400">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="text-gray-400 animate-pulse">Fetching events data...</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-gray-300 text-xs uppercase tracking-widest border-b border-white/10">
                  <th className="px-8 py-5 font-bold">Event Details</th>
                  <th className="px-8 py-5 font-bold">Schedule</th>
                  <th className="px-8 py-5 font-bold">Location</th>
                  <th className="px-8 py-5 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {expos.length > 0 ? (
                  expos.map((expo) => (
                    <tr key={expo._id} className="hover:bg-white/[0.02] transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors">
                            {expo.title}
                          </span>
                          <span className="text-gray-500 text-xs mt-1 uppercase tracking-wider italic">
                            Theme: {expo.theme || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1 text-gray-300 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-purple-400 font-bold uppercase w-10">Start:</span>
                            <Calendar size={14} className="text-purple-500" />
                            {formatDate(expo.startDate)}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-pink-400 font-bold uppercase w-10">End:</span>
                            <Calendar size={14} className="text-pink-500" />
                            {formatDate(expo.endDate)}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-gray-300">
                          <MapPin size={16} className="text-purple-500" />
                          <span className="text-sm">{expo.location}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => navigate(`/admin/dashboard/edit-expo/${expo._id}`)} 
                            className="p-2.5 bg-white/5 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-white border border-white/5 transition-all duration-300"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(expo._id)}
                            className="p-2.5 bg-white/5 text-red-400 rounded-xl hover:bg-red-500 hover:text-white border border-white/5 transition-all duration-300"
                            title="Delete"
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
                        <Calendar size={48} strokeWidth={1} />
                        <p>No expos found. Start by creating your first event!</p>
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

export default ManageExpos;