'use client';

import { FiZap, FiCreditCard, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function CustomerDashboard() {
  // Mock data - replace with real API calls
  const userData = {
    name: 'John Doe',
    currentBill: 2450,
    dueDate: '2023-12-15',
    usage: 320,
    usageTrend: 'down',
    trendPercentage: 12,
    outageStatus: false,
    recentActivities: [
      { type: 'payment', amount: 1850, date: '2 days ago' },
      { type: 'meter_reading', date: '1 week ago' }
    ]
  };

  // Calculate days until due date
  const daysUntilDue = Math.floor(
    (new Date(userData.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="border-blue-100 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 text-2xl">
            Welcome back, {userData.name}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-600">
            Here's what's happening with your electricity account
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Bill Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Current Bill
              </CardTitle>
              <FiCreditCard className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Rs. {userData.currentBill.toLocaleString()}</p>
            <p className={`text-sm mt-1 ${
              daysUntilDue <= 3 ? 'text-red-600' : 'text-green-600'
            }`}>
              {daysUntilDue > 0 
                ? `Due in ${Math.ceil(daysUntilDue)} days` 
                : 'Payment overdue'}
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full" asChild>
              <Link href="/customer/bills/pay">
                Pay Now
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Usage Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Monthly Usage
              </CardTitle>
              <FiZap className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{userData.usage} kWh</p>
            <p className={`text-sm mt-1 ${
              userData.usageTrend === 'down' ? 'text-green-600' : 'text-red-600'
            }`}>
              {userData.trendPercentage}% {userData.usageTrend === 'down' ? 'less' : 'more'} than last month
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/customer/history">
                View History
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Status Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-gray-500">
                Service Status
              </CardTitle>
              {userData.outageStatus ? (
                <FiAlertCircle className="h-5 w-5 text-red-600" />
              ) : (
                <FiCheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {userData.outageStatus ? 'Outage Reported' : 'All Services Normal'}
            </p>
            <p className="text-sm mt-1 text-gray-500">
              {userData.outageStatus 
                ? 'Estimated restoration: Today 6PM' 
                : 'Last checked: 1 hour ago'}
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/customer/outages">
                {userData.outageStatus ? 'View Details' : 'Report Issue'}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${
                  activity.type === 'payment' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'payment' ? (
                    <FiCreditCard className="h-5 w-5 text-green-600" />
                  ) : (
                    <FiClock className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {activity.type === 'payment' 
                      ? `Payment received - Rs. ${activity.amount?.toLocaleString()}`
                      : 'Meter reading submitted'}
                  </p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="h-24 flex-col gap-2" asChild>
          <Link href="/customer/consumption">
            <FiZap className="h-6 w-6" />
            <span>Usage Analysis</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-24 flex-col gap-2" asChild>
          <Link href="/customer/documents">
            <FiCreditCard className="h-6 w-6" />
            <span>My Documents</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}