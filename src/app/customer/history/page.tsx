'use client';

import { FiActivity, FiCalendar, FiDownload, FiFilter, FiZap } from 'react-icons/fi';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

// Mock data - replace with API calls
const consumptionData = [
  { month: 'Jan 2023', units: 280, amount: 2100, status: 'Paid' },
  { month: 'Feb 2023', units: 310, amount: 2325, status: 'Paid' },
  { month: 'Mar 2023', units: 290, amount: 2175, status: 'Paid' },
  { month: 'Apr 2023', units: 270, amount: 2025, status: 'Paid' },
  { month: 'May 2023', units: 320, amount: 2400, status: 'Paid' },
  { month: 'Jun 2023', units: 350, amount: 2625, status: 'Paid' },
  { month: 'Jul 2023', units: 380, amount: 2850, status: 'Paid' },
  { month: 'Aug 2023', units: 400, amount: 3000, status: 'Paid' },
  { month: 'Sep 2023', units: 370, amount: 2775, status: 'Paid' },
  { month: 'Oct 2023', units: 330, amount: 2475, status: 'Paid' },
  { month: 'Nov 2023', units: 300, amount: 2250, status: 'Paid' },
  { month: 'Dec 2023', units: 350, amount: 2625, status: 'Generated' },
];

export default function ConsumptionHistoryPage() {
  const [timeRange, setTimeRange] = useState('12');
  const [chartView, setChartView] = useState('units');

  const filteredData = consumptionData.slice(0, parseInt(timeRange));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FiActivity className="text-blue-600" />
            Consumption History
          </h1>
          <p className="text-gray-600">Track your electricity usage over time</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 months</SelectItem>
              <SelectItem value="6">Last 6 months</SelectItem>
              <SelectItem value="12">Last 12 months</SelectItem>
              <SelectItem value="24">Last 2 years</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FiDownload className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Consumption Chart */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Usage Trend</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={chartView === 'units' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setChartView('units')}
              >
                Units (kWh)
              </Button>
              <Button
                variant={chartView === 'amount' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setChartView('amount')}
              >
                Amount (Rs.)
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickMargin={10}
                tickFormatter={(value) => chartView === 'units' ? `${value}` : `Rs. ${value}`}
              />
              <Tooltip 
                formatter={(value) => [chartView === 'units' ? `${value} kWh` : `Rs. ${value}`, chartView === 'units' ? 'Units' : 'Amount']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line
                type="monotone"
                dataKey={chartView === 'units' ? 'units' : 'amount'}
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Billing Month</TableHead>
                <TableHead className="text-right">Consumption</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => (
                <TableRow key={record.month}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-500" />
                      {record.month}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {record.units} kWh
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    Rs. {record.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        record.status === 'Paid'
                          ? 'default'
                          : record.status === 'Generated'
                          ? 'secondary'
                          : 'destructive'
                      }
                      // className='bg-green-700 text-white'
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="view_details" size="sm" asChild>
                      <Link href={`/customer/bills?month=${record.month.split(' ')[0]}&year=20${record.month.split(' ')[1]}`}>
                        View Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Insights Card */}
      <Card className="border-blue-100 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <FiZap className="h-5 w-5" />
            Usage Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-500">Highest Consumption</p>
              <p className="text-xl font-bold">400 kWh</p>
              <p className="text-sm text-gray-500">Aug 2023</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-500">Lowest Consumption</p>
              <p className="text-xl font-bold">270 kWh</p>
              <p className="text-sm text-gray-500">Apr 2023</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-500">Average Monthly</p>
              <p className="text-xl font-bold">333 kWh</p>
              <p className="text-sm text-gray-500">Last 12 months</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}