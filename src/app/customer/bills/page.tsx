'use client';

import { FiCreditCard, FiDollarSign, FiCalendar, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data - replace with real API calls
const bills = [
  {
    id: 'INV-2023-11-001',
    date: '2023-11-01',
    dueDate: '2023-11-15',
    amount: 1850,
    status: 'paid',
    consumption: 280,
    units: 'kWh'
  },
  {
    id: 'INV-2023-10-001',
    date: '2023-10-01',
    dueDate: '2023-10-15',
    amount: 2200,
    status: 'paid',
    consumption: 320,
    units: 'kWh'
  },
  {
    id: 'INV-2023-12-001',
    date: '2023-12-01',
    dueDate: '2023-12-15',
    amount: 2450,
    status: 'unpaid',
    consumption: 350,
    units: 'kWh'
  }
];

export default function CustomerBillsPage() {
  // Calculate days until due date for unpaid bills
  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Calculate total outstanding balance
  const outstandingBalance = bills
    .filter(bill => bill.status === 'unpaid')
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="space-y-6">
      {/* Outstanding Balance Card */}
      <Card className="border-blue-100 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">
            Outstanding Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">Rs. {outstandingBalance.toLocaleString()}</p>
              <p className="text-blue-600">
                {bills.filter(b => b.status === 'unpaid').length} unpaid bill(s)
              </p>
            </div>
            {outstandingBalance > 0 && (
              <Button size="lg" asChild>
                <Link href="/customer/bills/pay-all">
                  Pay All Outstanding
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bills Table */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Your electricity bill payment history</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Bill ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Consumption</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => {
                const daysUntilDue = getDaysUntilDue(bill.dueDate);
                const isOverdue = daysUntilDue < 0 && bill.status === 'unpaid';
                
                return (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 h-4 w-4 text-gray-500" />
                        {new Date(bill.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FiCalendar className="mr-2 h-4 w-4 text-gray-500" />
                        {new Date(bill.dueDate).toLocaleDateString()}
                        {bill.status === 'unpaid' && (
                          <span className={`ml-2 text-xs ${
                            isOverdue ? 'text-red-600' : 'text-orange-600'
                          }`}>
                            {isOverdue ? 'Overdue' : `Due in ${daysUntilDue} days`}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {bill.consumption} {bill.units}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FiDollarSign className="mr-2 h-4 w-4 text-gray-500" />
                        Rs. {bill.amount.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={bill.status === 'paid' ? 'default' : 'destructive'}
                        className="flex items-center gap-1"
                      >
                        {bill.status === 'paid' ? (
                          <>
                            <FiCheckCircle className="h-3 w-3" />
                            Paid
                          </>
                        ) : (
                          <>
                            <FiAlertCircle className="h-3 w-3" />
                            Unpaid
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {bill.status === 'unpaid' ? (
                        <Button size="sm" asChild>
                          <Link href={`/customer/bills/pay/${bill.id}`}>
                            Pay Now
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/customer/bills/${bill.id}`}>
                            View Details
                          </Link>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bill Summary Cards (for mobile) */}
      <div className="md:hidden space-y-4">
        {bills.map((bill) => {
          const daysUntilDue = getDaysUntilDue(bill.dueDate);
          const isOverdue = daysUntilDue < 0 && bill.status === 'unpaid';

          return (
            <Card key={bill.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{bill.id}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {new Date(bill.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge 
                    variant={bill.status === 'paid' ? 'default' : 'destructive'}
                    className="flex items-center gap-1"
                  >
                    {bill.status === 'paid' ? 'Paid' : 'Unpaid'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount:</span>
                  <span>Rs. {bill.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Consumption:</span>
                  <span>{bill.consumption} {bill.units}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Due Date:</span>
                  <span className={isOverdue ? 'text-red-600' : ''}>
                    {new Date(bill.dueDate).toLocaleDateString()}
                    {bill.status === 'unpaid' && (
                      <span className={`ml-1 text-xs ${
                        isOverdue ? 'text-red-600' : 'text-orange-600'
                      }`}>
                        ({isOverdue ? 'Overdue' : `Due in ${daysUntilDue} days`})
                      </span>
                    )}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                {bill.status === 'unpaid' ? (
                  <Button className="w-full" asChild>
                    <Link href={`/customer/bills/pay/${bill.id}`}>
                      Pay Now
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/customer/bills/${bill.id}`}>
                      View Details
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}