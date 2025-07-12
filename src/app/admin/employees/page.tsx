"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";

const employees = [
  { id: "EMP-1001", name: "Ram Sharma", type: "Admin", branch: "Kathmandu Central", contact: "9841000001", username: "ram.admin" },
  { id: "EMP-1002", name: "Sita Gurung", type: "Meter Reader", branch: "Pokhara Branch", contact: "9841000002", username: "sita.meter" },
  { id: "EMP-1003", name: "Hari Pandey", type: "Admin", branch: "Lalitpur Branch", contact: "9841000003", username: "hari.admin" },
  { id: "EMP-1004", name: "Gita Shrestha", type: "Meter Reader", branch: "Biratnagar Branch", contact: "9841000004", username: "gita.meter" },
  { id: "EMP-1005", name: "Bimal Karki", type: "Meter Reader", branch: "Butwal Branch", contact: "9841000005", username: "bimal.meter" },
];

const branches = [
  "Kathmandu Central", "Pokhara Branch", "Lalitpur Branch", 
  "Biratnagar Branch", "Butwal Branch", "Nepalgunj Branch"
];

export default function EmployeeManagement() {
  const [typeFilter, setTypeFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredEmployees = employees.filter((employee) => {
    return (
      (typeFilter === "" || employee.type === typeFilter) &&
      (branchFilter === "" || employee.branch === branchFilter)
    );
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto max-w-6xl border border-blue-100 bg-white shadow-sm">
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold text-blue-800">Employee Management</h1>
          <div className="flex gap-2 items-center">
            {/* Type Filter */}
            <select
              className="border border-blue-200 px-2 py-1 rounded-md focus:border-blue-500"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Types</option>
              <option value="Admin">Admin</option>
              <option value="Meter Reader">Meter Reader</option>
            </select>

            {/* Branch Filter */}
            <select
              className="border border-blue-200 px-2 py-1 rounded-md focus:border-blue-500"
              value={branchFilter}
              onChange={(e) => {
                setBranchFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>

            <Button
              variant="ghost"
              onClick={() => {
                setTypeFilter("");
                setBranchFilter("");
                setCurrentPage(1);
              }}
              className="text-blue-600 hover:bg-blue-50"
            >
              Reset
            </Button>

            <Link href="/admin/employees/register" passHref>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Register Employee
              </Button>
            </Link>
          </div>
        </div>

        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-700">Employee ID</TableHead>
                <TableHead className="text-blue-700">Name</TableHead>
                <TableHead className="text-blue-700">Type</TableHead>
                <TableHead className="text-blue-700">Branch</TableHead>
                <TableHead className="text-blue-700">Contact</TableHead>
                <TableHead className="text-blue-700">Username</TableHead>
                <TableHead className="text-blue-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-medium border
                        ${employee.type === "Admin" ? "text-blue-600 border-blue-600 bg-blue-100" : ""}
                        ${employee.type === "Meter Reader" ? "text-green-600 border-green-600 bg-green-100" : ""}
                      `}
                    >
                      {employee.type}
                    </span>
                  </TableCell>
                  <TableCell>{employee.branch}</TableCell>
                  <TableCell>{employee.contact}</TableCell>
                  <TableCell>{employee.username}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-blue-200">
                        <DropdownMenuLabel className="text-blue-700">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => alert(`Viewing ${employee.name}`)}>
                          <Eye className="w-4 h-4 mr-2 text-blue-500" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Editing ${employee.name}`)}>
                          <Pencil className="w-4 h-4 mr-2 text-yellow-500" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (confirm(`Delete ${employee.name}?`)) {
                              alert(`Deleted ${employee.name}`);
                            }
                          }}
                          className="text-red-600 focus:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="border-blue-200 hover:bg-blue-50"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="border-blue-200 hover:bg-blue-50"
        >
          Next
        </Button>
      </div>
    </div>
  );
}