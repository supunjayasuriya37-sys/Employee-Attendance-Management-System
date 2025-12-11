import { useState } from 'react';
import { ArrowLeft, Calendar, Search, Filter, Download, Edit2, CheckCircle, XCircle, Clock } from 'lucide-react';

type AttendanceManagementProps = {
  onBack: () => void;
};

type AttendanceRecord = {
  id: number;
  employeeName: string;
  employeeId: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Absent' | 'Half Day' | 'On Leave';
  workHours: string;
};

export default function AttendanceManagement({ onBack }: AttendanceManagementProps) {
  const [view, setView] = useState<'table' | 'calendar'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2025-12-11');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const attendanceData: AttendanceRecord[] = [
    {
      id: 1,
      employeeName: 'John Doe',
      employeeId: 'EMP-0001',
      department: 'Engineering',
      date: '2025-12-11',
      checkIn: '09:00 AM',
      checkOut: '05:30 PM',
      status: 'Present',
      workHours: '8h 30m',
    },
    {
      id: 2,
      employeeName: 'Sarah Smith',
      employeeId: 'EMP-0087',
      department: 'Marketing',
      date: '2025-12-11',
      checkIn: '08:55 AM',
      checkOut: '05:25 PM',
      status: 'Present',
      workHours: '8h 30m',
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      employeeId: 'EMP-0123',
      department: 'Sales',
      date: '2025-12-11',
      checkIn: '-',
      checkOut: '-',
      status: 'On Leave',
      workHours: '-',
    },
    {
      id: 4,
      employeeName: 'Emily Brown',
      employeeId: 'EMP-0098',
      department: 'HR',
      date: '2025-12-11',
      checkIn: '09:10 AM',
      checkOut: '05:40 PM',
      status: 'Present',
      workHours: '8h 30m',
    },
    {
      id: 5,
      employeeName: 'David Wilson',
      employeeId: 'EMP-0045',
      department: 'Engineering',
      date: '2025-12-11',
      checkIn: '09:05 AM',
      checkOut: '05:35 PM',
      status: 'Present',
      workHours: '8h 30m',
    },
    {
      id: 6,
      employeeName: 'Lisa Anderson',
      employeeId: 'EMP-0112',
      department: 'Finance',
      date: '2025-12-11',
      checkIn: '-',
      checkOut: '-',
      status: 'Absent',
      workHours: '-',
    },
    {
      id: 7,
      employeeName: 'Tom Martinez',
      employeeId: 'EMP-0076',
      department: 'Engineering',
      date: '2025-12-11',
      checkIn: '08:50 AM',
      checkOut: '05:20 PM',
      status: 'Present',
      workHours: '8h 30m',
    },
    {
      id: 8,
      employeeName: 'Anna Taylor',
      employeeId: 'EMP-0156',
      department: 'Marketing',
      date: '2025-12-11',
      checkIn: '-',
      checkOut: '-',
      status: 'On Leave',
      workHours: '-',
    },
  ];

  const filteredData = attendanceData.filter((record) => {
    const matchesSearch =
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || record.department === selectedDepartment;
    const matchesDate = record.date === selectedDate;
    return matchesSearch && matchesDepartment && matchesDate;
  });

  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];

  // Calendar view data
  const generateCalendarDays = () => {
    const daysInMonth = 31;
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `2025-12-${i.toString().padStart(2, '0')}`;
      const dayRecords = attendanceData.filter((r) => r.date === date);
      const presentCount = dayRecords.filter((r) => r.status === 'Present').length;
      days.push({
        date: i,
        fullDate: date,
        present: presentCount,
        total: dayRecords.length,
      });
    }
    return days;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-slate-900">Attendance Management</h2>
              <p className="text-slate-600">Track and manage employee attendance records</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* View Toggle & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setView('table')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'table' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'calendar' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Calendar View
            </button>
          </div>

          {/* Date Filter */}
          <div className="flex-1">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
              />
            </div>
          </div>

          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept.toLowerCase()}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Total Present</p>
              <p className="text-slate-900">
                {filteredData.filter((r) => r.status === 'Present').length}
              </p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">On Leave</p>
              <p className="text-slate-900">
                {filteredData.filter((r) => r.status === 'On Leave').length}
              </p>
            </div>
            <Clock className="w-6 h-6 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Absent</p>
              <p className="text-slate-900">
                {filteredData.filter((r) => r.status === 'Absent').length}
              </p>
            </div>
            <XCircle className="w-6 h-6 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Attendance Rate</p>
              <p className="text-slate-900">
                {filteredData.length > 0
                  ? Math.round((filteredData.filter((r) => r.status === 'Present').length / filteredData.length) * 100)
                  : 0}
                %
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {view === 'table' ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or employee ID..."
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
                  <th className="text-left py-3 px-4 text-slate-900">Employee ID</th>
                  <th className="text-left py-3 px-4 text-slate-900">Department</th>
                  <th className="text-left py-3 px-4 text-slate-900">Check In</th>
                  <th className="text-left py-3 px-4 text-slate-900">Check Out</th>
                  <th className="text-left py-3 px-4 text-slate-900">Work Hours</th>
                  <th className="text-left py-3 px-4 text-slate-900">Status</th>
                  <th className="text-left py-3 px-4 text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((record) => (
                  <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">{record.employeeName}</td>
                    <td className="py-3 px-4 text-slate-600">{record.employeeId}</td>
                    <td className="py-3 px-4 text-slate-600">{record.department}</td>
                    <td className="py-3 px-4 text-slate-600">{record.checkIn}</td>
                    <td className="py-3 px-4 text-slate-600">{record.checkOut}</td>
                    <td className="py-3 px-4 text-slate-600">{record.workHours}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          record.status === 'Present'
                            ? 'bg-green-100 text-green-700'
                            : record.status === 'On Leave'
                            ? 'bg-orange-100 text-orange-700'
                            : record.status === 'Half Day'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">No attendance records found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-slate-900 mb-4">December 2025 - Attendance Calendar</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center py-2 text-slate-600">
                {day}
              </div>
            ))}
            {/* Empty cells for alignment (December 2025 starts on Sunday) */}
            {generateCalendarDays().map((day) => {
              const rate = day.total > 0 ? (day.present / day.total) * 100 : 0;
              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.fullDate)}
                  className={`p-3 rounded-lg border transition-all ${
                    day.fullDate === selectedDate
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-slate-900 mb-1">{day.date}</div>
                  <div
                    className={`text-xs ${
                      rate >= 90
                        ? 'text-green-600'
                        : rate >= 75
                        ? 'text-yellow-600'
                        : rate > 0
                        ? 'text-red-600'
                        : 'text-slate-400'
                    }`}
                  >
                    {day.total > 0 ? `${Math.round(rate)}%` : '-'}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-slate-600">≥ 90%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-sm text-slate-600">75-89%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-slate-600">&lt; 75%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
