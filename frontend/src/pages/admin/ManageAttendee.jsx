import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, Mail, Ticket, QrCode, Calendar, 
  Clock, CheckCircle, Loader2, Search 
} from 'lucide-react';

const ManageAttendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/admin/all-attendees');
        setAttendees(res.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="page-transition p-4 md:p-0">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Full Registration Logs</h2>
          <p className="text-gray-400 text-sm">Reviewing every database entry for this exhibition.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-purple-400">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="text-gray-400 animate-pulse">Fetching records...</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px]">
              <thead>
                <tr className="bg-white/5 text-gray-300 text-xs uppercase tracking-widest border-b border-white/10">
                  <th className="px-8 py-5 font-bold">Attendee & ID</th>
                  <th className="px-8 py-5 font-bold">Booking Ref / QR</th>
                  <th className="px-8 py-5 font-bold">Ticket & Status</th>
                  <th className="px-8 py-5 font-bold text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {attendees.length > 0 ? (
                  attendees.map((row) => (
                    <tr key={row._id} className="hover:bg-white/[0.02] transition-all group">
                      {/* Attendee Info */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                            {row.attendeeId?.name?.charAt(0) || "U"}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-white font-semibold text-base group-hover:text-purple-400 transition-colors truncate">
                              {row.attendeeId?.name || "Guest"}
                            </span>
                            <span className="text-gray-500 text-xs truncate">{row.attendeeId?.email}</span>
                            <span className="text-[10px] text-gray-600 font-mono mt-1">UID: {row.attendeeId?._id || "N/A"}</span>
                          </div>
                        </div>
                      </td>

                      {/* QR & Booking ID */}
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-yellow-500/90 text-sm font-mono bg-yellow-500/5 w-fit px-2 py-1 rounded border border-yellow-500/10">
                            <QrCode size={14} /> {row.qrCode}
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono pl-1 tracking-tighter">BID: {row._id}</span>
                        </div>
                      </td>

                      {/* Ticket Status */}
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-2">
                          <span className="w-fit bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase border border-blue-500/20">
                            {row.ticketType}
                          </span>
                          <span className="flex items-center gap-1.5 text-green-500 text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Confirmed
                          </span>
                        </div>
                      </td>

                      {/* Booking Date */}
                      <td className="px-8 py-6 text-right">
                        <div className="flex flex-col items-end gap-1 text-gray-300">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Calendar size={14} className="text-purple-500" />
                            {formatDate(row.bookedAt)}
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Clock size={14} className="text-pink-500" />
                            {formatTime(row.bookedAt)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-20">
                      <div className="flex flex-col items-center gap-3 text-gray-500">
                        <User size={48} strokeWidth={1} />
                        <p>No registration records found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAttendees;