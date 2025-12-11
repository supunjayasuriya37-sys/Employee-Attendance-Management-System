import { CheckCircle, Clock, Calendar, FileText, AlertCircle, TrendingUp } from 'lucide-react';

type DashboardProps = {
  onNavigate: (screen: string) => void;
  userName: string;
};

export default function Dashboard({ onNavigate, userName }: DashboardProps) {
  const attendanceHistory = [
    { date: '2025-12-11', status: 'Present', checkIn: '09:00 AM', checkOut: '05:30 PM' },
    { date: '2025-12-10', status: 'Present', checkIn: '08:55 AM', checkOut: '05:25 PM' },
    { date: '2025-12-09', status: 'Present', checkIn: '09:10 AM', checkOut: '05:40 PM' },
    { date: '2025-12-08', status: 'Leave', checkIn: '-', checkOut: '-' },
    { date: '2025-12-07', status: 'Present', checkIn: '09:05 AM', checkOut: '05:35 PM' },
  ];

  const notifications = [
    { id: 1, message: 'Your leave request for Dec 15-16 has been approved', type: 'success', time: '2 hours ago' },
    { id: 2, message: 'Please submit your monthly report by Dec 15', type: 'info', time: '1 day ago' },
    { id: 3, message: 'Your attendance for last month: 22/23 days', type: 'info', time: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <h2 className="text-white">Welcome back, {userName}</h2>
        <p className="text-blue-100 mt-1">Thursday, December 11, 2025</p>
      </div>

      {/* Today's Status */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-slate-600" />
          <h3 className="text-slate-900">Today's Attendance</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-green-700">Present</p>
            <p className="text-sm text-slate-600">Check-in: 09:00 AM</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('attendance')}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow text-left group"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-slate-900 mb-1">Mark Attendance</h3>
              <p className="text-sm text-slate-600">Check in or check out</p>
            </div>
            <div className="text-slate-400 group-hover:text-blue-600 transition-colors">→</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('leave')}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow text-left group"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="bg-purple-100 p-3 rounded-lg inline-block mb-3">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-slate-900 mb-1">Apply for Leave</h3>
              <p className="text-sm text-slate-600">Submit leave request</p>
            </div>
            <div className="text-slate-400 group-hover:text-purple-600 transition-colors">→</div>
          </div>
        </button>
      </div>

      {/* Leave Balance */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-slate-600" />
          <h3 className="text-slate-900">Leave Balance</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700 mb-1">Sick Leave</p>
            <p className="text-blue-900">5 days</p>
            <div className="mt-2 bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700 mb-1">Casual Leave</p>
            <p className="text-green-900">8 days</p>
            <div className="mt-2 bg-green-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-700 mb-1">Earned Leave</p>
            <p className="text-purple-900">12 days</p>
            <div className="mt-2 bg-purple-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Attendance History */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-slate-600" />
          <h3 className="text-slate-900">Recent Attendance</h3>
        </div>
        <div className="space-y-3">
          {attendanceHistory.map((record, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    record.status === 'Present' ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                ></div>
                <div>
                  <p className="text-slate-900">{record.date}</p>
                  <p className="text-sm text-slate-600">
                    {record.checkIn} - {record.checkOut}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  record.status === 'Present'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                {record.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-slate-600" />
          <h3 className="text-slate-900">Notifications</h3>
        </div>
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full mt-2 ${
                  notif.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-slate-900">{notif.message}</p>
                <p className="text-sm text-slate-500 mt-1">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}