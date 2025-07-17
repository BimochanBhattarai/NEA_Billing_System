'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiZap, FiHome, FiCreditCard, FiClock, FiUser, FiSettings, FiLogOut, FiHelpCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

export default function EmpployeeLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">

        <Link href={"/employee"} className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <FiZap className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold">NEA Employee Portal</span>
          </div>
        </Link>
        <div className=''>
          <Button variant="primary" className="flex items-center space-x-2">
            <FiLogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex-1 bg-gray-50 mx-10 p-4 sm:p-6 lg:p-8">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Nepal Electricity Authority. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-600">
                Privacy Policy
              </Link>
              <span className="mx-2 text-gray-300">•</span>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-blue-600">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}