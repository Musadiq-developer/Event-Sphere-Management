import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Search, Eye, FileText, Globe, Phone, Mail, X, Loader2, Calendar, Building2, AlertCircle } from 'lucide-react';

const ExhibitorList = () => {
  const [exhibitors, setExhibitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExhibitor, setSelectedExhibitor] = useState(null);

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/exhibitor/all-exhibitors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setExhibitors(res.data);
      } catch (err) {
        console.error("Error fetching exhibitors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExhibitors();
  }, []);

  const filteredExhibitors = exhibitors.filter(ex => 
    ex.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 page-transition text-white">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Users className="text-purple-500" size={36} /> Exhibitor Directory 
          </h2>
          <p className="text-gray-400 mt-1">Monitor and manage all registered company profiles and assets.</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by company or industry..." 
            className="form-control pl-12 w-full md:w-96 bg-white/5 border-white/10 focus:border-purple-500/50 transition-all rounded-xl py-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="animate-spin text-purple-500" size={48} />
          <p className="text-gray-500 animate-pulse">Loading exhibitor data...</p>
        </div>
      ) : (
        <>
          {/* Main Content Area with Conditionals */}
          {exhibitors.length === 0 ? (
            /* Case: Database is empty */
            <div className="flex flex-col items-center justify-center py-32 bg-white/5 border border-dashed border-white/10 rounded-[2.5rem]">
              <div className="p-6 bg-purple-500/10 rounded-full mb-4">
                <Building2 size={48} className="text-purple-500/50" />
              </div>
              <h3 className="text-xl font-bold text-gray-200">No Exhibitors Registered</h3>
              <p className="text-gray-500 mt-2">Currently, there are no company profiles available in the system.</p>
            </div>
          ) : filteredExhibitors.length === 0 ? (
            /* Case: Search results are empty */
            <div className="flex flex-col items-center justify-center py-32 bg-white/5 border border-dashed border-white/10 rounded-[2.5rem]">
              <div className="p-6 bg-red-500/10 rounded-full mb-4">
                <AlertCircle size={48} className="text-red-500/50" />
              </div>
              <h3 className="text-xl font-bold text-gray-200">No Match Found</h3>
              <p className="text-gray-500 mt-2 text-center px-4">
                We couldn't find any company or industry matching "<span className="text-purple-400 font-semibold">{searchTerm}</span>".
              </p>
              <button 
                onClick={() => setSearchTerm('')} 
                className="mt-6 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium underline"
              >
                Clear search and view all exhibitors
              </button>
            </div>
          ) : (
            /* Case: Exhibitors found */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExhibitors.map((ex) => (
                <div key={ex._id} className="bg-white/5 border border-white/10 p-6 rounded-[1.5rem] hover:border-purple-500/40 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 blur-3xl -z-10 group-hover:bg-purple-600/10 transition-all"></div>
                  
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-20 h-20 rounded-2xl bg-black/40 overflow-hidden border border-white/10 flex items-center justify-center shadow-inner">
                      {ex.logo ? (
                        <img src={`http://localhost:5000/${ex.logo}`} className="w-full h-full object-cover" alt="logo" />
                      ) : (
                        <Building2 size={32} className="text-purple-500/50" />
                      )}
                    </div>
                    <button 
                      onClick={() => setSelectedExhibitor(ex)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600/10 text-purple-400 rounded-xl hover:bg-purple-600 hover:text-white transition-all font-semibold text-sm border border-purple-500/20"
                    >
                      <Eye size={16} /> View Profile
                    </button>
                  </div>

                  <h3 className="text-xl font-bold mb-1 truncate text-gray-100">{ex.companyName}</h3>
                  <p className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">{ex.industry}</p>
                  
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="p-1.5 bg-white/5 rounded-lg"><Phone size={14} /></div>
                      {ex.contactPhone}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400 truncate">
                      <div className="p-1.5 bg-white/5 rounded-lg"><Mail size={14} /></div>
                      {ex.userId?.email || 'No Email Linked'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* --- Detail Modal --- */}
      {selectedExhibitor && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#0f111a] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col">
            
            {/* Modal Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-purple-900/10 to-transparent">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center border border-purple-500/30">
                   {selectedExhibitor.logo ? (
                      <img src={`http://localhost:5000/${selectedExhibitor.logo}`} className="w-full h-full object-cover rounded-2xl" alt="logo" />
                   ) : <Globe className="text-purple-400" size={30} />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedExhibitor.companyName}</h2>
                  <p className="text-purple-400 text-xs font-bold uppercase tracking-widest">{selectedExhibitor.industry}</p>
                </div>
              </div>
              <button onClick={() => setSelectedExhibitor(null)} className="p-3 hover:bg-white/10 rounded-full text-gray-400 transition-all border border-white/5"><X /></button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center">
                  <Mail size={18} className="text-purple-500 mx-auto mb-2" />
                  <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Email Address</p>
                  <p className="text-sm truncate">{selectedExhibitor.userId?.email || 'N/A'}</p>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center">
                  <Phone size={18} className="text-purple-500 mx-auto mb-2" />
                  <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Contact No</p>
                  <p className="text-sm">{selectedExhibitor.contactPhone}</p>
                </div>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-center">
                  <Calendar size={18} className="text-purple-500 mx-auto mb-2" />
                  <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Registered On</p>
                  <p className="text-sm">{new Date(selectedExhibitor.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-6 w-1 bg-purple-500 rounded-full"></div>
                  <h4 className="text-lg font-bold">Company Overview</h4>
                </div>
                <div className="text-gray-400 leading-relaxed bg-black/30 p-6 rounded-3xl border border-white/5">
                  {selectedExhibitor.description || "No company description provided."}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-6 w-1 bg-purple-500 rounded-full"></div>
                  <h4 className="text-lg font-bold">Product Showcase</h4>
                </div>
                {selectedExhibitor.productShowcase?.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {selectedExhibitor.productShowcase?.map((prod, i) => (
                      <div key={i} className="group bg-white/5 rounded-2xl border border-white/5 overflow-hidden transition-all hover:border-purple-500/30">
                        <div className="h-32 overflow-hidden">
                          <img src={`http://localhost:5000/${prod.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={prod.name} />
                        </div>
                        <div className="p-3 bg-white/[0.02]">
                          <p className="text-xs font-bold text-center truncate text-gray-300">{prod.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm ml-4">No products featured yet.</p>
                )}
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-6 w-1 bg-purple-500 rounded-full"></div>
                  <h4 className="text-lg font-bold">Verification Documents</h4>
                </div>
                {selectedExhibitor.documents?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedExhibitor.documents?.map((doc, i) => (
                      <a 
                        key={i} 
                        href={`http://localhost:5000/${doc}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-white/5 p-4 rounded-2xl hover:bg-white/10 border border-white/10 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-red-500/10 rounded-xl text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all">
                            <FileText size={20} />
                          </div>
                          <span className="text-sm font-semibold">Document_{i+1}.pdf</span>
                        </div>
                        <Globe size={18} className="text-gray-600 group-hover:text-purple-500" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm ml-4">No documents uploaded.</p>
                )}
              </section>
            </div>

            <div className="p-6 border-t border-white/5 bg-white/[0.01] flex justify-end">
              <button 
                onClick={() => setSelectedExhibitor(null)}
                className="px-10 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl font-bold shadow-lg shadow-purple-600/20 transition-all active:scale-95"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExhibitorList;