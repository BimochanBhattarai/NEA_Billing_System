'use client';

import { FiUser, FiZap, FiCalendar, FiDollarSign, FiCheckCircle } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function MeterReadingForm() {
  const { id } = useParams();
  const [currentReading, setCurrentReading] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - replace with API call to fetch customer details
  const customerData = {
    customerId: id,
    name: 'Hari Bahadur',
    address: 'Patan, Lalitpur',
    previousReading: 1800,
    minServiceCharge: 100.00,
    rate: 7.50
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Meter reading submitted successfully!');
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto p-4 md:p-6">
      <Card className="border-blue-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <FiZap className="h-5 w-5" />
            Meter Reading Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Info */}
            <div className="space-y-2">
              <Label className="text-blue-700 flex items-center gap-2">
                <FiUser className="h-4 w-4" />
                Customer ID
              </Label>
              <Input 
                value={customerData.customerId} 
                disabled 
                className="bg-gray-100"
              />
              <p className="text-sm text-gray-600">
                {customerData.name} - {customerData.address}
              </p>
            </div>

            {/* Previous Reading */}
            <div className="space-y-2">
              <Label className="text-blue-700 flex items-center gap-2">
                <FiZap className="h-4 w-4" />
                Previous Reading (kWh)
              </Label>
              <Input 
                value={customerData.previousReading} 
                disabled 
                className="bg-gray-100"
              />
            </div>

            {/* Current Reading */}
            <div className="space-y-2">
              <Label className="text-blue-700 flex items-center gap-2" htmlFor="currentReading">
                <FiZap className="h-4 w-4" />
                Current Reading (kWh)
              </Label>
              <Input
                id="currentReading"
                type="number"
                required
                value={currentReading}
                onChange={(e) => setCurrentReading(e.target.value)}
                placeholder="Enter current meter reading"
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            {/* Billing Period */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-blue-700 flex items-center gap-2">
                  <FiCalendar className="h-4 w-4" />
                  Bill Month
                </Label>
                <Input 
                  value={new Date().toLocaleString('default', { month: 'long' })} 
                  disabled 
                  className="bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-blue-700 flex items-center gap-2">
                  <FiCalendar className="h-4 w-4" />
                  Bill Year
                </Label>
                <Input 
                  value={new Date().getFullYear()} 
                  disabled 
                  className="bg-gray-100"
                />
              </div>
            </div>

            {/* Service Charge */}
            <div className="space-y-2">
              <Label className="text-blue-700 flex items-center gap-2">
                <FiDollarSign className="h-4 w-4" />
                Minimum Service Charge
              </Label>
              <Input 
                value={`Rs. ${customerData.minServiceCharge.toFixed(2)}`} 
                disabled 
                className="bg-gray-100"
              />
            </div>

            {/* Estimated Consumption */}
            {currentReading && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Estimated Consumption</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Units Consumed</p>
                    <p className="font-bold">
                      {parseInt(currentReading)} kWh
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Charge</p>
                    <p className="font-bold">
                      Rs. {((parseInt(currentReading) * customerData.rate + customerData.minServiceCharge).toFixed(2))}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <CardFooter className="px-0 pb-0 justify-end">
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FiCheckCircle className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="mr-2 h-4 w-4" />
                    Submit Reading
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}