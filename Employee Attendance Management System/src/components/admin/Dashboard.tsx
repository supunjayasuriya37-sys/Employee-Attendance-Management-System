import { Users, Clock, FileText, CheckCircle, XCircle, AlertCircle, Search, Filter } from 'lucide-react';
import { useState } from 'react';

type AdminDashboardProps = {
  onNavigate: (screen: string) => void;
};

export default function Dashboard({ onNavigate }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const employees = [
    { id: 1, name: 'John Doe', department: 'Engineering', status: 'Present', checkIn: '09:00 AM' },
    { id: 2, name: 'Sarah Smith', department: 'Marketing', status: 'Present', checkIn: '08:55 AM' },
    { id: 3, name: 'Mike Johnson', department: 'Sales', status: 'On Leave', checkIn: '-' },
    { id: 4, name: 'Emily Brown', department: 'HR', status: 'Present', checkIn: '09:10 AM' },
    { id: 5, name: 'David Wilson', department: 'Engineering', status: 'Present', checkIn: '09:05 AM' },
    { id: 6, name: 'Lisa Anderson', department: 'Finance', status: 'Absent', checkIn: '-' },
    { id: 7, name: 'Tom Martinez', department: 'Engineering', status: 'Present', checkIn: '08:50 AM' },
    { id: 8, name: 'Anna Taylor', department: 'Marketing', status: 'On Leave', checkIn: '-' },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <h2 className="text-white">Admin Dashboard</h2>
        <p className="text-blue-100 mt-1">Thursday, December 11, 2025</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Total Employees</p>
              <p className="text-slate-900">156</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm">
            <span className="text-green-600">↑ 12%</span>
            <span className="text-slate-600">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Present Today</p>
              <p className="text-slate-900">142</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm">
            <span className="text-slate-600">91% attendance rate</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">On Leave</p>
              <p className="text-slate-900">8</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm">
            <span className="text-slate-600">5 pending requests</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Absent</p>
              <p className="text-slate-900">6</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm">
            <span className="text-slate-600">4% absence rate</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('admin-approval')}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow text-left group"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="bg-purple-100 p-3 rounded-lg inline-block mb-3">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-slate-900 mb-1">Pending Leave Requests</h3>
              <p className="text-slate-600">5 requests awaiting approval</p>
            </div>
            <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">5</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('admin-attendance')}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow text-left group"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-slate-900 mb-1">View Attendance Logs</h3>
              <p className="text-slate-600">Track and manage attendance records</p>
            </div>
            <div className="text-slate-400 group-hover:text-blue-600 transition-colors">→</div>
          </div>
        </button>
      </div>

      {/* Attendance Summary Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-slate-900 mb-4">Weekly Attendance Overview</h3>
        <div className="space-y-3">
          {[
            { day: 'Monday', present: 145, absent: 5, leave: 6 },
            { day: 'Tuesday', present: 148, absent: 4, leave: 4 },
            { day: 'Wednesday', present: 143, absent: 7, leave: 6 },
            { day: 'Thursday', present: 142, absent: 6, leave: 8 },
            { day: 'Friday', present: 140, absent: 8, leave: 8 },
          ].map((data) => (
            <div key={data.day} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-900 w-24">{data.day}</span>
                <span className="text-slate-600">{data.present + data.absent + data.leave} employees</span>
              </div>
              <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
                <div
                  className="bg-green-500"
                  style={{ width: `${(data.present / 156) * 100}%` }}
                  title={`Present: ${data.present}`}
                ></div>
                <div
                  className="bg-orange-500"
                  style={{ width: `${(data.leave / 156) * 100}%` }}
                  title={`Leave: ${data.leave}`}
                ></div>
                <div
                  className="bg-red-500"
                  style={{ width: `${(data.absent / 156) * 100}%` }}
                  title={`Absent: ${data.absent}`}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-slate-600">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-sm text-slate-600">On Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-sm text-slate-600">Absent</span>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-slate-900">Employee List</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-slate-900">Employee</th>
                <th className="text-left py-3 px-4 text-slate-900">Department</th>
                <th className="text-left py-3 px-4 text-slate-900">Status</th>
                <th className="text-left py-3 px-4 text-slate-900">Check-in Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-900">{employee.name}</td>
                  <td className="py-3 px-4 text-slate-600">{employee.department}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        employee.status === 'Present'
                          ? 'bg-green-100 text-green-700'
                          : employee.status === 'On Leave'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{employee.checkIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-slate-600" />
          <h3 className="text-slate-900">Recent Activities</h3>
        </div>
        <div className="space-y-3">
          {[
            { time: '10 mins ago', action: 'John Doe checked in', type: 'checkin' },
            { time: '25 mins ago', action: 'Leave request approved for Sarah Smith', type: 'approval' },
            { time: '1 hour ago', action: 'Mike Johnson applied for leave', type: 'request' },
            { time: '2 hours ago', action: 'Emily Brown checked out', type: 'checkout' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.type === 'checkin' || activity.type === 'approval'
                    ? 'bg-green-500'
                    : activity.type === 'checkout'
                    ? 'bg-blue-500'
                    : 'bg-orange-500'
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-slate-900">{activity.action}</p>
                <p className="text-sm text-slate-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
