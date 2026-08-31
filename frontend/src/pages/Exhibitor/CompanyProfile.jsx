import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, Package, FileText, Save, Loader2, Plus, X, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [productNameInput, setProductNameInput] = useState('');
  const [productFileInput, setProductFileInput] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [docFiles, setDocFiles] = useState([]);

  const [formData, setFormData] = useState({
    companyName: '', industry: '', description: '', contactPhone: '',
    productShowcase: [], documents: [], logo: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('http://localhost:5000/api/exhibitor/my-profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) setFormData(res.data);
      } catch (err) {
        console.log("No profile yet.");
      }
    };
    fetchProfile();
  }, []);

  const handleAddProduct = () => {
    if (productNameInput.trim() && productFileInput) {
      const newProduct = {
        name: productNameInput,
        file: productFileInput,
        preview: URL.createObjectURL(productFileInput)
      };
      setFormData({ 
        ...formData, 
        productShowcase: [...formData.productShowcase, newProduct] 
      });
      setProductNameInput('');
      setProductFileInput(null);
      document.getElementById('product-image-input').value = "";
    } else {
      toast.warn("Please provide both product name and image");
    }
  };

  const removeProduct = (index) => {
    setFormData({ 
      ...formData, 
      productShowcase: formData.productShowcase.filter((_, i) => i !== index) 
    });
  };

  const removeExistingDoc = (index) => {
    setFormData({ ...formData, documents: formData.documents.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('companyName', formData.companyName);
      data.append('industry', formData.industry);
      data.append('description', formData.description);
      data.append('contactPhone', formData.contactPhone);
      data.append('existingDocuments', JSON.stringify(formData.documents));

      if (logoFile) data.append('logo', logoFile);
      
      const existingProducts = [];
      formData.productShowcase.forEach((item) => {
        if (!item.file) {
          existingProducts.push(item);
        } else {
          data.append('productImages', item.file);
          data.append('productNames', item.name);
        }
      });
      data.append('existingProducts', JSON.stringify(existingProducts));
      docFiles.forEach((file) => data.append('documents', file));

      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data', 
          Authorization: `Bearer ${token}` 
        }
      };

      const res = await axios.post('http://localhost:5000/api/exhibitor/update-profile', data, config);
      if (res.data.success) {
        toast.success("Profile Updated Successfully!");
        setFormData(res.data.profile);
        setLogoFile(null);
        setDocFiles([]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Width increased to max-w-5xl to fill space */
    <div className="max-w-5xl mx-auto p-6 page-transition">
    
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          <Building2 className="text-purple-500" size={32} /> Company Profile
        </h2>
        <p className="text-gray-400 text-base">Manage your company assets and details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 p-10 rounded-2xl border border-white/10 shadow-2xl text-white">
        
        {/* Top Grid: Info Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase font-semibold">Company Name</label>
            <input required className="form-control" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-gray-400 uppercase font-semibold">Industry</label>
            <input required className="form-control" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs text-gray-400 uppercase font-semibold">Description</label>
            <textarea required rows="3" className="form-control pt-3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs text-gray-400 uppercase font-semibold">Business Contact</label>
            <input required className="form-control" value={formData.contactPhone} onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} />
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Product Showcase Section - Wider Layout */}
        <div className="space-y-4">
          <label className="text-sm text-gray-400 uppercase font-semibold flex items-center gap-2"><ImageIcon size={18}/> Product Showcase</label>
          
          <div className="bg-white/5 p-6 rounded-xl border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1">
               <label className="text-[10px] text-gray-500 block mb-1">Product Name</label>
               <input 
                className="form-control text-sm" 
                placeholder="Product name..." 
                value={productNameInput} 
                onChange={(e) => setProductNameInput(e.target.value)} 
              />
            </div>
            <div className="md:col-span-1">
               <label className="text-[10px] text-gray-500 block mb-1">Select Image</label>
               <input 
                id="product-image-input"
                type="file" 
                accept="image/*" 
                className="text-xs w-full" 
                onChange={(e) => setProductFileInput(e.target.files[0])} 
              />
            </div>
            <button type="button" onClick={handleAddProduct} className="bg-purple-600 h-[45px] rounded-lg hover:bg-purple-500 flex items-center justify-center gap-2 transition-colors">
              <Plus size={18}/> Add to Showcase
            </button>
          </div>

          {/* Grid increased to 3 columns for better width usage */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {formData.productShowcase.map((item, i) => (
              <div key={i} className="relative group bg-white/10 p-3 rounded-xl border border-white/10">
                <div className="w-full h-32 rounded overflow-hidden mb-2">
                  <img 
                    src={item.file ? item.preview : `http://localhost:5000/${item.image}`} 
                    className="w-full h-full object-cover" 
                    alt={item.name}
                  />
                </div>
                <p className="text-xs font-bold truncate pr-6">{item.name}</p>
                <button 
                  type="button" 
                  onClick={() => removeProduct(i)} 
                  className="absolute top-2 right-2 bg-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12}/>
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-white/10" />

        {/* Bottom Grid for Docs and Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-2"><FileText size={14}/> Documents</label>
            <div className="space-y-2 mb-2">
              {formData.documents.map((doc, i) => (
                <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5 text-[11px]">
                  <span className="truncate flex-1">{doc.split('/').pop()}</span>
                  <Trash2 size={14} className="text-red-500 cursor-pointer ml-2" onClick={() => removeExistingDoc(i)} />
                </div>
              ))}
            </div>
            <input type="file" multiple accept=".pdf,image/*" className="text-xs" onChange={(e) => setDocFiles(Array.from(e.target.files))} />
          </div>

          <div className="space-y-3">
            <label className="text-xs text-gray-400 uppercase font-semibold flex items-center gap-2"><Upload size={14}/> Company Logo</label>
            <div className="flex items-center gap-6 bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="w-20 h-20 rounded-lg border border-white/20 overflow-hidden bg-black/20 flex items-center justify-center">
                {logoFile ? <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-cover" /> : formData.logo ? <img src={`http://localhost:5000/${formData.logo}`} className="w-full h-full object-cover" /> : <Upload className="text-gray-500" />}
              </div>
              <input type="file" accept="image/*" className="text-xs" onChange={(e) => setLogoFile(e.target.files[0])} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-4 rounded-xl flex justify-center items-center gap-2 font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20 text-lg">
          {loading ? <Loader2 className="animate-spin" /> : <Save size={24} />}
          Update Profile & Assets
        </button>
      </form>
    </div>
  );
};

export default CompanyProfile;