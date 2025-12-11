import { useState } from 'react';
import { Clock, Mail, Lock, User, AlertCircle } from 'lucide-react';

type LoginProps = {
  onLogin: (role: 'employee' | 'admin', name: string) => void;
  onSwitchToSignup: () => void;
};

export default function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'employee' | 'admin'>('employee');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would validate credentials
    const name = role === 'admin' ? 'Admin User' : 'John Doe';
    onLogin(role, name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-4 shadow-lg">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">AttendEase</h1>
          <p className="text-slate-600">Employee Attendance & Leave Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="mb-6">
            <h2 className="text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-600">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-slate-900 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-slate-900 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-slate-900 mb-2">Login As</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('employee')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all ${
                    role === 'employee'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Employee
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all ${
                    role === 'admin'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Admin
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-blue-900 mb-2">Demo Credentials</p>
              <p className="text-sm text-blue-700">
                <span className="font-medium">Employee:</span> employee@demo.com / password
              </p>
              <p className="text-sm text-blue-700">
                <span className="font-medium">Admin:</span> admin@demo.com / password
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-slate-900 mb-2">Reset Password</h3>
            <p className="text-slate-600 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div className="relative mb-4">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
