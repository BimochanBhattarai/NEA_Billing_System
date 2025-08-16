'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiZap, FiHome, FiCreditCard, FiClock, FiUser, FiSettings, FiLogOut, FiHelpCircle } from 'react-icons/fi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState('home');
  const [user] = useState({
    name: 'Bimochan Bhattarai',
    email: 'bimochan.bhattarai@example.com',
    avatar: '/avatars/default.png',
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="w-15 h-15">
              <img src="/logo.png" alt="NEA Logo" className="w-full h-full object-contain" />
            </div>
            <span className="ml-2 text-xl font-bold">NEA Customer Portal</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 focus:outline-none text-blue-600 hover:text-blue-800 cursor-pointer font-bold">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm font-medium">{user.name}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-blue-600">{user.name}</p>
                    <p className="text-xs leading-none text-gray-500">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/customer/profile" className="w-full">
                      <FiUser className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/customer/settings" className="w-full">
                      <FiSettings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/help" className="w-full">
                      <FiHelpCircle className="mr-2 h-4 w-4" />
                      Help
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FiLogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 border-r border-gray-100 bg-white">
          <nav className="p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/customer"
                  className={`flex items-center px-4 py-3 rounded-lg ${activeMenu === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setActiveMenu('home')}
                >
                  <FiHome className="mr-3 h-5 w-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/customer/bills"
                  className={`flex items-center px-4 py-3 rounded-lg ${activeMenu === 'bills' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setActiveMenu('bills')}
                >
                  <FiCreditCard className="mr-3 h-5 w-5" />
                  <span>Bills</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/customer/history"
                  className={`flex items-center px-4 py-3 rounded-lg ${activeMenu === 'history' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setActiveMenu('history')}
                >
                  <FiClock className="mr-3 h-5 w-5" />
                  <span>History</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
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