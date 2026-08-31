import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeft as ArrowIcon , Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify'; // Added Toastify
import 'react-toastify/dist/ReactToastify.css'; // Added CSS

const AddBooths = () => {
  const [expos, setExpos] = useState([]);
  const [selectedExpo, setSelectedExpo] = useState('');
  const [loading, setLoading] = useState(false);
  const [boothRows, setBoothRows] = useState([
    { boothNumber: '', price: '', category: 'Standard' }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/admin/get');
        setExpos(res.data);
      } catch (err) {
        console.error("Expos fetch error", err);
        toast.error("Failed to load expos."); // Replaced console with toast
      }
    };
    fetchExpos();
  }, []);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...boothRows];
    updatedRows[index][name] = value;
    setBoothRows(updatedRows);
  };

  const addNewRow = () => {
    setBoothRows([...boothRows, { boothNumber: '', price: '', category: 'Standard' }]);
  };

  const removeRow = (index) => {
    setBoothRows(boothRows.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedExpo) return toast.warn("Please select an expo"); // Added warning toast

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/booths/add-multiple', {
        expoId: selectedExpo,
        booths: boothRows
      });
      
    
      toast.success("All booths saved successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      
      setTimeout(() => {
        navigate('/admin/dashboard/manage-booth'); 
      }, 2500);
      
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save booths"); // Error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto page-transition">
      {/* Toast Container to render notifications */}
     

      <button 
        onClick={() => navigate('/admin/dashboard/manage-booth')}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors"
      >
        <ArrowIcon size={20} /> Back to Manage Booths
      </button>

      <h2 className="text-3xl font-bold text-white mb-6">Setup Expo Booths</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
          <label className="block text-gray-400 mb-2">Select Target Expo</label>
          <select 
            className="w-full bg-black/20 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-purple-500"
            value={selectedExpo}
            onChange={(e) => setSelectedExpo(e.target.value)}
            required
          >
            <option value="" className='bg-gray-900'>-- Choose Expo --</option>
            {expos.map(e => <option key={e._id} value={e._id} className='bg-gray-900'>{e.title}</option>)}
          </select>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-xs uppercase">
              <tr>
                <th className="p-4">Booth #</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (Rs.)</th>
                <th className="p-4 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {boothRows.map((row, index) => (
                <tr key={index} className="border-t border-white/5">
                  <td className="p-4">
                    <input 
                      name="boothNumber"
                      value={row.boothNumber}
                      onChange={(e) => handleInputChange(index, e)}
                      className="bg-transparent border-b border-white/10 focus:border-purple-500 text-white w-full outline-none"
                      placeholder="A-1" required
                    />
                  </td>
                  <td className="p-4">
                    <select 
                      name="category"
                      value={row.category}
                      onChange={(e) => handleInputChange(index, e)}
                      className="bg-transparent text-gray-300 w-full outline-none"
                    >
                      <option value="Standard" className="bg-gray-900">Standard</option>
                      <option value="Premium" className="bg-gray-900">Premium</option>
                      <option value="VIP" className="bg-gray-900">VIP</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <input 
                      name="price"
                      type="number"
                      value={row.price}
                      onChange={(e) => handleInputChange(index, e)}
                      className="bg-transparent border-b border-white/10 focus:border-purple-500 text-white w-full outline-none"
                      placeholder="5000" required
                    />
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      type="button" 
                      onClick={() => removeRow(index)}
                      className="text-gray-500 hover:text-red-500"
                      disabled={boothRows.length === 1}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            type="button" 
            onClick={addNewRow}
            className="w-full p-4 text-sm text-purple-400 hover:bg-white/5 flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add Another Row
          </button>
        </div>

        <button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-bold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          Save All Booths for this Expo
        </button>
      </form>
    </div>
  );
};

export default AddBooths;