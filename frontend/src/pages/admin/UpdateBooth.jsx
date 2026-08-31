import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBooth = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expos, setExpos] = useState([]);
  const [formData, setFormData] = useState({
    boothNumber: '',
    price: '',
    category: 'Standard',
    expoId: ''
    // Status field yahan se remove kar di gayi hai
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const [exposRes, boothRes] = await Promise.all([
          axios.get('http://localhost:5000/admin/get', config),
          axios.get(`http://localhost:5000/api/booths/single/${id}`, config)
        ]);

        setExpos(exposRes.data);
        
        const booth = boothRes.data;
        setFormData({
          boothNumber: booth.boothNumber,
          price: booth.price,
          category: booth.category,
          expoId: booth.expoId?._id || booth.expoId
        });
      } catch (err) {
        console.error("Error fetching data", err);
        toast.error(err.response?.data?.message || "Data load karne mein masla hua.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.warn("Session Expired! Please login again.");
        navigate('/login');
        return;
      }

      const config = {
        headers: { 
          Authorization: `Bearer ${token}`, 
          'Content-Type': 'application/json'
        }
      };

      // Payload mein sirf zaroori data bheja ja raha hai
      const updateData = {
        boothNumber: formData.boothNumber,
        price: Number(formData.price),
        category: formData.category,
        expoId: typeof formData.expoId === 'object' ? formData.expoId._id : formData.expoId
      };

      await axios.put(`http://localhost:5000/api/booths/update/${id}`, updateData, config);
      
      toast.success("Booth Updated Successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => navigate('/admin/dashboard/manage-booth'), 2000);
      
    } catch (err) {
      console.error("Update Error:", err.response?.data);
      if (err.response?.status === 401) {
        toast.error("Unauthorized Access");
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error(err.response?.data?.message || "Internal Server Error");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="animate-spin text-purple-500" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto page-transition">
    
      
      <button 
        onClick={() => navigate('/admin/dashboard/manage-booth')}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Manage Booths
      </button>

      <h2 className="text-3xl font-bold text-white mb-6">Edit Booth Details</h2>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div>
          <label className="block text-gray-400 mb-2 text-sm">Target Expo Event</label>
          <select 
            name="expoId"
            className="w-full bg-black/20 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-purple-500"
            value={formData.expoId}
            onChange={handleChange}
            required
          >
            <option value="" disabled className="bg-gray-900">Select Expo</option>
            {expos.map(e => (
              <option key={e._id} value={e._id} className="bg-gray-900">
                {e.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Booth Number</label>
            <input 
              name="boothNumber"
              value={formData.boothNumber}
              onChange={handleChange}
              className="w-full bg-black/20 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-purple-500"
              placeholder="e.g. A-101"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-sm">Price (Rs.)</label>
            <input 
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-black/20 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-purple-500"
              required
            />
          </div>
        </div>

        {/* Category section yahan ab full width ho gayi hai kyunki status remove kar diya gaya hai */}
        <div>
          <label className="block text-gray-400 mb-2 text-sm">Category</label>
          <select 
            name="category"
            className="w-full bg-black/20 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-purple-500"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Standard" className="bg-gray-900">Standard</option>
            <option value="Premium" className="bg-gray-900">Premium</option>
            <option value="VIP" className="bg-gray-900">VIP</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 mt-4"
          disabled={saving}
        >
          {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          Update Booth Information
        </button>
      </form>
    </div>
  );
};

export default UpdateBooth;