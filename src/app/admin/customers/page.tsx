"use client";

import { useState } from "react";
import Link from "next/link";
import {
	Card,
	CardContent,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Button,
} from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	MoreHorizontal,
	Eye,
	Pencil,
	Trash2,
} from "lucide-react";

const customers = [
	{ name: "Bimochan Bhattarai", scNo: "SC-1001", branch: "Kathmandu", demandType: "Residential (5 A)", status: "Active" },
	{ name: "Aarav Shrestha", scNo: "SC-1002", branch: "Pokhara", demandType: "Commercial (15 A)", status: "Pending" },
	{ name: "Nirajan Gurung", scNo: "SC-1003", branch: "Lalitpur", demandType: "Residential (5 A)", status: "Active" },
	{ name: "Sneha Bista", scNo: "SC-1004", branch: "Biratnagar", demandType: "Industrial (30 A)", status: "Blocked" },
	{ name: "Kritika Joshi", scNo: "SC-1005", branch: "Butwal", demandType: "Commercial (15 A)", status: "Pending" },
	{ name: "Saurav Thapa", scNo: "SC-1006", branch: "Nepalgunj", demandType: "Residential (5 A)", status: "Active" },
	{ name: "Ritika Sharma", scNo: "SC-1007", branch: "Hetauda", demandType: "Residential (5 A)", status: "Pending" },
	{ name: "Aashish Karki", scNo: "SC-1008", branch: "Dharan", demandType: "Commercial (15 A)", status: "Active" },
	{ name: "Bibek Maharjan", scNo: "SC-1009", branch: "Bhaktapur", demandType: "Industrial (30 A)", status: "Blocked" },
	{ name: "Prerana Lama", scNo: "SC-1010", branch: "Chitwan", demandType: "Residential (5 A)", status: "Active" },
	{ name: "Nishan Dhakal", scNo: "SC-1011", branch: "Janakpur", demandType: "Commercial (15 A)", status: "Pending" },
	{ name: "Swastika Adhikari", scNo: "SC-1012", branch: "Birgunj", demandType: "Industrial (30 A)", status: "Active" },
];

export default function CustomerManagement() {
	const [statusFilter, setStatusFilter] = useState("");
	const [branchFilter, setBranchFilter] = useState("");
	const [demandFilter, setDemandFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const filteredCustomers = customers.filter((customer) => {
		return (
			(statusFilter === "" || customer.status === statusFilter) &&
			(branchFilter === "" || customer.branch === branchFilter) &&
			(demandFilter === "" || customer.demandType === demandFilter)
		);
	});

	const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

	return (
		<div className="p-6 space-y-4">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-semibold">Customer Management</h1>
				<div className="flex gap-2 items-center">
					{/* Filters */}
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
						<option value="Pending">Pending</option>
						<option value="Blocked">Blocked</option>
					</select>

					<select
						className="border px-2 py-1 rounded-md"
						value={branchFilter}
						onChange={(e) => {
							setBranchFilter(e.target.value);
							setCurrentPage(1);
						}}
					>
						<option value="">All Branches</option>
						{[...new Set(customers.map((c) => c.branch))].map((branch) => (
							<option key={branch} value={branch}>{branch}</option>
						))}
					</select>

					<select
						className="border px-2 py-1 rounded-md"
						value={demandFilter}
						onChange={(e) => {
							setDemandFilter(e.target.value);
							setCurrentPage(1);
						}}
					>
						<option value="">All Demand Types</option>
						{[...new Set(customers.map((c) => c.demandType))].map((type) => (
							<option key={type} value={type}>{type}</option>
						))}
					</select>

					<Button
						variant="ghost"
						onClick={() => {
							setStatusFilter("");
							setBranchFilter("");
							setDemandFilter("");
							setCurrentPage(1);
						}}
					>
						Reset
					</Button>

					<Button variant="outline">Export</Button>
					<Link href="/admin/customers/register" passHref>
						<Button className="bg-blue-500 text-white hover:bg-blue-600">
							Add Customer
						</Button>
					</Link>
				</div>
			</div>

			<Card>
				<CardContent className="p-4">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Customer Name</TableHead>
								<TableHead>SC No.</TableHead>
								<TableHead>Branch</TableHead>
								<TableHead>Demand Type</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{currentCustomers.map((customer, index) => (
								<TableRow key={index}>
									<TableCell>{customer.name}</TableCell>
									<TableCell>{customer.scNo}</TableCell>
									<TableCell>{customer.branch}</TableCell>
									<TableCell>{customer.demandType}</TableCell>
									<TableCell>
										<span
											className={`
												px-2 py-1 rounded-full text-xs font-medium border
												${customer.status === "Active" ? "text-green-600 border-green-600 bg-green-100" : ""}
												${customer.status === "Pending" ? "text-yellow-700 border-yellow-400 bg-yellow-100" : ""}
												${customer.status === "Blocked" ? "text-red-600 border-red-600 bg-red-100" : ""}
											`}
										>
											{customer.status}
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
												<DropdownMenuItem onClick={() => alert(`Viewing ${customer.name}`)}>
													<Eye className="w-4 h-4 mr-2 text-blue-500" />
													View
												</DropdownMenuItem>
												<DropdownMenuItem onClick={() => alert(`Editing ${customer.name}`)}>
													<Pencil className="w-4 h-4 mr-2 text-yellow-500" />
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => {
														if (confirm(`Delete ${customer.name}?`)) {
															alert(`Deleted ${customer.name}`);
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
