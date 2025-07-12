"use client";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    Activity,
    Users,
    Home,
    Zap,
    CreditCard,
    FileText,
    AlertCircle,
    Clock,
    CalendarCheck,
    CircleDollarSign,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function Dashboard() {
    // Dummy data with fines and rebates
    const metrics = {
        totalRevenue: 1258000,
        activeCustomers: 1245,
        pendingPayments: 23,
        collectedThisMonth: 284500,
        finesCollected: 12500,
        rebatesGiven: 8500,
        paymentDistribution: [
            { name: "eSewa", value: 45 },
            { name: "Khalti", value: 30 },
            { name: "ConnectIPS", value: 15 },
            { name: "Cash", value: 10 },
        ],
        recentTransactions: [
            {
                id: "PAY-1001",
                customer: "Ram Sharma",
                amount: 4500,
                method: "eSewa",
                status: "Paid",
                date: "2023-11-15",
                dueDate: "2023-11-20",
                adjustment: {
                    type: "rebate",
                    amount: 150,
                    reason: "Early payment",
                },
            },
            {
                id: "PAY-1002",
                customer: "Sita Gurung",
                amount: 3800,
                method: "Khalti",
                status: "Paid",
                date: "2023-11-14",
                dueDate: "2023-11-18",
                adjustment: {
                    type: "rebate",
                    amount: 100,
                    reason: "Early payment",
                },
            },
            {
                id: "PAY-1003",
                customer: "Hari Pandey",
                amount: 5200,
                method: "ConnectIPS",
                status: "Paid",
                date: "2023-11-17",
                dueDate: "2023-11-15",
                adjustment: {
                    type: "fine",
                    amount: 250,
                    reason: "Late payment",
                },
            },
        ],
        monthlyTrends: {
            payments: [284500, 275000, 302500, 310000],
            fines: [12500, 11800, 14200, 15600],
            rebates: [8500, 9200, 7800, 8100],
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-blue-800">
                        NEA Billing System
                    </h1>
                    <p className="text-sm text-gray-500">Dashboard Overview</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="border-blue-200">
                        <CalendarCheck className="h-4 w-4 mr-2" />
                        {new Date().toLocaleDateString()}
                    </Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="border-blue-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-blue-700 flex items-center">
                            <CircleDollarSign className="h-4 w-4 mr-2" />
                            Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            Rs {metrics.totalRevenue.toLocaleString()}
                        </div>
                        <Progress value={75} className="h-2 mt-2 bg-blue-100" />
                    </CardContent>
                </Card>

                <Card className="border-green-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-green-700 flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Active Customers
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {metrics.activeCustomers.toLocaleString()}
                        </div>
                        <Progress
                            value={82}
                            className="h-2 mt-2 bg-green-100"
                        />
                    </CardContent>
                </Card>

                <Card className="border-yellow-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-yellow-700 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Fines Collected
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            Rs {metrics.finesCollected.toLocaleString()}
                        </div>
                        <Progress
                            value={18}
                            className="h-2 mt-2 bg-yellow-100"
                        />
                    </CardContent>
                </Card>

                <Card className="border-purple-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-purple-700 flex items-center">
                            <TrendingDown className="h-4 w-4 mr-2" />
                            Rebates Given
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            Rs {metrics.rebatesGiven.toLocaleString()}
                        </div>
                        <Progress
                            value={12}
                            className="h-2 mt-2 bg-purple-100"
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Payment Trends */}
                <Card className="lg:col-span-2 border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Activity className="h-5 w-5 mr-2 text-blue-600" />
                            Payment Trends
                        </CardTitle>
                        <CardDescription>
                            Last 4 months collection
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={metrics.monthlyTrends.payments.map(
                                    (amt, idx) => ({
                                        name: `Month ${idx + 1}`,
                                        Payments: amt,
                                        Fines: metrics.monthlyTrends.fines[idx],
                                        Rebates:
                                            metrics.monthlyTrends.rebates[idx],
                                    })
                                )}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                />
                                <XAxis dataKey="name" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        border: "1px solid #e2e8f0",
                                        borderRadius: "0.375rem",
                                    }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="Payments"
                                    fill="#3b82f6"
                                    radius={[4, 4, 0, 0]}
                                    name="Total Payments"
                                />
                                <Bar
                                    dataKey="Fines"
                                    fill="#f59e0b"
                                    radius={[4, 4, 0, 0]}
                                    name="Late Payment Fines"
                                />
                                <Bar
                                    dataKey="Rebates"
                                    fill="#10b981"
                                    radius={[4, 4, 0, 0]}
                                    name="Early Payment Rebates"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                            Payment Methods
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {metrics.paymentDistribution.map((method) => (
                                <div
                                    key={method.name}
                                    className="flex items-center"
                                >
                                    <div className="w-24 font-medium">
                                        {method.name}
                                    </div>
                                    <Progress
                                        value={method.value}
                                        className="h-2 flex-1"
                                    />
                                    <div className="w-12 text-right text-sm text-gray-500">
                                        {method.value}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="mt-6 border-0 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-blue-600" />
                        Recent Transactions
                    </CardTitle>
                    <CardDescription>
                        Last 15 payments with adjustments
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Payment ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Adjustment</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {metrics.recentTransactions.map((txn) => (
                                <TableRow key={txn.id}>
                                    <TableCell>{txn.id}</TableCell>
                                    <TableCell>{txn.customer}</TableCell>
                                    <TableCell>
                                        Rs {txn.amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell>{txn.method}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            {new Date(txn.date) >
                                            new Date(txn.dueDate) ? (
                                                <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                                            ) : (
                                                <CalendarCheck className="h-4 w-4 mr-1 text-green-500" />
                                            )}
                                            {txn.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {txn.adjustment ? (
                                            <Badge
                                                variant={
                                                    txn.adjustment.type ===
                                                    "fine"
                                                        ? "destructive"
                                                        : "default"
                                                }
                                                className="flex items-center"
                                            >
                                                {txn.adjustment.type ===
                                                "fine" ? (
                                                    <TrendingUp className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <TrendingDown className="h-3 w-3 mr-1" />
                                                )}
                                                Rs {txn.adjustment.amount} (
                                                {txn.adjustment.reason})
                                            </Badge>
                                        ) : (
                                            <span className="text-gray-400">
                                                None
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                txn.status === "Paid"
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {txn.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                    Generate Monthly Report
                </Button>
                <Button variant="outline" className="border-blue-200">
                    View All Fines
                </Button>
                <Button variant="outline" className="border-green-200">
                    View All Rebates
                </Button>
                <Button variant="outline" className="border-purple-200">
                    Configure Fine/Rebate Rules
                </Button>
            </div>
        </div>
    );
}
