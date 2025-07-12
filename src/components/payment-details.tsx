"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function PaymentDetails({ payment, open, onOpenChange }: {
  payment: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-blue-100 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-blue-800">Payment Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-blue-700 mb-2">Customer Information</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Customer ID</TableCell>
                  <TableCell>{payment.customerId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  <TableCell>{payment.customerName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Branch</TableCell>
                  <TableCell>{payment.branch}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="font-medium text-blue-700 mb-2">Payment Information</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Bill Number</TableCell>
                  <TableCell>{payment.billNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Amount</TableCell>
                  <TableCell>Rs {payment.amount.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Paid Amount</TableCell>
                  <TableCell>Rs {payment.paidAmount.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Status</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                      payment.status === "Paid" ? "bg-green-100 text-green-600 border-green-600" :
                      payment.status === "Pending" ? "bg-yellow-100 text-yellow-600 border-yellow-600" :
                      "bg-blue-100 text-blue-600 border-blue-600"
                    }`}>
                      {payment.status}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" className="border-blue-200" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {payment.status === "Pending" && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              Record Payment
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}