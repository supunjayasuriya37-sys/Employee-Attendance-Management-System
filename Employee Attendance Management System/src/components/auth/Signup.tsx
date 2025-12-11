import { useState } from 'react';
import { Clock, Mail, Lock, User, Phone, Briefcase, Hash, CheckCircle } from 'lucide-react';

type SignupProps = {
  onSignup: (role: 'employee' | 'admin', name: string) => void;
  onSwitchToLogin: () => void;
};

export default function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    role: 'employee' as 'employee' | 'admin',
    password: '',
    confirmPassword: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'Human Resources',
    'Finance',
    'Operations',
    'Customer Support',
    'Product',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      onSignup(formData.role, formData.fullName);
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-4 shadow-lg">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">Create Your Account</h1>
          <p className="text-slate-600">Join AttendEase to manage your attendance and leaves</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-slate-900 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-900 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-900 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Employee ID and Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-900 mb-2">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleChange('employeeId', e.target.value)}
                    required
                    placeholder="EMP-0001"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-900 mb-2">
                  Department <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
                  <select
                    value={formData.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 appearance-none"
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-slate-900 mb-2">
                Account Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleChange('role', 'employee')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all ${
                    formData.role === 'employee'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Employee
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('role', 'admin')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 transition-all ${
                    formData.role === 'admin'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Admin
                </button>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-900 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-900 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-700 mb-2">Password must contain:</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                  One uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                  One number
                </li>
              </ul>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign In
              </button>
            </p>
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
            <h3 className="text-slate-900 mb-2">Account Created Successfully!</h3>
            <p className="text-slate-600">Redirecting to your dashboard...</p>
          </div>
        </div>
      )}
    </div>
  );
}
