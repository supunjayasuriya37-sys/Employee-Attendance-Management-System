import { useState } from 'react';
import { Users, Calendar, Clock, FileText, LogOut, Home, CheckSquare } from 'lucide-react';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import EmployeeDashboard from './components/employee/Dashboard';
import AttendanceMarking from './components/employee/AttendanceMarking';
import LeaveApplication from './components/employee/LeaveApplication';
import AdminDashboard from './components/admin/Dashboard';
import LeaveApproval from './components/admin/LeaveApproval';
import AttendanceManagement from './components/admin/AttendanceManagement';

type UserRole = 'employee' | 'admin';
type Screen = 'dashboard' | 'attendance' | 'leave' | 'admin-approval' | 'admin-attendance';
type AuthScreen = 'login' | 'signup' | 'authenticated';

export default function App() {
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [userRole, setUserRole] = useState<UserRole>('employee');
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [userName, setUserName] = useState('John Doe');

  const handleLogin = (role: UserRole, name: string) => {
    setUserRole(role);
    setUserName(name);
    setAuthScreen('authenticated');
    setCurrentScreen('dashboard');
  };

  const handleSignup = (role: UserRole, name: string) => {
    setUserRole(role);
    setUserName(name);
    setAuthScreen('authenticated');
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setAuthScreen('login');
    setCurrentScreen('dashboard');
  };

  if (authScreen === 'login') {
    return <Login onLogin={handleLogin} onSwitchToSignup={() => setAuthScreen('signup')} />;
  }

  if (authScreen === 'signup') {
    return <Signup onSignup={handleSignup} onSwitchToLogin={() => setAuthScreen('login')} />;
  }

  const renderScreen = () => {
    if (userRole === 'employee') {
      switch (currentScreen) {
        case 'dashboard':
          return <EmployeeDashboard onNavigate={setCurrentScreen} userName={userName} />;
        case 'attendance':
          return <AttendanceMarking onBack={() => setCurrentScreen('dashboard')} />;
        case 'leave':
          return <LeaveApplication onBack={() => setCurrentScreen('dashboard')} />;
        default:
          return <EmployeeDashboard onNavigate={setCurrentScreen} userName={userName} />;
      }
    } else {
      switch (currentScreen) {
        case 'dashboard':
          return <AdminDashboard onNavigate={setCurrentScreen} />;
        case 'admin-approval':
          return <LeaveApproval onBack={() => setCurrentScreen('dashboard')} />;
        case 'admin-attendance':
          return <AttendanceManagement onBack={() => setCurrentScreen('dashboard')} />;
        default:
          return <AdminDashboard onNavigate={setCurrentScreen} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">AttendEase</h1>
                <p className="text-sm text-slate-600">
                  {userRole === 'employee' ? 'Employee Portal' : 'Admin Portal'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-2">
                <p className="text-slate-900">{userName}</p>
                <p className="text-sm text-slate-600 capitalize">{userRole}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            {userRole === 'employee' ? (
              <>
                <button
                  onClick={() => setCurrentScreen('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentScreen === 'dashboard'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentScreen('attendance')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentScreen === 'attendance'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CheckSquare className="w-4 h-4" />
                  Mark Attendance
                </button>
                <button
                  onClick={() => setCurrentScreen('leave')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentScreen === 'leave'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Apply Leave
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentScreen('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentScreen === 'dashboard'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentScreen('admin-approval')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentScreen === 'admin-approval'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  Leave Requests
                </button>
                <button
                  onClick={() => setCurrentScreen('admin-attendance')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentScreen === 'admin-attendance'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Attendance Logs
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderScreen()}
      </main>
    </div>
  );
}
