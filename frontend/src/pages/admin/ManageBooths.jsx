import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Trash2, Loader2, Plus, Edit3, AlertTriangle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageBooths = () => {
  const [booths, setBooths] = useState([]);
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterExpo, setFilterExpo] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  const fetchBooths = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/booths/all?expoId=${filterExpo}&status=${filterStatus}`);
      setBooths(res.data);
    } catch (err) {
      console.error("Fetch error", err);
      toast.error("Failed to load booths data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadExpos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/admin/get');
        setExpos(res.data);
      } catch (err) {
        console.error("Expos fetch error", err);
      }
    };
    loadExpos();
    fetchBooths();
  }, [filterExpo, filterStatus]);

  // Category Color Helper
  const getCategoryStyle = (cat) => {
    const category = cat?.toLowerCase();
    if (category === 'gold') return 'bg-amber-400/10 text-amber-500 border border-amber-500/20';
    if (category === 'silver') return 'bg-slate-400/10 text-slate-300 border border-slate-500/20';
    if (category === 'platinum') return 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
    return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'; // Default Modern Look
  };

  const handleDelete = (id) => {
    const Msg = ({ closeToast }) => (
      <div className="flex flex-col gap-3 p-1">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle size={20} />
          <span className="font-bold">Confirm Delete</span>
        </div>
        <p className="text-sm text-gray-200">Are you sure? You want to delete this Booth.</p>
        <div className="flex justify-end gap-2 mt-2">
          <button 
            onClick={closeToast}
            className="px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            cancel
          </button>
          <button 
            onClick={() => {
              closeToast();
              executeDelete(id);
            }}
            className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors shadow-lg shadow-red-500/20"
          >
            Yes
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
    const loadingToast = toast.loading("Booth delete ...");
    try {
      await axios.delete(`http://localhost:5000/api/booths/delete/${id}`);
      setBooths(booths.filter(b => b._id !== id));
      
      toast.update(loadingToast, { 
        render: "Booth deleted successfully!", 
        type: "success", 
        isLoading: false, 
        autoClose: 3000 
      });
    } catch (err) {
      toast.update(loadingToast, { 
        render: "Delete failed. Please try again.", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };

  return (
    <div className="p-8 page-transition">
    
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Manage Booths</h2>
          <p className="text-gray-400">Track and monitor all exhibition stalls status.</p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button 
            onClick={() => navigate('/admin/dashboard/add-booth')} 
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg shadow-purple-500/20"
          >
            <Plus size={18} /> Add New Booths
          </button>

          <select 
            className="bg-white/5 border border-white/10 p-2 rounded-lg text-sm text-white outline-none"
            value={filterExpo}
            onChange={(e) => setFilterExpo(e.target.value)}
          >
            <option value="" className="bg-gray-900">All Expos</option>
            {expos.map(e => <option key={e._id} value={e._id} className="bg-gray-900">{e.title}</option>)}
          </select>

          <select 
            className="bg-white/5 border border-white/10 p-2 rounded-lg text-sm text-white outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="" className="bg-gray-900">All Status</option>
            <option value="Available" className="bg-gray-900">Available</option>
            <option value="Pending" className="bg-gray-900">Pending</option>
            <option value="Booked" className="bg-gray-900">Booked</option>
            <option value="Rejected" className="bg-gray-900">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-purple-500" size={40} /></div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-5">Booth No.</th>
                <th className="p-5">Expo Event</th>
                <th className="p-5">Category</th>
                <th className="p-5">Price</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {booths.map((booth) => (
                <tr key={booth._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-5 font-bold text-white">{booth.boothNumber}</td>
                  <td className="p-5 text-gray-300">{booth.expoId?.title || 'Deleted Expo'}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getCategoryStyle(booth.category)}`}>
                      {booth.category}
                    </span>
                  </td>
                  <td className="p-5 text-emerald-400 font-semibold">Rs. {booth.price}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      booth.status === 'Available' ? 'bg-blue-500/20 text-blue-400' :
                      booth.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                      booth.status === 'Booked' ? 'bg-emerald-500/20 text-emerald-400' :
                      booth.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {booth.status}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => navigate(`/admin/dashboard/update-booth/${booth._id}`)}
                        className="p-2.5 bg-white/5 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-white border border-white/5 transition-all duration-300"
                        title="Update Booth"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(booth._id)}
                        className="p-2.5 bg-white/5 text-red-400 rounded-xl hover:bg-red-500 hover:text-white border border-white/5 transition-all duration-300"
                        title="Delete Booth"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {booths.length === 0 && (
            <div className="p-20 text-center text-gray-500 italic">No booths found for this selection.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageBooths;