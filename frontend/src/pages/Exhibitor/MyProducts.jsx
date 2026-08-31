import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Search, ExternalLink, Box, Loader2, Tag, LayoutGrid, ArrowLeft } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
   const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/exhibitor/my-profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Exhibitor profile se products nikaal rahe hain
        if (res.data && res.data.productShowcase) {
          setProducts(res.data.productShowcase);
        }
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchMyProducts();
  }, []);

  // Search filter logic
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-8 page-transition text-white">
  <button 
        type="button" 
        onClick={() => navigate('/exhibitor/dashboard')}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Exhibitor Dashboard
      </button>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Package className="text-purple-500" size={32} /> My Product Showcase
          </h2>
          <p className="text-gray-400 mt-1">Manage and view all products you are showcasing in the expo.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:border-purple-500/50 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="animate-spin text-purple-500" size={48} />
          <p className="text-gray-500 animate-pulse text-lg">Loading your inventory...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01]">
          <div className="p-6 bg-white/5 rounded-full mb-4">
            <Box size={48} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400">No Products Found</h3>
          <p className="text-gray-500 mt-2 text-center max-w-xs">
            {searchTerm ? "No products match your search." : "Aapne abhi tak koi product add nahi kiya hai. Profile mein jaakar add karein."}
          </p>
        </div>
      ) : (
        /* Products Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={index} 
              className="group bg-[#161b22]/50 border border-white/10 rounded-[2rem] overflow-hidden hover:border-purple-500/40 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square overflow-hidden bg-black/20">
                <img 
                  src={`http://localhost:5000/${product.image}`} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                
                {/* Overlay Badge */}
                <div className="absolute top-4 right-4">
                    <div className="bg-purple-600/20 backdrop-blur-md border border-purple-500/30 p-2 rounded-xl text-purple-400">
                        <Tag size={16} />
                    </div>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <LayoutGrid size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Digital Catalog</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium italic">Verified Asset</span>
                    <button className="flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white transition-colors">
                        DETAILS <ExternalLink size={14} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;