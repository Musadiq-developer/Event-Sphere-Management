import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatBox from '../../components/layout/StatBox';
import { Layout, MessageSquare, Briefcase } from 'lucide-react';

const ExhibitorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMainDashboard = location.pathname === '/exhibitor/dashboard';

  const [stats, setStats] = useState({
    myBoothsCount: 0,
    inquiries: 0, 
    productsCount: 0,
  });
  const [loading, setLoading] = useState(false);

  const loggedInUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const config = { 
    headers: { Authorization: `Bearer ${token}` } 
  };

  useEffect(() => {
    const fetchExhibitorStats = async () => {
      if (!isMainDashboard) return;
      
      setLoading(true);
      try {
        // 1. Fetch Booths Count (Tera Original Logic)
        const boothRes = await axios.get('http://localhost:5000/api/booths/all', config);
        const myBooths = boothRes.data.filter(booth => {
          const bookerId = booth.bookedBy?._id || booth.bookedBy;
          return String(bookerId) === String(loggedInUserId);
        });

        // 2. Fetch Products Count (Tera Original Logic)
        const profileRes = await axios.get('http://localhost:5000/api/exhibitor/my-profile', config);
        const productsLength = profileRes.data?.productShowcase?.length || 0;

        // 3. DYNAMIC INQUIRIES (Controller: getConversations logic)
        // Note: Route wahi rakhna jo 'getConversations' function ko hit kare
        const convoRes = await axios.get(`http://localhost:5000/api/messages/conversations/${loggedInUserId}`, config);
        const inquiriesCount = Array.isArray(convoRes.data) ? convoRes.data.length : 0;

        setStats({
          myBoothsCount: myBooths.length,
          productsCount: productsLength,
          inquiries: inquiriesCount 
        });

      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitorStats();
  }, [isMainDashboard, loggedInUserId]);

  const formatNum = (n) => (n < 10 ? `0${n}` : n);

  // Cards with updated Paths
  const exhibitorStats = [
    { 
      label: 'My Booths', 
      value: loading ? ".." : formatNum(stats.myBoothsCount), 
      icon: Layout,
      path: '/exhibitor/dashboard/my-booth' // Link updated
    },
    { 
      label: 'Products', 
      value: loading ? ".." : formatNum(stats.productsCount), 
      icon: Briefcase,
      path: '/exhibitor/dashboard/my-products' // Link updated
    },
    { 
      label: 'Inquiries', 
      value: loading ? ".." : formatNum(stats.inquiries), 
      icon: MessageSquare,
      path: '/exhibitor/dashboard/all-chats' // Messaging Page Link
    },
  ];

  return (
    <DashboardLayout title={"Exhibitor Dashboard"}>
      <Outlet />

      {isMainDashboard && (
        <div className="page-transition space-y-8">
          {/* Top Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {exhibitorStats.map((stat, index) => (
              <div 
                key={index} 
                onClick={() => navigate(stat.path)}
                className="cursor-pointer transform transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
              >
                <StatBox {...stat} />
              </div>
            ))}
          </div>

          {/* Welcome & Quick Actions Section */}
          <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Welcome back, Exhibitor!</h2>
              <p className="text-gray-400 max-w-2xl text-sm md:text-base mb-8">
                Manage your profile and track your <b>{stats.inquiries} inquiries</b> in real-time.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/exhibitor/dashboard/add-profile')}
                  className="py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-white hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-purple-500/10"
                >
                  Update Profile 
                </button>
                <button 
                  onClick={() => navigate('/exhibitor/dashboard/messages')}
                  className="py-4 px-6 bg-white/5 border border-white/10 rounded-2xl font-bold text-white hover:bg-white/10 transition-all active:scale-95"
                >
                  View All Chats
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ExhibitorDashboard;