import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Save, 
  ArrowLeft as ArrowIcon, 
  Loader2, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { toast } from 'react-toastify';

const EditSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    speaker: '',
    startTime: '',
    endTime: '',
    location: ''
  });

  // 1. Purana Data Fetch Karein
  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/admin/manage/sessions`);
        const sessionToEdit = res.data.find(s => s._id === id);
        
        if (sessionToEdit) {
          setFormData({
            title: sessionToEdit.title,
            speaker: sessionToEdit.speaker,
            startTime: new Date(sessionToEdit.startTime).toISOString().slice(0, 16),
            endTime: new Date(sessionToEdit.endTime).toISOString().slice(0, 16),
            location: sessionToEdit.location
          });
        }
      } catch (err) {
        toast.error("Session details load nahi ho sakiin");
      } finally {
        setLoading(false);
      }
    };
    fetchSessionDetails();
  }, [id]);

  // 2. Form Submission (Update Logic)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/admin/manage/sessions/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Session successfully update ho gaya!", {
        position: "top-right",
        autoClose: 2000,
      });
      
      setTimeout(() => {
        navigate('/admin/dashboard/manage-sessions');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update fail ho gaya");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-purple-500" size={48} />
        <p className="text-gray-400 animate-pulse">Fetching session details...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto page-transition p-8">
      {/* Header / Back Button */}
      <button 
        type="button" 
        onClick={() => navigate('/admin/dashboard/manage-sessions')}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors group"
      >
        <ArrowIcon size={20} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Manage Sessions
      </button>

      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Sparkles className="text-purple-500" size={24} />
            Edit Session Details
          </h2>
          <p className="text-gray-400 text-sm mt-1">Modify the timing, speaker, or location of the scheduled session.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form space-y-6">
          {/* Title */}
          <div className="form-group">
            <label className="form-label text-gray-300 flex items-center gap-2 mb-2 text-sm">
              <CalendarIcon size={16} className="text-purple-400" /> Session Title
            </label>
            <div className="input-wrapper relative">
              <input 
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="form-control w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-500 transition-all"
                placeholder="e.g. AI Revolution in 2026"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Speaker */}
            <div className="form-group">
              <label className="form-label text-gray-300 flex items-center gap-2 mb-2 text-sm">
                <User size={16} className="text-purple-400" /> Speaker Name
              </label>
              <input 
                type="text"
                required
                value={formData.speaker}
                onChange={(e) => setFormData({...formData, speaker: e.target.value})}
                className="form-control w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-500 transition-all"
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label text-gray-300 flex items-center gap-2 mb-2 text-sm">
                <MapPin size={16} className="text-purple-400" /> Location / Hall
              </label>
              <input 
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="form-control w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Time */}
            <div className="form-group">
              <label className="form-label text-gray-300 flex items-center gap-2 mb-2 text-sm">
                <Clock size={16} className="text-purple-400" /> Start Time
              </label>
              <input 
                type="datetime-local"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                className="form-control w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-500 transition-all appearance-none"
              />
            </div>

            {/* End Time */}
            <div className="form-group">
              <label className="form-label text-gray-300 flex items-center gap-2 mb-2 text-sm">
                <Clock size={16} className="text-purple-400" /> End Time
              </label>
              <input 
                type="datetime-local"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                className="form-control w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-purple-500 transition-all appearance-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="px-8 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={updating}
              className="btn-primary min-w-[180px] bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20"
            >
              {updating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSession;