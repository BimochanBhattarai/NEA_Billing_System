"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PaymentMethodRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
    status: "Active"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Payment Method registered:", formData);
    alert("Payment Method registered successfully!");
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto max-w-2xl border border-blue-100 bg-white shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-blue-800">Add Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-700">
                Payment Method Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. eSewa, Khalti, etc."
                value={formData.name}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl" className="text-blue-700">
                Logo URL
              </Label>
              <Input
                id="logoUrl"
                name="logoUrl"
                placeholder="https://example.com/logo.png"
                value={formData.logoUrl}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Status</Label>
              <Select onValueChange={handleSelectChange} value={formData.status}>
                <SelectTrigger className="border-blue-200 focus:border-blue-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="border-blue-200">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.logoUrl && (
              <div className="space-y-2">
                <Label className="text-blue-700">Logo Preview</Label>
                <div className="border border-blue-200 rounded-md p-2 flex justify-center">
                  <img 
                    src={formData.logoUrl} 
                    alt="Logo preview" 
                    className="h-16 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Link href="/admin/payment-methods" passHref>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Payment Method
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}