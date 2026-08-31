import React, { useState } from 'react';
import { MapPin, AlignLeft, Palette, Calendar as CalendarIcon, Sparkles, ArrowLeft as ArrowIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateExpo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    theme: ''
  });

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/admin/create', formData);
      if (response.status === 200 || response.status === 201) {
        // Signup style toast
        toast.success("Expo Created Successfully!", {
          position: "top-right",
          autoClose: 2000,
        });

        setFormData({
          title: '', startDate: '', endDate: '', location: '', description: '', theme: ''
        });

        setTimeout(() => {
          navigate('/admin/dashboard/manage-expo');
        }, 2500);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Error creating expo event");
    }
  };

  return (
    <div className="max-w-4xl mx-auto page-transition p-8">
      {/* ToastContainer added here */}
     
      
      <button 
        type="button" 
        onClick={() => navigate('/admin/dashboard/manage-expo')}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
      >
        <ArrowIcon size={20} /> Back to Manage Expos
      </button>

      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
        <form className="auth-form space-y-2" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-white mb-4">Create New Expo</h2>
          
          <div className="form-group">
            <label className="form-label text-gray-300">Expo Title</label>
            <div className="input-wrapper relative flex items-center">
              <Sparkles className="input-icon absolute left-3 text-gray-400" size={20} />
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control w-full pl-10"
                placeholder="e.g. Global Tech Summit 2026"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label text-gray-300">Start Date</label>
              <div className="input-wrapper relative flex items-center">
                <CalendarIcon className="input-icon absolute left-3 text-gray-400" size={20} />
                <input
                  required
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={today}
                  className="form-control w-full pl-10"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label text-gray-300">End Date</label>
              <div className="input-wrapper relative flex items-center">
                <CalendarIcon className="input-icon absolute left-3 text-gray-400" size={20} />
                <input
                  required
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || today} 
                  className="form-control w-full pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label text-gray-300">Location / Venue</label>
              <div className="input-wrapper relative flex items-center">
                <MapPin className="input-icon absolute left-3 text-gray-400" size={20} />
                <input
                  required
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-control w-full pl-10"
                  placeholder="Convention Center, NY"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label text-gray-300">Event Theme</label>
              <div className="input-wrapper relative flex items-center">
                <Palette className="input-icon absolute left-3 text-gray-400" size={20} />
                <input
                  type="text"
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className="form-control w-full pl-10"
                  placeholder="Future of AI"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label text-gray-300">Description</label>
            <div className="input-wrapper relative">
              <AlignLeft className="input-icon absolute left-3 top-4 text-gray-400" size={20} />
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="form-control w-full pl-10 pt-2 min-h-[120px]"
                placeholder="Briefly describe the expo's purpose..."
              ></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 text-lg shadow-xl shadow-purple-900/20 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : null}
            {loading ? "Creating..." : "Create Expo Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateExpo;