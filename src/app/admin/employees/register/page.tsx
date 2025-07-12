"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const branches = [
  "Kathmandu Central", "Pokhara Branch", "Lalitpur Branch", 
  "Biratnagar Branch", "Butwal Branch", "Nepalgunj Branch"
];

export default function EmployeeRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    type: "Meter Reader",
    branch: "",
    contact: "",
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee registered:", formData);
    alert("Employee registered successfully!");
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto max-w-2xl border border-blue-100 bg-white shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-blue-800">Employee Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-blue-700">
                Employee Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter employee name"
                value={formData.name}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Employee Type</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("type", value)} 
                value={formData.type}
              >
                <SelectTrigger className="border-blue-200 focus:border-blue-500">
                  <SelectValue placeholder="Select employee type" />
                </SelectTrigger>
                <SelectContent className="border-blue-200">
                  <SelectItem value="Meter Reader">Meter Reader</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Branch Assigned</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("branch", value)} 
                value={formData.branch}
              >
                <SelectTrigger className="border-blue-200 focus:border-blue-500">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent className="border-blue-200 max-h-60 overflow-y-auto">
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact" className="text-blue-700">
                Contact Number
              </Label>
              <Input
                id="contact"
                name="contact"
                placeholder="Enter contact number"
                value={formData.contact}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-blue-700">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="border-blue-200 focus:border-blue-500"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Link href="/admin/employees" passHref>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Register Employee
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}