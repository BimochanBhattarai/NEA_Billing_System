'use client';

import { FiCreditCard, FiCalendar, FiZap, FiFileText, FiCheckCircle, FiAlertCircle, FiDollarSign } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

// Mock data - replace with API call to fetch bill by ID
const mockBill = {
  billNo: 1001,
  cusID: 5001,
  billDate: new Date('2023-12-01'),
  billMonth: 12,
  billYear: 2023,
  previousReading: 1250,
  currentReading: 1600,
  consumedUnits: 350,
  minimumCharge: 100.00,
  rate: 7.50,
  totalAmount: 2725.00,
  status: 'Generated',
  dueDate: new Date('2023-12-15'),
  verifiedByID: null,
  verifiedAt: null
};

export default function BillPaymentPage() {
  const searchParams = useSearchParams();
  const billId = searchParams.get('id');
  const [bill, setBill] = useState(mockBill);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // In a real app, you would fetch the bill data here
  useEffect(() => {
    // fetchBill(billId).then(data => setBill(data));
  }, [billId]);

  const handlePayment = () => {
    setIsPaying(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsPaying(false);
      // Update bill status to Paid
      setBill(prev => ({ ...prev, status: 'Paid' }));
      // Redirect to success page or show success message
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-100 text-green-800"><FiCheckCircle className="mr-1" /> Paid</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-100 text-red-800"><FiAlertCircle className="mr-1" /> Overdue</Badge>;
      case 'Verified':
        return <Badge className="bg-blue-100 text-blue-800">Verified</Badge>;
      case 'Cancelled':
        return <Badge className="bg-gray-100 text-gray-800">Cancelled</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Generated</Badge>;
    }
  };

  const daysUntilDue = Math.ceil(
    (new Date(bill.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Bill Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Electricity Bill Payment</h1>
          <p className="text-gray-600">Customer ID: {bill.cusID}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Due Date</p>
            <p className="font-medium">
              {format(new Date(bill.dueDate), 'MMM dd, yyyy')}
              {daysUntilDue < 0 && bill.status !== 'Paid' && (
                <span className="ml-2 text-red-600 text-sm">(Overdue)</span>
              )}
            </p>
          </div>
          {getStatusBadge(bill.status)}
        </div>
      </div>

      {/* Bill Summary Card */}
      <Card className="border-blue-100 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex justify-between items-center">
            <span>Bill Summary</span>
            <span className="text-2xl">Rs. {bill.totalAmount.toFixed(2)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Bill No.</p>
              <p className="font-medium">{bill.billNo}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Billing Period</p>
              <p className="font-medium">
                {format(new Date(bill.billDate), 'MMM yyyy')}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Days Remaining</p>
              <p className={`font-medium ${
                daysUntilDue < 0 && bill.status !== 'Paid' ? 'text-red-600' : 'text-green-600'
              }`}>
                {daysUntilDue < 0 ? 'Overdue' : `${daysUntilDue} days`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bill Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiFileText className="text-blue-600" />
            <span>Bill Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Meter Reading Section */}
          <div className="border-b pb-4">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <FiZap className="text-blue-600" />
              Meter Reading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Previous Reading</p>
                <p className="font-medium">{bill.previousReading} units</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Current Reading</p>
                <p className="font-medium">{bill.currentReading} units</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Consumed Units</p>
                <p className="font-medium">{bill.consumedUnits} units</p>
              </div>
            </div>
          </div>

          {/* Charges Breakdown */}
          <div>
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <FiDollarSign className="text-blue-600" />
              Charges Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Minimum Charge</span>
                <span>Rs. {bill.minimumCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Consumption Charge ({bill.consumedUnits} units × Rs. {bill.rate})</span>
                <span>Rs. {(bill.consumedUnits * bill.rate).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total Amount</span>
                <span>Rs. {bill.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Section */}
      {bill.status !== 'Paid' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Payment Method</label>
              <Select onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="esewa">eSewa</SelectItem>
                  <SelectItem value="khalti">Khalti</SelectItem>
                  <SelectItem value="connectips">ConnectIPS</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
                <li>Please pay before the due date to avoid late fees</li>
                <li>Payment processing may take 1-2 business days</li>
                <li>Keep the transaction ID for future reference</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button 
              onClick={handlePayment}
              disabled={!paymentMethod || isPaying}
              className="min-w-[150px] bg-blue-600 text-white hover:bg-blue-700"
            >
              {isPaying ? 'Processing...' : 'Pay Now'}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Payment Confirmation (shown after payment) */}
      {bill.status === 'Paid' && (
        <Card className="border-green-100 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <FiCheckCircle className="h-5 w-5" />
              <span>Payment Successful</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Your payment of Rs. {bill.totalAmount.toFixed(2)} has been received.</p>
            <p className="text-sm text-green-700">Transaction ID: NEA-{bill.billNo}-{Date.now()}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href="/customer/bills">Back to Bills</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}