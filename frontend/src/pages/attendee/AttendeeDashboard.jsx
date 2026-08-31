import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Ticket, Bookmark, MessageSquare, ArrowRight, 
  Calendar, Building2, LayoutGrid, User, Clock, Loader2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatBox from '../../components/layout/StatBox';

const AttendeeDashboard = () => {
  const [data, setData] = useState(null);
  const [featuredBooths, setFeaturedBooths] = useState([]); 
  const [totalBoothsCount, setTotalBoothsCount] = useState(0); 
  const [bookmarkCount, setBookmarkCount] = useState(0); 
  const [loading, setLoading] = useState(true);
  
  const attendeeId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!attendeeId) return;
      try {
        setLoading(true);
        
        // 1. Fetch Stats & Bookings
        const dashRes = await axios.get(`http://localhost:5000/attendee/dashboard/${attendeeId}`);
        setData(dashRes.data);

        // 2. Fetch All Booths for Inventory Stats
        const boothsRes = await axios.get(`http://localhost:5000/api/booths/all`);
        setTotalBoothsCount(boothsRes.data.length); 

        // 3. Fetch Bookmarks Count from Database
        const bookmarkRes = await axios.get(`http://localhost:5000/api/bookmarks/my-ids/${attendeeId}`);
        setBookmarkCount(bookmarkRes.data.length);

        // 4. Recommended Section
        const bookedOnes = boothsRes.data.filter(b => b.status === 'Booked').slice(0, 3);
        setFeaturedBooths(bookedOnes);

        setLoading(false);
      } catch (err) {
        console.error("Dashboard error:", err);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [attendeeId]);

  if (loading) return (
    <DashboardLayout title="Loading Space...">
      <div className="flex justify-center py-40">
        <Loader2 className="animate-spin text-purple-500" size={40} />
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title="Overview">
      
      {/* 1. Stats Grid - Active Chats Removed, Grid adjusted to 3 for better look */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatBox label="Registrations" value={data?.upcomingExpos?.length || 0} icon={Ticket} />
        <StatBox label="Saved Sessions" value={bookmarkCount} icon={Bookmark} />
        <StatBox label="Exhibition Booths" value={totalBoothsCount || "0"} icon={LayoutGrid} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          {/* 2. Recent Bookings Card */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Ticket className="text-purple-400" /> Recent Bookings
              </h2>
              <Link to="/tickets" className="text-purple-400 text-sm font-bold flex items-center gap-1 hover:underline">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {data?.upcomingExpos?.length > 0 ? data.upcomingExpos.slice(0, 2).map((booking) => (
                <div key={booking._id} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-500/10 p-3 rounded-xl">
                      <Calendar className="text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">
                        {booking.expoId?.title}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.expoId?.startDate).toDateString()}
                      </p>
                    </div>
                  </div>
                  <Link to={`/attendee/expo/${booking.expoId?._id}`} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              )) : (
                <p className="text-gray-500 text-center py-4 italic border border-dashed border-white/10 rounded-2xl">
                  No active registrations found.
                </p>
              )}
            </div>
          </div>

          {/* 3. Recommended Exhibitors Section */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
             <h2 className="text-xl font-bold flex items-center gap-2 mb-8 text-white">
                <Bookmark className="text-purple-400" size={20} /> Recommended for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredBooths.length > 0 ? featuredBooths.map((booth) => (
                  <div key={booth._id} className="bg-white/5 p-5 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 overflow-hidden border border-white/10">
                      {booth.logo ? (
                        <img src={`http://localhost:5000/${booth.logo}`} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="text-gray-600" size={20} />
                      )}
                    </div>
                    <h5 className="font-black text-white text-sm truncate">{booth.companyName || "Individual"}</h5>
                    <p className="text-[9px] text-purple-400/60 uppercase font-bold tracking-widest">
                      {booth.industry || "Exhibitor"}
                    </p>
                  </div>
                )) : (
                  <p className="col-span-full text-gray-600 text-sm italic">Discovering new exhibitors...</p>
                )}
              </div>
          </div>
        </div>

        {/* 4. Sidebar Panels */}
        <div className="space-y-6">
           <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
              <h3 className="font-bold mb-4 italic text-white text-xl uppercase tracking-tighter">Event Access</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                Your digital passes are generated automatically upon registration.
              </p>
              <Link to="/tickets" className="block w-full py-4 bg-white text-black text-center rounded-2xl font-black text-xs tracking-widest hover:bg-purple-100 transition-colors shadow-lg">
                MY PASSES
              </Link>
           </div>

           <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem] space-y-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4 opacity-50">Quick Links</h4>
              
              <Link to="/attendee/bookmarks" className="flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-purple-500/10 border border-white/5 transition-all group">
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-gray-400 group-hover:text-purple-400" />
                  <span className="text-sm text-gray-300">My Favourites</span>
                </div>
                <div className="flex items-center gap-2">
                  {bookmarkCount > 0 && (
                    <span className="bg-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-purple-500/20">
                      {bookmarkCount}
                    </span>
                  )}
                  <ArrowRight size={14} className="text-gray-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link to="/attendee/profile" className="flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-purple-500/10 border border-white/5 transition-all group">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-gray-400 group-hover:text-purple-400" />
                  <span className="text-sm text-gray-300">View Profile</span>
                </div>
                <ArrowRight size={14} className="text-gray-600 group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendeeDashboard;