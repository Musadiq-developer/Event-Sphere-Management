import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  ArrowLeft as ArrowIcon, 
  Save, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Tag, 
  Loader2, 
  Sparkles 
} from 'lucide-react';

const CreateSession = () => {
  const navigate = useNavigate();
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    expoId: '',
    title: '',
    speaker: '',
    startTime: '',
    endTime: '',
    location: ''
  });

  // Dropdown ke liye saare Expos load karna
  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/admin/get');
        setExpos(res.data);
      } catch (err) {
        toast.error("Expos load nahi ho sake. Dropdown empty rahega.");
      }
    };
    fetchExpos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      return toast.error("End time, Start time ke baad honi chahiye!");
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/admin/manage/sessions', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Session successfully schedule ho gaya!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate('/admin/dashboard/manage-sessions');
      }, 2500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Session create nahi ho saka");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto page-transition p-8">
      {/* Back Button */}
      <button 
        type="button" 
        onClick={() => navigate('/admin/dashboard/manage-sessions')}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors"
      >
        <ArrowIcon size={20} /> Back to Manage Sessions
      </button>

      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
        <form className="auth-form space-y-6" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Schedule New Session</h2>
            <p className="text-gray-400 text-sm italic">Fill in the details to add a new speaker session to an expo.</p>
          </div>
          
          {/* Expo Selection */}
          <div className="form-group">
            <label className="form-label text-gray-300 flex items-center gap-2">
              <Tag size={16} /> Select Event (Expo)
            </label>
            <div className="input-wrapper relative flex items-center">
              <select 
                required
                value={formData.expoId}
                onChange={(e) => setFormData({...formData, expoId: e.target.value})}
                className="form-control w-full bg-slate-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-purple-500 outline-none appearance-none"
              >
                <option value="" className="bg-slate-900 text-gray-400">Choose an Expo</option>
                {expos.map(expo => (
                  <option key={expo._id} value={expo._id} className="bg-slate-900 text-white">
                    {expo.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Session Title & Speaker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label text-gray-300 flex items-center gap-2">
                <Sparkles size={16} /> Session Title
              </label>
              <div className="input-wrapper relative flex items-center">
                <input 
                  type="text" 
                  placeholder="e.g. Future of Web Tech"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="form-control w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none" 
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label text-gray-300 flex items-center gap-2">
                <User size={16} /> Speaker Name
              </label>
              <div className="input-wrapper relative flex items-center">
                <input 
                  type="text" 
                  placeholder="e.g. John Doe"
                  required
                  value={formData.speaker}
                  onChange={(e) => setFormData({...formData, speaker: e.target.value})}
                  className="form-control w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Timings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label text-gray-300 flex items-center gap-2">
                <Clock size={16} /> Start Time
              </label>
              <div className="input-wrapper relative flex items-center">
                <input 
                  type="datetime-local" 
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="form-control w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none" 
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label text-gray-300 flex items-center gap-2">
                <Clock size={16} /> End Time
              </label>
              <div className="input-wrapper relative flex items-center">
                <input 
                  type="datetime-local" 
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  className="form-control w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label text-gray-300 flex items-center gap-2">
              <MapPin size={16} /> Location / Hall Name
            </label>
            <div className="input-wrapper relative flex items-center">
              <input 
                type="text" 
                placeholder="e.g. Seminar Hall A"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="form-control w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none" 
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 text-lg shadow-xl shadow-purple-900/20 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {loading ? "Scheduling..." : "Confirm & Schedule Session"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;