import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle, Lock, Clock, XCircle, LayoutGrid, Info } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const ExhibitorBooking = () => {
  const [booths, setBooths] = useState([]);
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(false); // Initially false
  const [selectedExpo, setSelectedExpo] = useState('');

  const loggedInUserId = localStorage.getItem('userId'); 
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const loadExpos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/admin/get');
        setExpos(res.data);
      } catch (err) { console.error(err); }
    };
    loadExpos();
  }, []);

  const fetchAllBooths = async () => {
    if (!selectedExpo) {
      setBooths([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/booths/all?expoId=${selectedExpo}`);
      setBooths(res.data);
    } catch (err) { 
      toast.error("Error loading booths"); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchAllBooths(); }, [selectedExpo]);

  const handleBookNow = async (boothId) => {
    try {
      await axios.patch(`http://localhost:5000/api/booths/book/${boothId}`, {}, config);
      toast.success("Request sent!");
      fetchAllBooths(); 
    } catch (err) { toast.error("Failed to send request"); }
  };

  return (
    <div className="p-8 page-transition">

      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Reserve Booth</h2>
        <p className="text-gray-400">Select an available booth to reserve for your business.</p>
      </div>

      {/* Select Dropdown */}
      <div className="mb-10">
        <label className="block text-sm font-medium text-gray-400 mb-2">Choose an Active Expo</label>
        <select 
          className="w-full max-w-xs bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-purple-500 transition-all cursor-pointer" 
          value={selectedExpo} 
          onChange={(e) => setSelectedExpo(e.target.value)}
        >
          <option value="" className="bg-gray-900 text-gray-400 text-center">-- Select an Expo --</option>
          {expos.map(e => <option key={e._id} value={e._id} className="bg-gray-900">{e.title}</option>)}
        </select>
      </div>

      {/* Conditional Rendering Logic */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-purple-500" size={50} />
          <p className="text-gray-400 animate-pulse text-sm">Fetching floor plan data...</p>
        </div>
      ) : !selectedExpo ? (
        // Case 1: Expo select nahi kiya
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
          <LayoutGrid size={60} className="text-gray-700 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400">No Expo Selected</h3>
          <p className="text-gray-500 max-w-xs text-center mt-2">Please choose an expo from the dropdown above to view available booths.</p>
        </div>
      ) : booths.length === 0 ? (
        // Case 2: Expo select kiya magar booths nahi hain
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-red-500/10 rounded-3xl bg-red-500/[0.01]">
          <Info size={60} className="text-red-900/50 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400">No Booths Found</h3>
          <p className="text-gray-500 max-w-xs text-center mt-2">Currently, there are no booths registered for this specific expo. Please check back later or contact admin.</p>
        </div>
      ) : (
        // Case 3: Booths show karna
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {booths.map((booth) => {
            const boothBookerId = booth.bookedBy?._id || booth.bookedBy;
            const isMyRequest = String(boothBookerId) === String(loggedInUserId);
            let displayStatus = booth.status;

            if (booth.status === 'Rejected') {
              displayStatus = isMyRequest ? 'Rejected' : 'Available';
            }

            return (
              <div key={booth._id} className={`p-6 rounded-2xl border transition-all ${displayStatus === 'Available' ? 'border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-white/10'}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">Booth {booth.boothNumber}</h3>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                    displayStatus === 'Booked' ? 'bg-green-500/20 text-green-400 border-green-500/20' :
                    displayStatus === 'Pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20' : 
                    displayStatus === 'Rejected' ? 'bg-red-500/20 text-red-500 border-red-500/50' : 
                    'bg-blue-500/20 text-blue-400 border-blue-500/20'
                  }`}>{displayStatus}</span>
                </div>
                
                <p className="text-2xl font-semibold text-emerald-400 mb-6">Rs. {booth.price}</p>

                {displayStatus === 'Available' ? (
                  <button onClick={() => handleBookNow(booth._id)} className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 transition-colors">
                    <CheckCircle size={18} /> Reserve Now
                  </button>
                ) : displayStatus === 'Pending' && isMyRequest ? (
                  <button disabled className="w-full py-3 rounded-xl bg-yellow-500/20 text-yellow-400 font-bold border border-yellow-500/20 flex items-center justify-center gap-2">
                    <Clock size={18} /> Waiting Approval
                  </button>
                ) : displayStatus === 'Rejected' && isMyRequest ? (
                  <button disabled className="w-full py-3 rounded-xl bg-red-500/10 text-red-500 font-bold border border-red-500/20 flex items-center justify-center gap-2">
                    <XCircle size={18} /> Rejected By Admin
                  </button>
                ) : (
                  <button disabled className="w-full py-3 rounded-xl bg-white/5 text-gray-500 font-bold flex items-center justify-center gap-2 border border-white/5">
                    <Lock size={18} /> {displayStatus === 'Booked' ? 'Occupied' : 'Restricted'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExhibitorBooking;