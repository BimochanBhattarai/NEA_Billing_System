"use client";
import {PaymentDetails} from "@/components/payment-details";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Download, Search } from "lucide-react";

// Dummy data
const paymentData = [
	{
		id: "PAY-1001",
		customerId: "CUST-1001",
		customerName: "Ram Sharma",
		billNumber: "BL-2023-1001",
		amount: 1500,
		paidAmount: 1500,
		method: "eSewa",
		status: "Paid",
		branch: "Kathmandu",
		paymentDate: "2023-10-15",
		dueDate: "2023-10-20",
	},
	{
		id: "PAY-1002",
		customerId: "CUST-1002",
		customerName: "Sita Gurung",
		billNumber: "BL-2023-1002",
		amount: 2500,
		paidAmount: 2500,
		method: "Khalti",
		status: "Paid",
		branch: "Pokhara",
		paymentDate: "2023-10-14",
		dueDate: "2023-10-19",
	},
	{
		id: "PAY-1003",
		customerId: "CUST-1003",
		customerName: "Hari Pandey",
		billNumber: "BL-2023-1003",
		amount: 1800,
		paidAmount: 0,
		method: "-",
		status: "Pending",
		branch: "Lalitpur",
		paymentDate: "-",
		dueDate: "2023-10-18",
	},
];

export default function PaymentDashboard() {
	const [statusFilter, setStatusFilter] = useState("");
	const [branchFilter, setBranchFilter] = useState("");
	const [searchQuery, setSearchQuery] = useState("");

	const [selectedPayment, setSelectedPayment] = useState<any>(null);
	const [detailsOpen, setDetailsOpen] = useState(false);

	if (statusFilter === "*") {
		setStatusFilter("");
	}
	if (branchFilter === "*") {
		setBranchFilter("");
	}

	const filteredPayments = paymentData.filter((payment) => {
		const matchesStatus = !statusFilter || payment.status === statusFilter;
		const matchesBranch = !branchFilter || payment.branch === branchFilter;
		const matchesSearch =
			!searchQuery ||
			payment.customerName
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
			payment.billNumber
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
		return matchesStatus && matchesBranch && matchesSearch;
	});

	// Calculate totals
	const totalRevenue = paymentData
		.filter((p) => p.status === "Paid")
		.reduce((sum, payment) => sum + payment.paidAmount, 0);

	const pendingAmount = paymentData
		.filter((p) => p.status === "Pending")
		.reduce((sum, payment) => sum + payment.amount, 0);

	return (
		<div className="min-h-screen bg-white p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-blue-800">
					NEA Payment Management
				</h1>
				<div className="flex gap-2">
					<Button className="bg-blue-600 hover:bg-blue-700">
						<Download className="h-4 w-4 mr-2" />
						Export
					</Button>
				</div>
			</div>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<Card className="border border-blue-100">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-blue-700">
							Total Revenue
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							Rs {totalRevenue.toLocaleString()}
						</div>
					</CardContent>
				</Card>

				<Card className="border border-blue-100">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-blue-700">
							Pending Payments
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							Rs {pendingAmount.toLocaleString()}
						</div>
					</CardContent>
				</Card>

				<Card className="border border-blue-100">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-blue-700">
							Total Transactions
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{paymentData.length}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Filters */}
			<div className="flex flex-col md:flex-row gap-4 mb-6">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-3 h-4 w-4 text-blue-500" />
					<Input
						placeholder="Search by customer or bill number..."
						className="pl-10 border-blue-200 focus:border-blue-500"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<Select onValueChange={setStatusFilter}>
					<SelectTrigger className="w-[180px] border-blue-200">
						<SelectValue placeholder="All Status" />
					</SelectTrigger>
					<SelectContent className="border-blue-200">
						<SelectItem value="*">All Status</SelectItem>
						<SelectItem value="Paid">Paid</SelectItem>
						<SelectItem value="Pending">Pending</SelectItem>
						<SelectItem value="Partial">Partial</SelectItem>
					</SelectContent>
				</Select>

				<Select onValueChange={setBranchFilter}>
					<SelectTrigger className="w-[180px] border-blue-200">
						<SelectValue placeholder="All Branches" />
					</SelectTrigger>
					<SelectContent className="border-blue-200">
						<SelectItem value="*">All Branches</SelectItem>
						<SelectItem value="Kathmandu">Kathmandu</SelectItem>
						<SelectItem value="Pokhara">Pokhara</SelectItem>
						<SelectItem value="Lalitpur">Lalitpur</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Payment Table */}
			<Card className="border border-blue-100">
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-blue-700">
									Payment ID
								</TableHead>
								<TableHead className="text-blue-700">
									Bill No.
								</TableHead>
								<TableHead className="text-blue-700">
									Customer
								</TableHead>
								<TableHead className="text-blue-700">
									Amount (Rs)
								</TableHead>
								<TableHead className="text-blue-700">
									Paid (Rs)
								</TableHead>
								<TableHead className="text-blue-700">
									Method
								</TableHead>
								<TableHead className="text-blue-700">
									Status
								</TableHead>
								<TableHead className="text-blue-700">
									Branch
								</TableHead>
								<TableHead className="text-blue-700">
									Date
								</TableHead>
								<TableHead className="text-blue-700">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredPayments.map((payment) => (
								<TableRow key={payment.id}>
									<TableCell>{payment.id}</TableCell>
									<TableCell>{payment.billNumber}</TableCell>
									<TableCell>
										{payment.customerName}
									</TableCell>
									<TableCell>
										{payment.amount.toLocaleString()}
									</TableCell>
									<TableCell>
										{payment.paidAmount.toLocaleString()}
									</TableCell>
									<TableCell>{payment.method}</TableCell>
									<TableCell>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium border ${
												payment.status === "Paid"
													? "bg-green-100 text-green-600 border-green-600"
													: payment.status ===
													  "Pending"
													? "bg-yellow-100 text-yellow-600 border-yellow-600"
													: "bg-blue-100 text-blue-600 border-blue-600"
											}`}
										>
											{payment.status}
										</span>
									</TableCell>
									<TableCell>{payment.branch}</TableCell>
									<TableCell>{payment.paymentDate}</TableCell>
									<TableCell>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => {
												setSelectedPayment(payment);
												setDetailsOpen(true);
											}}
										>
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{selectedPayment && (
				<PaymentDetails
					payment={selectedPayment}
					open={detailsOpen}
					onOpenChange={setDetailsOpen}
				/>
			)}
		</div>
	);
}
