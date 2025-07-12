"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
// import Image from "next/image";

const paymentMethods = [
  { id: "PM-1001", name: "eSewa", logoUrl: "https://images.seeklogo.com/logo-png/46/1/esewa-logo-png_seeklogo-469833.png", status: "Active" },
  { id: "PM-1002", name: "Khalti", logoUrl: "https://images.seeklogo.com/logo-png/33/1/khalti-logo-png_seeklogo-337962.png", status: "Active" },
  { id: "PM-1003", name: "Connect IPS", logoUrl: "https://login.connectips.com/static/media/newLogo.ed7f73c800e12259be50.png", status: "Active" },
  { id: "PM-1004", name: "Bank Transfer", logoUrl: "https://login.connectips.com/static/media/newLogo.ed7f73c800e12259be50.png", status: "Inactive" },
];

export default function PaymentMethodManagement() {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredMethods = paymentMethods.filter((method) => {
    return statusFilter === "" || method.status === statusFilter;
  });

  const totalPages = Math.ceil(filteredMethods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMethods = filteredMethods.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto max-w-4xl border border-blue-100 bg-white shadow-sm">
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold text-blue-800">Payment Method Configuration</h1>
          <div className="flex gap-2 items-center">
            {/* Status Filter */}
            <select
              className="border border-blue-200 px-2 py-1 rounded-md focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <Button
              variant="ghost"
              onClick={() => {
                setStatusFilter("");
                setCurrentPage(1);
              }}
              className="text-blue-600 hover:bg-blue-50"
            >
              Reset
            </Button>

            <Link href="/admin/payment-methods/register" passHref>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Add Payment Method
              </Button>
            </Link>
          </div>
        </div>

        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-700">Method ID</TableHead>
                <TableHead className="text-blue-700">Name</TableHead>
                <TableHead className="text-blue-700">Logo</TableHead>
                <TableHead className="text-blue-700">Status</TableHead>
                <TableHead className="text-blue-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMethods.map((method) => (
                <TableRow key={method.id}>
                  <TableCell>{method.id}</TableCell>
                  <TableCell>{method.name}</TableCell>
                  <TableCell>
                    {method.logoUrl && (
                      <img 
                        src={method.logoUrl} 
                        alt={`${method.name} logo`} 
                        width={40} 
                        height={40} 
                        className="h-10 w-10 object-contain"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-medium border
                        ${method.status === "Active" ? "text-green-600 border-green-600 bg-green-100" : ""}
                        ${method.status === "Inactive" ? "text-red-600 border-red-600 bg-red-100" : ""}
                      `}
                    >
                      {method.status}
                    </span>
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => alert(`Viewing ${method.name}`)}>
                          <Eye className="w-4 h-4 mr-2 text-blue-500" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Editing ${method.name}`)}>
                          <Pencil className="w-4 h-4 mr-2 text-yellow-500" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (confirm(`Delete ${method.name}?`)) {
                              alert(`Deleted ${method.name}`);
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