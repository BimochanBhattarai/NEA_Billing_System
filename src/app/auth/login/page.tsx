import { FiZap, FiUser, FiLock, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Section - Branding with Blue Theme */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-800 to-blue-600 p-8 md:p-12 flex flex-col justify-between text-white">
        <div>
          <div className="flex items-center mb-8">
            <FiZap className="h-10 w-10 text-blue-300" />
            <span className="ml-3 text-2xl font-bold">NEA Bill Payment System</span>
          </div>
          
          <h1 className="text-4xl font-bold mt-16 mb-6">Welcome Back</h1>
          <p className="text-blue-100 text-lg max-w-md">
            Manage your electricity account, pay bills, and track your consumption history in one place.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-700 p-2 rounded-full">
              <svg className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="ml-3 text-blue-100">Secure and encrypted transactions</p>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-700 p-2 rounded-full">
              <svg className="h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="ml-3 text-blue-100">Real-time consumption monitoring</p>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
            <p className="mt-2 text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="snnumber" className="block text-sm font-medium text-gray-700">
                SN. Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="snnumber"
                  name="snnumber"
                  type="text"
                  required
                  className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your SN. Number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="py-3 pl-10 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign In <FiArrowRight className="ml-2" />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}