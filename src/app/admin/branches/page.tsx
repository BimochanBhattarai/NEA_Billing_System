"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";

const districtsByProvince = {
  "Province 1": [
    "Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", 
    "Morang", "Okhaldhunga", "Panchthar", "Sankhuwasabha", 
    "Solukhumbu", "Sunsari", "Taplejung", "Terhathum", "Udayapur"
  ],
  "Madhesh": [
    "Bara", "Dhanusha", "Mahottari", "Parsa", "Rautahat", 
    "Saptari", "Sarlahi", "Siraha"
  ],
  "Bagmati": [
    "Bhaktapur", "Chitwan", "Dhading", "Dolakha", "Kathmandu", 
    "Kavrepalanchok", "Lalitpur", "Makwanpur", "Nuwakot", 
    "Ramechhap", "Rasuwa", "Sindhuli", "Sindhupalchok"
  ],
  "Gandaki": [
    "Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", 
    "Mustang", "Myagdi", "Nawalpur", "Parbat", "Syangja", 
    "Tanahu"
  ],
  "Lumbini": [
    "Arghakhanchi", "Banke", "Bardiya", "Dang", "Gulmi", 
    "Kapilvastu", "Palpa", "Pyuthan", "Rolpa", "Rukum East", 
    "Rupandehi"
  ],
  "Karnali": [
    "Dailekh", "Dolpa", "Humla", "Jajarkot", "Jumla", 
    "Kalikot", "Mugu", "Rukum West", "Salyan", "Surkhet"
  ],
  "Sudurpashchim": [
    "Achham", "Baitadi", "Bajhang", "Bajura", "Dadeldhura", 
    "Darchula", "Doti", "Kailali", "Kanchanpur"
  ]
};

const allDistricts = Object.values(districtsByProvince).flat();

const branches = [
  { id: "BR-1001", name: "Kathmandu Central", location: "Kathmandu", contact: "01-4223344", incharge: "Bimal Shrestha", status: "Active" },
  { id: "BR-1002", name: "Pokhara Branch", location: "Kaski", contact: "061-522334", incharge: "Anita Gurung", status: "Active" },
  { id: "BR-1003", name: "Lalitpur Branch", location: "Lalitpur", contact: "01-5223344", incharge: "Rajesh Maharjan", status: "Active" },
  { id: "BR-1004", name: "Biratnagar Branch", location: "Morang", contact: "021-522334", incharge: "Sita Koirala", status: "Maintenance" },
  { id: "BR-1005", name: "Butwal Branch", location: "Rupandehi", contact: "071-522334", incharge: "Ramesh Adhikari", status: "Active" },
  { id: "BR-1006", name: "Nepalgunj Branch", location: "Banke", contact: "081-522334", incharge: "Gita Sharma", status: "Active" },
  { id: "BR-1007", name: "Hetauda Branch", location: "Makwanpur", contact: "057-522334", incharge: "Hari Pandey", status: "Inactive" },
  { id: "BR-1008", name: "Dharan Branch", location: "Sunsari", contact: "025-522334", incharge: "Sunita Rai", status: "Active" },
  { id: "BR-1009", name: "Bhaktapur Branch", location: "Bhaktapur", contact: "01-5223344", incharge: "Bikram Basnet", status: "Maintenance" },
  { id: "BR-1010", name: "Chitwan Branch", location: "Chitwan", contact: "056-522334", incharge: "Nabin K.C.", status: "Active" },
];

export default function BranchManagement() {
  const [statusFilter, setStatusFilter] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredBranches = branches.filter((branch) => {
    const matchesStatus = statusFilter === "" || branch.status === statusFilter;
    const matchesProvince = provinceFilter === "" || 
      districtsByProvince[provinceFilter as keyof typeof districtsByProvince]?.includes(branch.location);
    const matchesDistrict = districtFilter === "" || branch.location === districtFilter;
    
    return matchesStatus && (provinceFilter ? matchesProvince : true) && matchesDistrict;
  });

  const totalPages = Math.ceil(filteredBranches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBranches = filteredBranches.slice(startIndex, endIndex);

  const getProvinceByDistrict = (district: string) => {
    for (const [province, districts] of Object.entries(districtsByProvince)) {
      if (districts.includes(district)) {
        return province;
      }
    }
    return "";
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Branch Management</h1>
        <div className="flex gap-2 items-center">
          {/* Status Filter */}
          <select
            className="border px-2 py-1 rounded-md"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          {/* Province Filter */}
          <select
            className="border px-2 py-1 rounded-md"
            value={provinceFilter}
            onChange={(e) => {
              setProvinceFilter(e.target.value);
              setDistrictFilter("");
              setCurrentPage(1);
            }}
          >
            <option value="">All Provinces</option>
            {Object.keys(districtsByProvince).map((province) => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>

          {/* District Filter
          <select
            className="border px-2 py-1 rounded-md"
            value={districtFilter}
            onChange={(e) => {
              setDistrictFilter(e.target.value);
              setCurrentPage(1);
            }}
            disabled={!provinceFilter}
          >
            <option value="">All Districts</option>
            {provinceFilter && 
              districtsByProvince[provinceFilter as keyof typeof districtsByProvince].map((district) => (
                <option key={district} value={district}>{district}</option>
              ))
            }
          </select> */}

          <Button
            variant="ghost"
            onClick={() => {
              setStatusFilter("");
              setProvinceFilter("");
              setDistrictFilter("");
              setCurrentPage(1);
            }}
          >
            Reset
          </Button>

          <Button variant="outline">Export</Button>
          <Link href="/admin/branches/register" passHref>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Add Branch
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch ID</TableHead>
                <TableHead>Branch Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Province</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Incharge</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBranches.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>{branch.id}</TableCell>
                  <TableCell>{branch.name}</TableCell>
                  <TableCell>{branch.location}</TableCell>
                  <TableCell>{getProvinceByDistrict(branch.location)}</TableCell>
                  <TableCell>{branch.contact}</TableCell>
                  <TableCell>{branch.incharge}</TableCell>
                  <TableCell>
                    <span
                      className={`
                        px-2 py-1 rounded-full text-xs font-medium border
                        ${branch.status === "Active" ? "text-green-600 border-green-600 bg-green-100" : ""}
                        ${branch.status === "Inactive" ? "text-red-600 border-red-600 bg-red-100" : ""}
                        ${branch.status === "Maintenance" ? "text-yellow-700 border-yellow-400 bg-yellow-100" : ""}
                      `}
                    >
                      {branch.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => alert(`Viewing ${branch.name}`)}>
                          <Eye className="w-4 h-4 mr-2 text-blue-500" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => alert(`Editing ${branch.name}`)}>
                          <Pencil className="w-4 h-4 mr-2 text-yellow-500" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            if (confirm(`Delete ${branch.name}?`)) {
                              alert(`Deleted ${branch.name}`);
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
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}