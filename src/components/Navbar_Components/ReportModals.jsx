import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

function ReportModals({ reportsAPI }) {
  const [reportFilters, setReportFilters] = useState({
    type: "",
    start_date: "",
    end_date: "",
    download: "",
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleReportSubmit = () => {
    reportsAPI.handleGenerateReport(reportFilters);
    reportsAPI.setReportDialogOpen(false);
    setReportFilters({ type: "", start_date: "", end_date: "", download: "" });
  };

  return (
    <>
      {/* Summary Modal */}
      <Dialog
        open={reportsAPI.summaryDialogOpen}
        onClose={() => reportsAPI.setSummaryDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #1565c0 0%, #2e7d32 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {reportsAPI.summaryData?.period?.charAt(0).toUpperCase() +
              reportsAPI.summaryData?.period?.slice(1)}{" "}
            Summary
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {reportsAPI.summaryData && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      background:
                        "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Typography variant="h6" color="#1565c0" fontWeight={600}>
                        Initial Balance
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="#1565c0">
                        {formatCurrency(reportsAPI.summaryData.initialBalance)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      background:
                        "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Typography variant="h6" color="#2e7d32" fontWeight={600}>
                        Total Income
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="#2e7d32">
                        {formatCurrency(reportsAPI.summaryData.totalIncome)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      background:
                        "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Typography variant="h6" color="#c62828" fontWeight={600}>
                        Total Expense
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="#c62828">
                        {formatCurrency(reportsAPI.summaryData.totalExpense)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      background:
                        "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Typography variant="h6" color="#7b1fa2" fontWeight={600}>
                        Net Change
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="#7b1fa2">
                        {formatCurrency(reportsAPI.summaryData.netChange)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      background:
                        "linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Typography variant="h6" color="#00695c" fontWeight={600}>
                        Final Balance
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="#00695c">
                        {formatCurrency(reportsAPI.summaryData.finalBalance)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      background:
                        "linear-gradient(135deg, #fff3e0 0%, #ffcc02 100%)",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 3 }}>
                      <Typography variant="h6" color="#e65100" fontWeight={600}>
                        Transactions
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="#e65100">
                        {reportsAPI.summaryData.totalTransactions}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => reportsAPI.setSummaryDialogOpen(false)}
            variant="contained"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Report Results Modal */}
      <Dialog
        open={reportsAPI.reportResultsOpen}
        onClose={() => reportsAPI.setReportResultsOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #1565c0 0%, #2e7d32 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Transaction Report ({reportsAPI.reportData.length} transactions)
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {reportsAPI.reportData.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc" }}>
                      Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc" }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: "#f8fafc" }}>
                      Type
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        bgcolor: "#f8fafc",
                        textAlign: "right",
                      }}
                    >
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportsAPI.reportData.map((transaction, index) => (
                    <TableRow
                      key={transaction._id || index}
                      sx={{
                        "&:hover": { bgcolor: "#f8fafc" },
                        "&:nth-of-type(even)": { bgcolor: "rgba(0,0,0,0.02)" },
                      }}
                    >
                      <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                      <TableCell>
                        {transaction.remarks ||
                          transaction.description ||
                          "Transaction"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.transaction_type || "income"}
                          size="small"
                          sx={{
                            textTransform: "capitalize",
                            bgcolor:
                              transaction.transaction_type === "expense"
                                ? "#ffebee"
                                : "#e8f5e8",
                            color:
                              transaction.transaction_type === "expense"
                                ? "#c62828"
                                : "#2e7d32",
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "right", fontWeight: 600 }}>
                        <Typography
                          variant="body2"
                          color={
                            transaction.transaction_type === "expense"
                              ? "#c62828"
                              : "#2e7d32"
                          }
                          fontWeight={700}
                        >
                          {transaction.transaction_type === "expense"
                            ? "-"
                            : "+"}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No transactions found for the selected criteria
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => reportsAPI.setReportResultsOpen(false)}
            variant="contained"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Custom Report Dialog */}
      <Dialog
        open={reportsAPI.reportDialogOpen}
        onClose={() => reportsAPI.setReportDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #1565c0 0%, #2e7d32 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          Generate Custom Report
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Transaction Type</InputLabel>
              <Select
                value={reportFilters.type}
                label="Transaction Type"
                onChange={(e) =>
                  setReportFilters({ ...reportFilters, type: e.target.value })
                }
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Start Date"
              type="date"
              value={reportFilters.start_date}
              onChange={(e) =>
                setReportFilters({
                  ...reportFilters,
                  start_date: e.target.value,
                })
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="End Date"
              type="date"
              value={reportFilters.end_date}
              onChange={(e) =>
                setReportFilters({ ...reportFilters, end_date: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Download Format</InputLabel>
              <Select
                value={reportFilters.download}
                label="Download Format"
                onChange={(e) =>
                  setReportFilters({
                    ...reportFilters,
                    download: e.target.value,
                  })
                }
              >
                <MenuItem value="">View in Modal</MenuItem>
                <MenuItem value="csv">Download CSV</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => reportsAPI.setReportDialogOpen(false)}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleReportSubmit}
            variant="contained"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Generate Report
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ReportModals;