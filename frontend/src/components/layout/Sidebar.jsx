import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Layout, Calendar, Users, PieChart , Star, LogOut, Sparkles, Ticket, Layers,MessageSquare,LifeBuoy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setTimeout(() => {
      logout();
      navigate('/');
    }, 1500); 
  };

  const menuConfig = {
    Admin: [
      { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
      { icon: Calendar, label: 'Manage Expos', path: 'manage-expo' },
      { icon: Layout, label: 'Manage Sessions', path: 'manage-sessions' },
      { icon: Layers, label: 'Manage Booths', path: 'manage-booth' },
      { icon: Users, label: 'Registered Exhibitors', path: 'exhibitor-list' },
      { icon: Users, label: 'Registered Attendees', path: 'manage-attendees' },
      { icon: PieChart, label: 'Analytics', path: 'analytics' }, // Match with App.js
      { icon: LifeBuoy, label: 'Feedback & Ratings', path: 'feedbacks' },,
      { icon: LifeBuoy, label: 'Chating and Inquires', path: 'all-chats' },,
    ],
    Exhibitor: [
      { icon: LayoutDashboard, label: 'Overview', path: '/exhibitor/dashboard' },
      { icon: Layers, label: 'Reserve Booth', path: 'Booth-Booking' },
      { icon: Users, label: 'Company Profile', path: 'add-profile' },
      { icon: MessageSquare, label: 'All Chats', path: 'all-chats' },
    ],
    Attendee: [
      { icon: LayoutDashboard, label: 'Overview', path: '/attendee/dashboard' },
      { icon: Ticket, label: 'My Tickets', path: '/tickets' },
      { icon: Layout, label: 'Explore  Expos', path: '/attendee/explore' }, 
      { icon: LifeBuoy, label: 'Feedback & Ratings', path: '/support' },
    ]
  };

  const currentMenu = menuConfig[user?.role] || [];

  return (
    <aside className="w-64 bg-[#1e293b]/50 backdrop-blur-xl border-r border-white/10 flex flex-col fixed h-full z-50">
      <div className="p-8">
        <div className="flex items-center gap-2 text-purple-500 mb-2">
          <Sparkles size={28} />
          <span className="text-2xl font-bold text-white">EventSphere</span>
        </div>
        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">
          {user?.role} Portal
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {currentMenu.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path}
            end={item.path === '/admin/dashboard'}
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' 
                       : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;