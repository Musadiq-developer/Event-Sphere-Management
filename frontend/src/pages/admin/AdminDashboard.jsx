import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Users, Calendar, CheckCircle, Clock, Activity, Bell, TrendingUp 
} from 'lucide-react';

import DashboardLayout from '../../components/layout/DashboardLayout';
import StatBox from '../../components/layout/StatBox';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMainDashboard = location.pathname === '/admin/dashboard';

  const [stats, setStats] = useState({
    totalExpos: 0,
    allApplications: 0,
    approvedBooths: 0,
    upcomingSessions: 0,
  });

  const [notifications, setNotifications] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const config = { 
    headers: { 
      Authorization: `Bearer ${localStorage.getItem('token')}` 
    } 
  };

  useEffect(() => {
    // 1. Socket.io Connection
    const socket = io('http://localhost:5000');
    const userId = localStorage.getItem('userId'); 
    if (userId) socket.emit('join', userId);

    socket.on('new_notification', (newNote) => {
      setNotifications((prev) => [newNote, ...prev]);
    });

    // 2. Data Fetching
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [expoRes, boothRes, sessionRes, notifyRes, analyticsRes] = await Promise.all([
          axios.get('http://localhost:5000/admin/get'),
          axios.get('http://localhost:5000/api/booths/all', config),
          axios.get('http://localhost:5000/admin/manage/sessions'),
          axios.get('http://localhost:5000/api/notifications', config),
          axios.get('http://localhost:5000/admin/analytics', config) // Analytics Fetch
        ]);
        
        // Stats Calculation
        const allApps = boothRes.data.filter(b => b.status.toLowerCase() !== 'available').length;
        const approved = boothRes.data.filter(b => 
          ['booked', 'approved'].includes(b.status.toLowerCase())
        ).length;

        const sessionData = Array.isArray(sessionRes.data) ? sessionRes.data : (sessionRes.data.sessions || []);

        setStats({
          totalExpos: expoRes.data.length,
          allApplications: allApps,
          approvedBooths: approved,
          upcomingSessions: sessionData.length
        });

        setNotifications(notifyRes.data);
        setAnalyticsData(analyticsRes.data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isMainDashboard) fetchDashboardData();

    return () => socket.disconnect();
  }, [isMainDashboard]);

  const handleMarkRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/${id}/read`, {}, config);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const formatNum = (n) => (n < 10 ? `0${n}` : n);

  const adminStats = [
    { label: 'Total Expos', value: formatNum(stats.totalExpos), icon: Calendar, path: 'total-expo' },
    { label: 'Exhibitor Applications', value: formatNum(stats.allApplications), icon: Users, path: 'booking-request' },
    { label: 'Approved Booths', value: formatNum(stats.approvedBooths), icon: CheckCircle, path: 'approved-booth' },
    { label: 'Upcoming Sessions', value: formatNum(stats.upcomingSessions), icon: Clock, path: 'manage-sessions' },
  ];

  return (
    <DashboardLayout title={"Admin Dashboard"}>
      <Outlet />

      {isMainDashboard && (
        <div className="page-transition space-y-8">
          {/* Top Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminStats.map((stat, index) => (
              <div 
                key={index} 
                onClick={() => navigate(stat.path)} 
                className="cursor-pointer transform transition-all hover:scale-105 active:scale-95"
              >
                <StatBox {...stat} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* System Analytics - Chart Integrated */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Activity className="text-purple-400" size={20} />
                  <h2 className="text-xl font-semibold">Booth Traffic Analysis</h2>
                </div>
                <TrendingUp size={18} className="text-emerald-400" />
              </div>

              <div className="h-64 w-full">
                {loading ? (
                  <div className="h-full flex items-center justify-center animate-pulse text-gray-500">Loading Chart...</div>
                ) : analyticsData?.boothTrafficData ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.boothTrafficData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" tick={{fill:'#9ca3af', fontSize: 11}} axisLine={false} tickLine={false} />
                      <YAxis tick={{fill:'#9ca3af', fontSize: 11}} axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      />
                      <Bar dataKey="booked" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={30} name="Booked" />
                      <Bar dataKey="available" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} name="Available" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 italic">No Data Available</div>
                )}
              </div>
            </div>

            {/* Recent Activity / Notifications */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Bell size={20} className="text-yellow-400" /> Recent Activity
                </h2>
                <span className="text-[10px] font-bold bg-purple-600/30 text-purple-400 border border-purple-500/50 px-2 py-1 rounded-full uppercase tracking-wider">
                  {notifications.filter(n => !n.isRead).length} New Updates
                </span>
              </div>
              
              <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                {notifications.length > 0 ? (
                  notifications.map((note) => (
                    <div 
                      key={note._id} 
                      onClick={() => !note.isRead && handleMarkRead(note._id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                        note.isRead 
                        ? 'border-white/5 bg-white/5 opacity-60' 
                        : 'border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <p className={`text-sm ${!note.isRead ? 'font-bold text-white' : 'font-medium text-gray-400'}`}>
                          {note.title}
                        </p>
                        {!note.isRead && <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">{note.message}</p>
                      <div className="flex justify-between items-center mt-2">
                         <p className="text-[10px] text-gray-600">{new Date(note.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                         <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                           {note.type}
                         </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 opacity-40">
                    <Activity size={40} />
                    <p className="text-sm mt-2">No recent activity found</p>
                  </div>
                )}
              </div>

              <button 
                onClick={() => navigate('booking-request')}
                className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/20"
              >
                View All Applications
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;