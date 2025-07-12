"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Filter, Printer, Search } from "lucide-react";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// Dummy data - same as previously provided
const reportData = [{
    id: "INV-2023-1001",
    customer: "Ram Sharma",
    customerId: "CUST-1001",
    address: "Baneshwor, Kathmandu",
    demandType: "Residential (5A)",
    amount: 4500,
    paid: 4500,
    dueDate: "2023-11-20",
    paymentDate: "2023-11-15",
    daysEarly: 5,
    status: "Paid",
    branch: "Kathmandu",
    method: "eSewa",
    adjustment: { 
      type: "rebate", 
      amount: 150, 
      reason: "Early payment (5+ days)",
      percentage: 3.33
    },
    meterReading: 1250,
    previousReading: 1200,
    consumption: 50,
    tariff: "TRF-RES-01"
  },
  {
    id: "INV-2023-1002",
    customer: "Sita Gurung",
    customerId: "CUST-1002",
    address: "Lakeside, Pokhara",
    demandType: "Commercial (15A)",
    amount: 12500,
    paid: 12500,
    dueDate: "2023-11-18",
    paymentDate: "2023-11-14",
    daysEarly: 4,
    status: "Paid",
    branch: "Pokhara",
    method: "Khalti",
    adjustment: { 
      type: "rebate", 
      amount: 375, 
      reason: "Early payment (4 days)",
      percentage: 3.00
    },
    meterReading: 3250,
    previousReading: 3100,
    consumption: 150,
    tariff: "TRF-COM-02"
  },
  {
    id: "INV-2023-1003",
    customer: "Hari Pandey",
    customerId: "CUST-1003",
    address: "Patan, Lalitpur",
    demandType: "Industrial (30A)",
    amount: 28750,
    paid: 29000,
    dueDate: "2023-11-15",
    paymentDate: "2023-11-17",
    daysLate: 2,
    status: "Paid",
    branch: "Lalitpur",
    method: "ConnectIPS",
    adjustment: { 
      type: "fine", 
      amount: 250, 
      reason: "Late payment (2 days)",
      percentage: 0.87
    },
    meterReading: 8750,
    previousReading: 8500,
    consumption: 250,
    tariff: "TRF-IND-03"
  },
  {
    id: "INV-2023-1004",
    customer: "Gita Shrestha",
    customerId: "CUST-1004",
    address: "Biratnagar-4",
    demandType: "Residential (5A)",
    amount: 3800,
    paid: 0,
    dueDate: "2023-11-25",
    paymentDate: null,
    daysLate: null,
    status: "Pending",
    branch: "Biratnagar",
    method: null,
    adjustment: null,
    meterReading: 1850,
    previousReading: 1800,
    consumption: 50,
    tariff: "TRF-RES-01"
  },
  {
    id: "INV-2023-1005",
    customer: "Bimal Karki",
    customerId: "CUST-1005",
    address: "New Road, Pokhara",
    demandType: "Commercial (15A)",
    amount: 9800,
    paid: 5000,
    dueDate: "2023-11-22",
    paymentDate: "2023-11-21",
    daysEarly: 1,
    status: "Partial",
    branch: "Pokhara",
    method: "Cash",
    adjustment: { 
      type: "rebate", 
      amount: 98, 
      reason: "Early payment (1 day)",
      percentage: 1.00
    },
    meterReading: 4200,
    previousReading: 4000,
    consumption: 200,
    tariff: "TRF-COM-02"
  },
  {
    id: "INV-2023-1006",
    customer: "Niraj Gurung",
    customerId: "CUST-1006",
    address: "Bhaktapur",
    demandType: "Residential (5A)",
    amount: 5200,
    paid: 5350,
    dueDate: "2023-11-16",
    paymentDate: "2023-11-19",
    daysLate: 3,
    status: "Paid",
    branch: "Bhaktapur",
    method: "eSewa",
    adjustment: { 
      type: "fine", 
      amount: 150, 
      reason: "Late payment (3 days)",
      percentage: 2.88
    },
    meterReading: 2200,
    previousReading: 2150,
    consumption: 50,
    tariff: "TRF-RES-01"
  },
  {
    id: "INV-2023-1007",
    customer: "Sunita Rai",
    customerId: "CUST-1007",
    address: "Dharan",
    demandType: "Residential (5A)",
    amount: 4200,
    paid: 4200,
    dueDate: "2023-11-28",
    paymentDate: "2023-11-25",
    daysEarly: 3,
    status: "Paid",
    branch: "Dharan",
    method: "Khalti",
    adjustment: { 
      type: "rebate", 
      amount: 126, 
      reason: "Early payment (3 days)",
      percentage: 3.00
    },
    meterReading: 1950,
    previousReading: 1900,
    consumption: 50,
    tariff: "TRF-RES-01"
  }]; 

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });
  const [statusFilter, setStatusFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter data function
  const filteredData = reportData.filter(item => {
    const matchesDate = (!dateRange.from || new Date(item.dueDate) >= dateRange.from) && 
                       (!dateRange.to || new Date(item.dueDate) <= dateRange.to);
    const matchesStatus = !statusFilter || item.status === statusFilter;
    const matchesBranch = !branchFilter || item.branch === branchFilter;
    const matchesMethod = !paymentMethodFilter || item.method === paymentMethodFilter;
    const matchesSearch = !searchQuery || 
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDate && matchesStatus && matchesBranch && matchesMethod && matchesSearch;
  });

  // Prepare chart data based on filtered results
  const prepareChartData = () => {
    const monthlyData = [
      { name: "Jul", billed: 1200000, collected: 1150000, fines: 25000, rebates: 18000 },
      { name: "Aug", billed: 1250000, collected: 1200000, fines: 22000, rebates: 20000 },
      { name: "Sep", billed: 1300000, collected: 1250000, fines: 28000, rebates: 17000 },
      { name: "Oct", billed: 1350000, collected: 1300000, fines: 30000, rebates: 19000 },
      { name: "Nov", billed: 1400000, collected: 1320000, fines: 32000, rebates: 21000 }
    ];

    const branchData = [
      { name: "Kathmandu", billed: 450000, collected: 440000 },
      { name: "Pokhara", billed: 380000, collected: 370000 },
      { name: "Lalitpur", billed: 320000, collected: 310000 },
      { name: "Biratnagar", billed: 280000, collected: 270000 },
      { name: "Dharan", billed: 150000, collected: 145000 }
    ];

    const paymentMethodData = [
      { name: "eSewa", value: 45 },
      { name: "Khalti", value: 30 },
      { name: "ConnectIPS", value: 15 },
      { name: "Cash", value: 10 }
    ];

    return { monthlyData, branchData, paymentMethodData };
  };

  const { monthlyData, branchData, paymentMethodData } = prepareChartData();

  return (
    <div className="min-h-screen p-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Billing Reports</CardTitle>
              <CardDescription>Detailed payment transactions and analytics</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-blue-200">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* FILTERS SECTION - RESTORED */}
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* Date Range Picker */}
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal border-blue-200"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM dd, yyyy")
                    )
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover> */}

            {/* Status Filter */}
            <Select onValueChange={setStatusFilter}>
              <SelectTrigger className="border-blue-200">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="*">All Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Partial">Partial</SelectItem>
              </SelectContent>
            </Select>

            {/* Branch Filter */}
            <Select onValueChange={setBranchFilter}>
              <SelectTrigger className="border-blue-200">
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="*">All Branches</SelectItem>
                <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                <SelectItem value="Pokhara">Pokhara</SelectItem>
                <SelectItem value="Lalitpur">Lalitpur</SelectItem>
                <SelectItem value="Biratnagar">Biratnagar</SelectItem>
              </SelectContent>
            </Select>

            {/* Payment Method Filter */}
            <Select onValueChange={setPaymentMethodFilter}>
              <SelectTrigger className="border-blue-200">
                <SelectValue placeholder="All Methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="*">All Methods</SelectItem>
                <SelectItem value="eSewa">eSewa</SelectItem>
                <SelectItem value="Khalti">Khalti</SelectItem>
                <SelectItem value="ConnectIPS">ConnectIPS</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search invoices..."
                className="pl-10 border-blue-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* CHARTS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Billing Trends</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="billed" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Total Billed"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="collected" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Amount Collected"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Payment Methods Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={["#3b82f6", "#10b981", "#6366f1", "#f59e0b"][index % 4]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Branch Performance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Branch Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={branchData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="billed" 
                    fill="#3b82f6" 
                    name="Total Billed"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar 
                    dataKey="collected" 
                    fill="#10b981" 
                    name="Amount Collected"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Report Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount (Rs)</TableHead>
                  <TableHead>Paid (Rs)</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Adjustment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.customer}</TableCell>
                    <TableCell>{item.amount.toLocaleString()}</TableCell>
                    <TableCell>{item.paid.toLocaleString()}</TableCell>
                    <TableCell>{item.dueDate}</TableCell>
                    <TableCell>{item.paymentDate || "-"}</TableCell>
                    <TableCell>{item.branch}</TableCell>
                    <TableCell>{item.method || "-"}</TableCell>
                    <TableCell>
                      {item.adjustment ? (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.adjustment.type === "fine" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-purple-100 text-purple-800"
                        }`}>
                          {item.adjustment.type === "fine" ? "+" : "-"}{item.adjustment.amount} ({item.adjustment.reason})
                        </span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "Paid" 
                          ? "bg-green-100 text-green-800" 
                          : item.status === "Pending" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-blue-100 text-blue-800"
                      }`}>
                        {item.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}