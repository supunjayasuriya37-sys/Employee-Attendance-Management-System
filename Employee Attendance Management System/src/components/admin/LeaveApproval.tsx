import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Clock, Calendar, User, FileText } from 'lucide-react';

type LeaveApprovalProps = {
  onBack: () => void;
};

type LeaveRequest = {
  id: number;
  employeeName: string;
  employeeId: string;
  department: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
};

export default function LeaveApproval({ onBack }: LeaveApprovalProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [requests, setRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      employeeName: 'Mike Johnson',
      employeeId: 'EMP-0123',
      department: 'Sales',
      leaveType: 'Casual Leave',
      fromDate: '2025-12-15',
      toDate: '2025-12-16',
      days: 2,
      reason: 'Family function to attend',
      status: 'pending',
      appliedOn: '2025-12-10',
    },
    {
      id: 2,
      employeeName: 'Sarah Smith',
      employeeId: 'EMP-0087',
      department: 'Marketing',
      leaveType: 'Sick Leave',
      fromDate: '2025-12-13',
      toDate: '2025-12-14',
      days: 2,
      reason: 'Medical consultation and rest',
      status: 'pending',
      appliedOn: '2025-12-11',
    },
    {
      id: 3,
      employeeName: 'Anna Taylor',
      employeeId: 'EMP-0156',
      department: 'Marketing',
      leaveType: 'Earned Leave',
      fromDate: '2025-12-20',
      toDate: '2025-12-22',
      days: 3,
      reason: 'Personal trip',
      status: 'pending',
      appliedOn: '2025-12-09',
    },
    {
      id: 4,
      employeeName: 'David Wilson',
      employeeId: 'EMP-0045',
      department: 'Engineering',
      leaveType: 'Casual Leave',
      fromDate: '2025-12-18',
      toDate: '2025-12-19',
      days: 2,
      reason: 'Personal work',
      status: 'pending',
      appliedOn: '2025-12-10',
    },
    {
      id: 5,
      employeeName: 'Emily Brown',
      employeeId: 'EMP-0098',
      department: 'HR',
      leaveType: 'Sick Leave',
      fromDate: '2025-12-12',
      toDate: '2025-12-12',
      days: 1,
      reason: 'Medical appointment',
      status: 'pending',
      appliedOn: '2025-12-11',
    },
    {
      id: 6,
      employeeName: 'John Doe',
      employeeId: 'EMP-0001',
      department: 'Engineering',
      leaveType: 'Casual Leave',
      fromDate: '2025-12-05',
      toDate: '2025-12-06',
      days: 2,
      reason: 'Family emergency',
      status: 'approved',
      appliedOn: '2025-12-03',
    },
    {
      id: 7,
      employeeName: 'Lisa Anderson',
      employeeId: 'EMP-0112',
      department: 'Finance',
      leaveType: 'Earned Leave',
      fromDate: '2025-12-08',
      toDate: '2025-12-10',
      days: 3,
      reason: 'Vacation',
      status: 'rejected',
      appliedOn: '2025-12-05',
    },
  ]);

  const handleApprove = (id: number) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: 'approved' as const } : req)));
  };

  const handleReject = (id: number) => {
    setRequests(requests.map((req) => (req.id === id ? { ...req, status: 'rejected' as const } : req)));
  };

  const filteredRequests =
    filter === 'all' ? requests : requests.filter((req) => req.status === filter);

  const pendingCount = requests.filter((req) => req.status === 'pending').length;
  const approvedCount = requests.filter((req) => req.status === 'approved').length;
  const rejectedCount = requests.filter((req) => req.status === 'rejected').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
        <div className="flex items-center gap-3">
          <div className="bg-purple-100 p-3 rounded-lg">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-slate-900">Leave Approval Panel</h2>
            <p className="text-slate-600">Review and manage leave requests</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
            filter === 'all' ? 'border-blue-500' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">All Requests</p>
              <p className="text-slate-900">{requests.length}</p>
            </div>
            <FileText className="w-6 h-6 text-slate-400" />
          </div>
        </button>

        <button
          onClick={() => setFilter('pending')}
          className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
            filter === 'pending' ? 'border-orange-500' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Pending</p>
              <p className="text-slate-900">{pendingCount}</p>
            </div>
            <Clock className="w-6 h-6 text-orange-500" />
          </div>
        </button>

        <button
          onClick={() => setFilter('approved')}
          className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
            filter === 'approved' ? 'border-green-500' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Approved</p>
              <p className="text-slate-900">{approvedCount}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        </button>

        <button
          onClick={() => setFilter('rejected')}
          className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all ${
            filter === 'rejected' ? 'border-red-500' : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Rejected</p>
              <p className="text-slate-900">{rejectedCount}</p>
            </div>
            <XCircle className="w-6 h-6 text-red-500" />
          </div>
        </button>
      </div>

      {/* Leave Requests */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600">No {filter !== 'all' ? filter : ''} leave requests found</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Employee Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-1">{request.employeeName}</h3>
                      <p className="text-sm text-slate-600">
                        {request.employeeId} • {request.department}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          {request.leaveType}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            request.status === 'pending'
                              ? 'bg-orange-100 text-orange-700'
                              : request.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Leave Details */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>Duration</span>
                      </div>
                      <p className="text-slate-900">
                        {request.fromDate} to {request.toDate}
                      </p>
                      <p className="text-sm text-slate-600 mt-1">{request.days} day(s)</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                        <Clock className="w-4 h-4" />
                        <span>Applied On</span>
                      </div>
                      <p className="text-slate-900">{request.appliedOn}</p>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="mt-4 bg-slate-50 rounded-lg p-3">
                    <p className="text-sm text-slate-600 mb-1">Reason</p>
                    <p className="text-slate-900">{request.reason}</p>
                  </div>
                </div>

                {/* Actions */}
                {request.status === 'pending' && (
                  <div className="flex lg:flex-col gap-2">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
