import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  MapPin, 
  Building2, 
  Award, 
  Loader2, 
  ArrowLeft,
  Trophy
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApprovedExhibitors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchApprovedData = async () => {
      try {
        // Hum booths API se data le rahe hain kyunki wahan status 'Booked' confirm hota hai
        const res = await axios.get('http://localhost:5000/api/booths/all', config);
        // Sirf wahi dikhayen jo 'Booked' hain (Admin approved)
        const approvedOnly = res.data.filter(booth => booth.status === 'Booked');
        setData(approvedOnly);
      } catch (err) {
        console.error("Error fetching approved exhibitors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApprovedData();
  }, []);

  const filteredData = data.filter(item => 
    item.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.boothNumber?.toString().includes(searchTerm)
  );

  return (
    <div className="max-w-7xl mx-auto p-6 page-transition text-white">
      
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back  to Admin Dashboard
          </button>
          <h2 className="text-4xl font-extrabold flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
           Approved Booth
          </h2>
          <p className="text-gray-400 mt-2">List of all verified partners and allocated booth spaces.</p>
        </div>

        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by company or booth #..." 
            className="w-full bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none transition-all rounded-2xl py-3.5 pl-12 pr-4 shadow-2xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="animate-spin text-purple-500" size={50} />
          <p className="text-gray-500 font-medium animate-pulse">Filtering verified records...</p>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white/5 border border-dashed border-white/10 rounded-[3rem]">
          <div className="p-6 bg-white/5 rounded-full mb-6">
            <Award size={60} className="text-gray-700" />
          </div>
          <h3 className="text-2xl font-bold text-gray-300">No Approved Exhibitors</h3>
          <p className="text-gray-500 mt-2">Requests that are approved by admin will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item) => (
            <div 
              key={item._id} 
              className="group relative bg-gradient-to-b from-white/10 to-transparent border border-white/10 p-8 rounded-[2.5rem] hover:border-emerald-500/30 transition-all duration-500"
            >
              {/* Status Badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Verified</span>
              </div>

              {/* Booth Icon */}
              <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                <Trophy className="text-purple-400" size={32} />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                  {item.companyName}
                </h3>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Building2 size={14} className="text-gray-600" /> {item.expoId?.title || "Annual Expo 2026"}
                </p>
              </div>

              {/* Booth Details Card */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Booth Slot</p>
                  <p className="text-lg font-mono font-bold text-white">#{item.boothNumber}</p>
                </div>
                <div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Category</p>
                  <p className="text-lg font-bold text-purple-400">Premium</p>
                </div>
              </div>

              {/* Footer Info */}
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={12} />
                  <span>Main Exhibition Hall</span>
                </div>
                <button className="text-white/30 hover:text-white transition-colors">
                  <ExternalLink size={18} />
                </button>
              </div>

              {/* Decorative Blur */}
              <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Footer */}
      {!loading && filteredData.length > 0 && (
        <div className="mt-16 text-center border-t border-white/5 pt-10">
          <p className="text-gray-500 text-sm">
            Total of <span className="text-emerald-500 font-bold">{filteredData.length}</span> partners have been officially onboarded.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApprovedExhibitors;