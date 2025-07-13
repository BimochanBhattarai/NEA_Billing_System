'use client';

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiZap, FiArrowLeft } from "react-icons/fi";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isRegisterPage = pathname.includes("/register");
  const authLink = isRegisterPage ? "/auth/login" : "/auth/register";
  const authText = isRegisterPage ? "Login" : "Register";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center text-gray-800 hover:text-blue-600"
              >
                {/* <FiArrowLeft className="mr-2 h-5 w-5" /> */}
                <FiZap className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold">
                  NEA Customer Portal
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              
              <Link
                href="/help"
                className="hidden md:block text-gray-600 hover:text-blue-600 text-sm font-medium"
              >
                Need help?
              </Link>
              <Link
                href={authLink}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
              >
                {authText}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Nepal Electricity
              Authority. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Privacy Policy
              </Link>
              <span className="mx-2 text-gray-300">•</span>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}