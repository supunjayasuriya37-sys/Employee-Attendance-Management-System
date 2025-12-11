import { useState } from 'react';
import { Clock, CheckCircle, XCircle, ArrowLeft, MapPin } from 'lucide-react';

type AttendanceMarkingProps = {
  onBack: () => void;
};

export default function AttendanceMarking({ onBack }: AttendanceMarkingProps) {
  const [checkInTime, setCheckInTime] = useState<string | null>('09:00 AM');
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState<'checkin' | 'checkout'>('checkin');

  const handleCheckIn = () => {
    setConfirmationType('checkin');
    setShowConfirmation(true);
    setTimeout(() => {
      const now = new Date();
      setCheckInTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setShowConfirmation(false);
    }, 1500);
  };

  const handleCheckOut = () => {
    setConfirmationType('checkout');
    setShowConfirmation(true);
    setTimeout(() => {
      const now = new Date();
      setCheckOutTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setShowConfirmation(false);
    }, 1500);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  // Update time every second
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
        <h2 className="text-slate-900 mb-2">Mark Attendance</h2>
        <p className="text-slate-600">Thursday, December 11, 2025</p>
      </div>

      {/* Current Time Display */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Clock className="w-6 h-6" />
          <p className="text-blue-100">Current Time</p>
        </div>
        <div className="text-white" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          {currentTime}
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Check-In Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-lg ${checkInTime ? 'bg-green-100' : 'bg-slate-100'}`}>
              {checkInTime ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <Clock className="w-6 h-6 text-slate-400" />
              )}
            </div>
            <div>
              <h3 className="text-slate-900">Check In</h3>
              <p className="text-sm text-slate-600">Start your work day</p>
            </div>
          </div>

          {checkInTime ? (
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-700 mb-1">Checked in at</p>
              <p className="text-green-900">{checkInTime}</p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <p className="text-slate-600">Not checked in yet</p>
            </div>
          )}

          <button
            onClick={handleCheckIn}
            disabled={!!checkInTime}
            className="w-full py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white"
          >
            {checkInTime ? 'Already Checked In' : 'Check In Now'}
          </button>
        </div>

        {/* Check-Out Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-lg ${checkOutTime ? 'bg-blue-100' : 'bg-slate-100'}`}>
              {checkOutTime ? (
                <CheckCircle className="w-6 h-6 text-blue-600" />
              ) : (
                <Clock className="w-6 h-6 text-slate-400" />
              )}
            </div>
            <div>
              <h3 className="text-slate-900">Check Out</h3>
              <p className="text-sm text-slate-600">End your work day</p>
            </div>
          </div>

          {checkOutTime ? (
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-700 mb-1">Checked out at</p>
              <p className="text-blue-900">{checkOutTime}</p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <p className="text-slate-600">Not checked out yet</p>
            </div>
          )}

          <button
            onClick={handleCheckOut}
            disabled={!checkInTime || !!checkOutTime}
            className="w-full py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white"
          >
            {checkOutTime ? 'Already Checked Out' : 'Check Out Now'}
          </button>
        </div>
      </div>

      {/* Working Hours Tracker */}
      {checkInTime && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-slate-900 mb-4">Today's Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Check In</p>
              <p className="text-slate-900">{checkInTime}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-600 mb-1">Check Out</p>
              <p className="text-slate-900">{checkOutTime || 'Pending'}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-700 mb-1">Total Hours</p>
              <p className="text-blue-900">{checkOutTime ? '8h 30m' : 'In Progress...'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Location Info */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-slate-600" />
          <div>
            <h3 className="text-slate-900">Location</h3>
            <p className="text-sm text-slate-600">Office - Main Building, Floor 3</p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm mx-4 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-slate-900 mb-2">
              {confirmationType === 'checkin' ? 'Checked In Successfully!' : 'Checked Out Successfully!'}
            </h3>
            <p className="text-slate-600">Your attendance has been recorded.</p>
          </div>
        </div>
      )}
    </div>
  );
}
