'use client';

import { FiUser, FiSearch, FiFilter, FiZap, FiPlusCircle, FiPhone, FiMapPin, FiDownload, FiCalendar } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState } from 'react';

// Mock data - replace with API calls
const customers = [
  {
    id: 'C2001',
    name: 'Hari Bahadur',
    address: 'Patan, Lalitpur',
    lastReading: 1800,
    dueDate: '2023-12-10',
    status: 'pending',
    zone: 'Central'
  },
  {
    id: 'C2002',
    name: 'Gita Kumari',
    address: 'Bhaktapur',
    lastReading: 3200,
    dueDate: '2023-12-12',
    status: 'pending',
    zone: 'East'
  },
  {
    id: 'C2003',
    name: 'Bikram Thapa',
    address: 'Gongabu, Kathmandu',
    lastReading: 2750,
    dueDate: '2023-12-08',
    status: 'overdue',
    zone: 'West'
  },
  {
    id: 'C2004',
    name: 'Sunita Rai',
    address: 'Kirtipur',
    lastReading: 1950,
    dueDate: '2023-12-15',
    status: 'pending',
    zone: 'South'
  },
  {
    id: 'C2005',
    name: 'Rajesh Shrestha',
    address: 'Boudha',
    lastReading: 4200,
    dueDate: '2023-12-05',
    status: 'overdue',
    zone: 'North'
  }
];

export default function MeterReaderCustomerList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    // Search filter
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'pending' && customer.status === 'pending') ||
      (statusFilter === 'overdue' && customer.status === 'overdue');
    
    // Zone filter
    const matchesZone = zoneFilter === 'all' || customer.zone === zoneFilter;
    
    return matchesSearch && matchesStatus && matchesZone;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FiUser className="text-blue-600" />
            Customer List
          </h1>
          <p className="text-gray-600">Meter reading assignments for your area</p>
        </div>
        <Button asChild variant={"primary"}>
          <Link href="/employee/meter-reading" className="flex items-center gap-2">
            <FiMapPin className="h-4 w-4" />
            View Route Map
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-blue-100 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search customers..."
                  className="pl-10 border-blue-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Zone Filter */}
            <div>
              <Select value={zoneFilter} onValueChange={setZoneFilter}>
                <SelectTrigger className="border-blue-200">
                  <SelectValue placeholder="Filter by zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Zones</SelectItem>
                  <SelectItem value="Central">Central</SelectItem>
                  <SelectItem value="East">East</SelectItem>
                  <SelectItem value="West">West</SelectItem>
                  <SelectItem value="North">North</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>
              {filteredCustomers.length} Customer{filteredCustomers.length !== 1 ? 's' : ''} Found
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <FiDownload className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Last Reading</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className={
                  customer.status === 'overdue' ? 'bg-red-50' : ''
                }>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="h-4 w-4 text-gray-500" />
                      {customer.address}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {customer.lastReading} kWh
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="h-4 w-4 text-gray-500" />
                      {customer.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.zone}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      customer.status === 'overdue' ? 'destructive' : 'secondary'
                    }>
                      {customer.status === 'overdue' ? 'Overdue' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" asChild variant={"primary"}>
                      <Link href={`/employee/meter-reading/${customer.id}`}>
                        <FiPlusCircle className="mr-2 h-4 w-4" />
                        Record Reading
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        {filteredCustomers.length === 0 && (
          <CardFooter className="justify-center">
            <div className="py-8 text-center text-gray-500">
              No customers found matching your filters
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-100 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Pending Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {customers.filter(c => c.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-100 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Overdue Readings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {customers.filter(c => c.status === 'overdue').length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Total Assigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}