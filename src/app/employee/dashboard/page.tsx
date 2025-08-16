'use client';

import { FiUser, FiClock, FiCheckCircle, FiAlertCircle, FiMap, FiHome, FiZap, FiCalendar } from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

// Mock data - replace with API calls
const meterReadingData = {
  completed: [
    {
      id: 'C1001',
      name: 'Ramesh Shrestha',
      address: 'Baneshwor, Kathmandu',
      lastReading: 1250,
      currentReading: 1450,
      date: '2023-12-05',
      status: 'verified'
    },
    {
      id: 'C1002',
      name: 'Sita Gurung',
      address: 'Koteshwor, Kathmandu',
      lastReading: 2200,
      currentReading: 2450,
      date: '2023-12-05',
      status: 'pending'
    }
  ],
  pending: [
    {
      id: 'C2001',
      name: 'Hari Bahadur',
      address: 'Patan, Lalitpur',
      lastReading: 1800,
      dueDate: '2023-12-10',
      daysOverdue: 0
    },
    {
      id: 'C2002',
      name: 'Gita Kumari',
      address: 'Bhaktapur',
      lastReading: 3200,
      dueDate: '2023-12-12',
      daysOverdue: 0
    },
    {
      id: 'C2003',
      name: 'Bikram Thapa',
      address: 'Gongabu, Kathmandu',
      lastReading: 2750,
      dueDate: '2023-12-08',
      daysOverdue: 2
    }
  ],
  stats: {
    totalAssigned: 125,
    completed: 87,
    completionRate: 70,
    overdue: 15
  }
};

export default function MeterReaderDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Meter Reading Dashboard
          </h1>
          <p className="text-gray-600">Track and manage meter reading tasks</p>
        </div>
        <Button asChild variant={'primary'}>
          <Link href="/employee/meter-reading" className="flex items-center gap-2">
            <FiMap className="h-4 w-4" />
            Reading Route
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{meterReadingData.stats.totalAssigned}</p>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{meterReadingData.stats.completed}</p>
          </CardContent>
        </Card>
        <Card className="border-blue-100 bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{meterReadingData.stats.completionRate}%</p>
              <Progress value={meterReadingData.stats.completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{meterReadingData.stats.overdue}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recently Completed Readings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiCheckCircle className="text-green-600" />
            <span>Recently Completed</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Last Reading</TableHead>
                <TableHead className="text-right">Current Reading</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meterReadingData.completed.map((reading) => (
                <TableRow key={reading.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-500" />
                      {reading.name}
                    </div>
                  </TableCell>
                  <TableCell>{reading.address}</TableCell>
                  <TableCell className="text-right">{reading.lastReading} kWh</TableCell>
                  <TableCell className="text-right font-bold text-blue-600">
                    {reading.currentReading} kWh
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-500" />
                      {reading.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={reading.status === 'verified' ? 'default' : 'secondary'}>
                      {reading.status === 'verified' ? 'Verified' : 'Pending Verification'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/customer/${reading.id}/reading`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="ghost">View All Completed Readings</Button>
        </CardFooter>
      </Card>

      {/* Pending Readings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiAlertCircle className="text-orange-600" />
            <span>Pending Readings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Last Reading</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meterReadingData.pending.map((customer) => (
                <TableRow key={customer.id} className={customer.daysOverdue > 0 ? 'bg-red-50' : ''}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-500" />
                      {customer.name}
                    </div>
                  </TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell className="text-right">{customer.lastReading} kWh</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-500" />
                      {customer.dueDate}
                      {customer.daysOverdue > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {customer.daysOverdue} day{customer.daysOverdue !== 1 ? 's' : ''} overdue
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Pending</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" asChild variant="primary">
                      <Link href={`/employee/meter-reading/${customer.id}`}>
                        Record Reading
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="ghost">View All Pending Readings</Button>
        </CardFooter>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-100 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <FiHome />
              <span>Area Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Assigned Area:</span>
              <span className="font-medium">Kathmandu - Ward 10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Customers:</span>
              <span className="font-medium">125</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Readings/Day:</span>
              <span className="font-medium">18</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/employee/area-report">View Area Report</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-green-100 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <FiClock />
              <span>Today's Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Readings Completed:</span>
              <span className="font-medium">8/15</span>
            </div>
            <Progress value={(8/15)*100} className="h-2" />
            <div className="text-sm text-gray-600">
              Next customer: <span className="font-medium">Bikram Thapa</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/employee/meter-reader/schedule">View Full Schedule</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-orange-100 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <FiAlertCircle />
              <span>Priority Readings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Overdue:</span>
              <span className="font-medium text-red-600">3 customers</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">High Consumption:</span>
              <span className="font-medium">5 customers</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dispute Cases:</span>
              <span className="font-medium">2 customers</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/employee/priority-readings">View Priority List</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}