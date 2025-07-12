"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DemandTypeRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    console.log("Demand Type registered:", formData);
    alert("Demand Type registered successfully!");
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto max-w-2xl border border-blue-100 bg-white shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-blue-800">Demand Type Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-700">
                Demand Type Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Residential (5 A)"
                value={formData.name}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-blue-700">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Enter description"
                value={formData.description}
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

            <div className="flex justify-end gap-2 pt-4">
              <Link href="/admin/demand-types" passHref>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Demand Type
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}