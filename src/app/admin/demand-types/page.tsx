"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";

const demandTypes = [
  { id: "DT-1001", name: "Residential (5 A)", description: "Standard residential electricity demand", status: "Active" },
  { id: "DT-1002", name: "Commercial (15 A)", description: "Medium commercial electricity demand", status: "Active" },
  { id: "DT-1003", name: "Industrial (30 A)", description: "High capacity industrial demand", status: "Active" },
];

export default function DemandTypeManagement() {
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredDemandTypes = demandTypes.filter((type) => {
    return statusFilter === "" || type.status === statusFilter;
  });

  const totalPages = Math.ceil(filteredDemandTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDemandTypes = filteredDemandTypes.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <Card className="mx-auto max-w-4xl border border-blue-100 bg-white shadow-sm">
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold text-blue-800">Demand Type Management</h1>
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

            <Link href="/admin/demand-types/register" passHref>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Add Demand Type
              </Button>
            </Link>
          </div>
        </div>

        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-700">Demand Type ID</TableHead>
                <TableHead className="text-blue-700">Name</TableHead>
                <TableHead className="text-blue-700">Description</TableHead>
                <TableHead className="text-blue-700">Status</TableHead>
                <TableHead className="text-blue-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentDemandTypes.map((type) => (
                <TableRow key={type.id}>
                  <TableCell>{type.id}</TableCell>
                  <TableCell>{type.name}</TableCell>
                  <TableCell>{type.description}</TableCell>
                  <TableCell>
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-medium border
                        ${type.status === "Active" ? "text-green-600 border-green-600 bg-green-100" : ""}
                        ${type.status === "Inactive" ? "text-red-600 border-red-600 bg-red-100" : ""}
                      `}
                    >
                      {type.status}
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
                        <DropdownMenuItem onClick={() => alert(`Viewing ${type.name}`)}>
                          <Eye className="w-4 h-4 mr-2 text-blue-500" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Editing ${type.name}`)}>
                          <Pencil className="w-4 h-4 mr-2 text-yellow-500" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (confirm(`Delete ${type.name}?`)) {
                              alert(`Deleted ${type.name}`);
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