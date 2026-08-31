import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import {
  TrendingUp, Users, Calendar, Layers, BarChart3, Activity,
  PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight, Clock
} from 'lucide-react';

const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#10b981', '#ec4899'];
const BOOTH_STATUS_COLORS = {
  Available: '#10b981',
  Pending: '#f59e0b',
  Booked: '#8b5cf6',
  Rejected: '#ef4444',
};

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
  <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all duration-300">
    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: color }}></div>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        {trend && (
          <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{Math.abs(trend)}% from last month</span>
          </div>
        )}
      </div>
      <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}20` }}>
        <Icon size={24} style={{ color }} />
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, icon: Icon, children, span = 1 }) => (
  <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 ${span === 2 ? 'lg:col-span-2' : ''}`}>
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-purple-500/20">
        <Icon size={18} className="text-purple-400" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    {children}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-2xl">
        <p className="text-white font-semibold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-gray-400">{entry.name}:</span>
            <span className="text-white font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/admin/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error('Analytics fetch error:', err);
        setError('Failed to load analytics data. Check backend connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4 animate-spin border-4 border-t-purple-500 border-white/10 rounded-full"></div>
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30">Retry</button>
      </div>
    </div>
  );

  // Default values to prevent crash if backend sends empty response
  const { 
    summary = {}, 
    boothStatusData = [], 
    boothCategoryData = [], 
    boothTrafficData = [], 
    attendeeEngagementData = [], 
    sessionPopularityData = [], 
    registrationTrend = [], 
    userRoleData = [], 
    recentActivities = [] 
  } = data || {};

  return (
    <div className="page-transition space-y-8 p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Total Expos" value={summary.totalExpos || 0} icon={Calendar} color="#8b5cf6" trend={12} />
        <StatCard label="Total Sessions" value={summary.totalSessions || 0} icon={Layers} color="#06b6d4" trend={8} />
        <StatCard label="Total Attendees" value={summary.totalAttendees || 0} icon={Users} color="#10b981" trend={23} />
        <StatCard label="Total Exhibitors" value={summary.totalExhibitors || 0} icon={BarChart3} color="#f59e0b" trend={-5} />
        <StatCard label="Registrations" value={summary.totalBookings || 0} icon={TrendingUp} color="#ec4899" trend={18} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Booth Traffic by Expo" icon={BarChart3}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={boothTrafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{fill:'#9ca3af'}} />
              <YAxis tick={{fill:'#9ca3af'}} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="booked" fill="#8b5cf6" radius={[4,4,0,0]} />
              <Bar dataKey="available" fill="#10b981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Registration Trend" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={registrationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{fill:'#9ca3af'}} />
              <YAxis tick={{fill:'#9ca3af'}} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="registrations" stroke="#8b5cf6" fillOpacity={0.3} fill="#8b5cf6" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChartCard title="Booth Status" icon={PieChartIcon}>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={boothStatusData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={5}>
                {boothStatusData.map((entry, index) => (
                  <Cell key={index} fill={BOOTH_STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        {/* ... More Charts can be added similarly */}
      </div>
    </div>
  );
};

export default Analytics;