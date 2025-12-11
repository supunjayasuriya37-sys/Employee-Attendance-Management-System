import { useState } from 'react';
import { ArrowLeft, Calendar, FileText, CheckCircle, Clock } from 'lucide-react';

type LeaveApplicationProps = {
  onBack: () => void;
};

type LeaveDuration = 'short' | 'half-day' | 'full-day';

export default function LeaveApplication({ onBack }: LeaveApplicationProps) {
  const [leaveDuration, setLeaveDuration] = useState<LeaveDuration>('full-day');
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [singleDate, setSingleDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');
  const [halfDayPeriod, setHalfDayPeriod] = useState('morning');
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const leaveBalance = {
    sick: 5,
    casual: 8,
    earned: 12,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onBack();
    }, 2000);
  };

  const getRemainingLeave = () => {
    switch (leaveType) {
      case 'sick':
        return leaveBalance.sick;
      case 'casual':
        return leaveBalance.casual;
      case 'earned':
        return leaveBalance.earned;
      default:
        return 0;
    }
  };

  // Auto-calculate end time for short leave
  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
    const [hours, minutes] = time.split(':').map(Number);
    const endHours = (hours + 2) % 24;
    setEndTime(`${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
  };

  const calculateDays = () => {
    if (leaveDuration === 'short') {
      return '2 hours';
    } else if (leaveDuration === 'half-day') {
      return '0.5 day';
    } else if (fromDate && toDate) {
      const days = Math.ceil((new Date(toDate).getTime() - new Date(fromDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    return '';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
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
            <h2 className="text-slate-900">Apply for Leave</h2>
            <p className="text-slate-600">Submit your leave request</p>
          </div>
        </div>
      </div>

      {/* Leave Balance Summary */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl p-6 text-white">
        <h3 className="text-white mb-4">Your Leave Balance</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <p className="text-purple-100 text-sm mb-1">Sick Leave</p>
            <p className="text-white">{leaveBalance.sick} days</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <p className="text-purple-100 text-sm mb-1">Casual Leave</p>
            <p className="text-white">{leaveBalance.casual} days</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur">
            <p className="text-purple-100 text-sm mb-1">Earned Leave</p>
            <p className="text-white">{leaveBalance.earned} days</p>
          </div>
        </div>
      </div>

      {/* Leave Application Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Leave Duration Selector */}
          <div>
            <label className="block text-slate-900 mb-3">
              Leave Duration <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setLeaveDuration('short')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  leaveDuration === 'short'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Clock className={`w-5 h-5 ${leaveDuration === 'short' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <p className={leaveDuration === 'short' ? 'text-blue-900' : 'text-slate-900'}>
                    Short Leave
                  </p>
                </div>
                <p className={`text-sm ${leaveDuration === 'short' ? 'text-blue-700' : 'text-slate-600'}`}>
                  2 hours
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLeaveDuration('half-day')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  leaveDuration === 'half-day'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Clock className={`w-5 h-5 ${leaveDuration === 'half-day' ? 'text-purple-600' : 'text-slate-400'}`} />
                  <p className={leaveDuration === 'half-day' ? 'text-purple-900' : 'text-slate-900'}>
                    Half-Day Leave
                  </p>
                </div>
                <p className={`text-sm ${leaveDuration === 'half-day' ? 'text-purple-700' : 'text-slate-600'}`}>
                  4 hours
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLeaveDuration('full-day')}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  leaveDuration === 'full-day'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className={`w-5 h-5 ${leaveDuration === 'full-day' ? 'text-green-600' : 'text-slate-400'}`} />
                  <p className={leaveDuration === 'full-day' ? 'text-green-900' : 'text-slate-900'}>
                    Full Day Leave
                  </p>
                </div>
                <p className={`text-sm ${leaveDuration === 'full-day' ? 'text-green-700' : 'text-slate-600'}`}>
                  Multiple days
                </p>
              </button>
            </div>
          </div>

          {/* Leave Type */}
          <div>
            <label className="block text-slate-900 mb-2">
              Leave Type <span className="text-red-500">*</span>
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-slate-900"
            >
              <option value="">Select leave type</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="earned">Earned Leave</option>
            </select>
            {leaveType && (
              <p className="text-sm text-slate-600 mt-2">
                Remaining balance: <span className="text-purple-600">{getRemainingLeave()} days</span>
              </p>
            )}
          </div>

          {/* Dynamic Date/Time Fields based on Leave Duration */}
          {leaveDuration === 'short' && (
            <>
              <div>
                <label className="block text-slate-900 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={singleDate}
                    onChange={(e) => setSingleDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-slate-900"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-900 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => handleStartTimeChange(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-slate-900"
                    />
                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-900 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-slate-900"
                    />
                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  Duration: <span className="text-blue-900">2 hours</span>
                </p>
              </div>
            </>
          )}

          {leaveDuration === 'half-day' && (
            <>
              <div>
                <label className="block text-slate-900 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={singleDate}
                    onChange={(e) => setSingleDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-slate-900"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-slate-900 mb-2">
                  Period <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setHalfDayPeriod('morning')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      halfDayPeriod === 'morning'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <p className={halfDayPeriod === 'morning' ? 'text-purple-900' : 'text-slate-900'}>
                      Morning
                    </p>
                    <p className={`text-sm ${halfDayPeriod === 'morning' ? 'text-purple-700' : 'text-slate-600'}`}>
                      4 hours
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHalfDayPeriod('afternoon')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      halfDayPeriod === 'afternoon'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <p className={halfDayPeriod === 'afternoon' ? 'text-purple-900' : 'text-slate-900'}>
                      Afternoon
                    </p>
                    <p className={`text-sm ${halfDayPeriod === 'afternoon' ? 'text-purple-700' : 'text-slate-600'}`}>
                      4 hours
                    </p>
                  </button>
                </div>
              </div>
            </>
          )}

          {leaveDuration === 'full-day' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-900 mb-2">
                    From Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-slate-900"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-900 mb-2">
                    To Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      required
                      min={fromDate}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-slate-900"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Days Calculation */}
          {calculateDays() && (
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-700">
                Total duration requested:{' '}
                <span className="text-purple-900">{calculateDays()}</span>
              </p>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="block text-slate-900 mb-2">
              Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={4}
              placeholder="Please provide a brief reason for your leave request..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white text-slate-900"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      {/* Recent Leave Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-slate-900 mb-4">Recent Requests</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="text-slate-900">Dec 15 - Dec 16, 2025</p>
              <p className="text-sm text-slate-600">Casual Leave • Full Day</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Approved</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <p className="text-slate-900">Dec 20, 2025 • Morning</p>
              <p className="text-sm text-slate-600">Sick Leave • Half Day</p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="text-slate-900">Dec 18, 2025 • 2:00 PM - 4:00 PM</p>
              <p className="text-sm text-slate-600">Casual Leave • Short Leave</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Approved</span>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm mx-4 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-slate-900 mb-2">Leave Request Submitted!</h3>
            <p className="text-slate-600">Your request has been sent for approval.</p>
          </div>
        </div>
      )}
    </div>
  );
}