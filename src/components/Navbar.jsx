import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import AddIncomeSection from "../sections/AddIncomeSection";
import AddExpenseSection from "../sections/AddExpenseSection";

// Icons
const HomeIcon = () => <span style={{ fontSize: "20px" }}>🏠</span>;
const DashboardIcon = () => <span style={{ fontSize: "20px" }}>📊</span>;
const ReportsIcon = () => <span style={{ fontSize: "20px" }}>📈</span>;
const SummaryIcon = () => <span style={{ fontSize: "18px" }}>📋</span>;
const ReportIcon = () => <span style={{ fontSize: "18px" }}>📄</span>;
const DownloadIcon = () => <span style={{ fontSize: "18px" }}>💾</span>;
const IncomeIcon = () => (
  <span style={{ fontSize: "20px", color: "#2e7d32" }}>💰</span>
);
const ExpenseIcon = () => (
  <span style={{ fontSize: "20px", color: "#c62828" }}>💸</span>
);
const ProfileIcon = () => <span style={{ fontSize: "20px" }}>👤</span>;
const LogoutIcon = () => <span style={{ fontSize: "20px" }}>🚪</span>;
const LoginIcon = () => <span style={{ fontSize: "20px" }}>🔑</span>;
const RegisterIcon = () => <span style={{ fontSize: "20px" }}>📝</span>;

function Navbar({ onRegisterClick, onLoginClick, onLogout, isLoggedIn, user }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [reportsMenuAnchor, setReportsMenuAnchor] = useState(null);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [reportResultsOpen, setReportResultsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summaryData, setSummaryData] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [reportFilters, setReportFilters] = useState({
    type: "",
    start_date: "",
    end_date: "",
    download: "",
  });
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleReportsMenuOpen = (event) => {
    setReportsMenuAnchor(event.currentTarget);
  };

  const handleReportsMenuClose = () => {
    setReportsMenuAnchor(null);
  };

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

  // Enhanced API call functions with UI display
  const handleGetSummary = async (period = "monthly") => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_TRANSACTION_URL}/summary?type=${period}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSummaryData({ ...data, period });
      setSummaryDialogOpen(true);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setError("Failed to fetch summary data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async (filters = {}) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("accessToken");

      // Build query parameters
      const queryParams = new URLSearchParams();
      if (filters.type) queryParams.append("type", filters.type);
      if (filters.start_date)
        queryParams.append("start_date", filters.start_date);
      if (filters.end_date) queryParams.append("end_date", filters.end_date);
      if (filters.download) queryParams.append("download", filters.download);

      const url = `${import.meta.env.VITE_API_TRANSACTION_URL}/report${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || ""}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (filters.download === "csv") {
        // Handle CSV download
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `transaction-report-${
          new Date().toISOString().split("T")[0]
        }.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      } else {
        // Handle JSON response and show in modal
        const data = await response.json();
        setReportData(data.data || []);
        setReportResultsOpen(true);
      }
    } catch (error) {
      console.error("Error generating report:", error);
      setError("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async (period = "monthly") => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${import.meta.env.VITE_API_TRANSACTION_URL}/download?type=${period}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token || ""}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `transaction-report-${period}-${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading report:", error);
      setError("Failed to download report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle custom report generation
  const handleCustomReport = () => {
    setReportDialogOpen(true);
    handleReportsMenuClose();
  };

  const handleReportSubmit = () => {
    handleGenerateReport(reportFilters);
    setReportDialogOpen(false);
    setReportFilters({ type: "", start_date: "", end_date: "", download: "" });
  };

  // Refresh homepage after adding income/expense
  const handleAddIncomeSuccess = () => {
    setShowAddIncome(false);
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };

  const handleAddExpenseSuccess = () => {
    setShowAddExpense(false);
    if (window.location.pathname === "/") {
      window.location.reload();
    }
  };

  const mainNavLinks = !isLoggedIn
    ? [
        { label: "Home", action: () => navigate("/"), icon: <HomeIcon /> },
        { label: "Register", action: onRegisterClick, icon: <RegisterIcon /> },
        {
          label: "Login",
          action: onLoginClick,
          icon: <LoginIcon />,
          color: "primary",
        },
      ]
    : [
        { label: "Home", action: () => navigate("/"), icon: <HomeIcon /> },
        {
          label: "Dashboard",
          action: () => navigate("/dashboard"),
          icon: <DashboardIcon />,
        },
        {
          label: "Add Income",
          action: () => setShowAddIncome(true),
          icon: <IncomeIcon />,
          color: "success",
        },
        {
          label: "Add Expense",
          action: () => setShowAddExpense(true),
          icon: <ExpenseIcon />,
          color: "error",
        },
      ];

  const reportsMenuItems = [
    {
      label: "Daily Summary",
      action: () => handleGetSummary("daily"),
      icon: <SummaryIcon />,
      description: "View daily financial summary",
      category: "summaries",
    },
    {
      label: "Monthly Summary",
      action: () => handleGetSummary("monthly"),
      icon: <SummaryIcon />,
      description: "View monthly financial summary",
      category: "summaries",
    },
    {
      label: "Yearly Summary",
      action: () => handleGetSummary("yearly"),
      icon: <SummaryIcon />,
      description: "View yearly financial summary",
      category: "summaries",
    },
    {
      label: "Custom Report",
      action: handleCustomReport,
      icon: <ReportIcon />,
      description: "Generate custom filtered report",
      category: "reports",
    },
    {
      label: "Daily PDF",
      action: () => handleDownloadReport("daily"),
      icon: <DownloadIcon />,
      description: "Download daily report as PDF",
      category: "downloads",
    },
    {
      label: "Monthly PDF",
      action: () => handleDownloadReport("monthly"),
      icon: <DownloadIcon />,
      description: "Download monthly report as PDF",
      category: "downloads",
    },
    {
      label: "Yearly PDF",
      action: () => handleDownloadReport("yearly"),
      icon: <DownloadIcon />,
      description: "Download yearly report as PDF",
      category: "downloads",
    },
  ];

  const profileMenuItems = [
    {
      label: "Profile",
      action: () => navigate("/profile"),
      icon: <ProfileIcon />,
    },
    { label: "Logout", action: onLogout, icon: <LogoutIcon />, color: "error" },
  ];

  // Group reports by category for better organization
  const groupedReports = {
    summaries: reportsMenuItems.filter((item) => item.category === "summaries"),
    reports: reportsMenuItems.filter((item) => item.category === "reports"),
    downloads: reportsMenuItems.filter((item) => item.category === "downloads"),
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "white",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 4 },
            py: 1,
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.5px",
              cursor: "pointer",
              background: "linear-gradient(135deg, #1565c0 0%, #2e7d32 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
            onClick={() => navigate("/")}
          >
            💼 FinanceTracker
          </Typography>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            {mainNavLinks.map((link) => (
              <Button
                key={link.label}
                variant={link.color === "primary" ? "contained" : "text"}
                color={link.color || "inherit"}
                onClick={link.action}
                startIcon={link.icon}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  px: 2.5,
                  py: 1,
                  textTransform: "none",
                  fontSize: "0.9rem",
                  color: link.color ? undefined : "#374151",
                  "&:hover": {
                    bgcolor:
                      link.color === "primary" ? undefined : "rgba(0,0,0,0.04)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                  boxShadow:
                    link.color === "primary"
                      ? "0 4px 12px rgba(21, 101, 192, 0.3)"
                      : "none",
                }}
              >
                {link.label}
              </Button>
            ))}

            {/* Enhanced Reports Dropdown for Desktop */}
            {isLoggedIn && (
              <Box sx={{ ml: 1 }}>
                <Button
                  onClick={handleReportsMenuOpen}
                  startIcon={<ReportsIcon />}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    px: 2.5,
                    py: 1,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    color: "#374151",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.04)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Reports
                </Button>
                <Menu
                  anchorEl={reportsMenuAnchor}
                  open={Boolean(reportsMenuAnchor)}
                  onClose={handleReportsMenuClose}
                  onClick={handleReportsMenuClose}
                  PaperProps={{
                    elevation: 12,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 4px 16px rgba(0,0,0,0.12))",
                      mt: 1.5,
                      minWidth: 420,
                      maxWidth: 480,
                      maxHeight: "85vh", // Limit height to 85% of viewport
                      borderRadius: 3,
                      border: "1px solid #e2e8f0",
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        width: 12,
                        height: 12,
                        bgcolor: "background.paper",
                        transform:
                          "translateX(-50%) translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                        border: "1px solid #e2e8f0",
                        borderBottom: "none",
                        borderRight: "none",
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "left", vertical: "top" }}
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                  // Add scroll behavior for better content visibility
                  MenuListProps={{
                    sx: {
                      maxHeight: "75vh",
                      overflowY: "auto",
                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                        borderRadius: "3px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "#c1c1c1",
                        borderRadius: "3px",
                        "&:hover": {
                          background: "#a8a8a8",
                        },
                      },
                    },
                  }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      px: 3,
                      py: 2.5,
                      background:
                        "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                      borderBottom: "1px solid #e2e8f0",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="#1e293b"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <ReportsIcon />
                      Financial Reports
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Generate summaries and download reports
                    </Typography>
                  </Box>

                  {/* Scrollable Content Container */}
                  <Box sx={{ py: 1 }}>
                    {/* Summaries Section */}
                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="overline"
                        sx={{
                          px: 3,
                          py: 1.5,
                          color: "#64748b",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          display: "block",
                          bgcolor: "#f8fafc",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        📊 Financial Summaries
                      </Typography>
                      {groupedReports.summaries.map((item) => (
                        <MenuItem
                          key={item.label}
                          onClick={item.action}
                          sx={{
                            py: 2,
                            px: 3,
                            mx: 1,
                            mb: 0.5,
                            borderRadius: 2,
                            "&:hover": {
                              bgcolor: "#f1f5f9",
                              transform: "translateX(4px)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {item.icon}
                          </ListItemIcon>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="#374151"
                            >
                              {item.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {item.description}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Box>

                    <Divider sx={{ mx: 2, my: 1 }} />

                    {/* Custom Reports Section */}
                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="overline"
                        sx={{
                          px: 3,
                          py: 1.5,
                          color: "#64748b",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          display: "block",
                          bgcolor: "#f8fafc",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        📄 Custom Reports
                      </Typography>
                      {groupedReports.reports.map((item) => (
                        <MenuItem
                          key={item.label}
                          onClick={item.action}
                          sx={{
                            py: 2,
                            px: 3,
                            mx: 1,
                            mb: 0.5,
                            borderRadius: 2,
                            "&:hover": {
                              bgcolor: "#f1f5f9",
                              transform: "translateX(4px)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {item.icon}
                          </ListItemIcon>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="#374151"
                            >
                              {item.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {item.description}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Box>

                    <Divider sx={{ mx: 2, my: 1 }} />

                    {/* Downloads Section - Enhanced for better visibility */}
                    <Box sx={{ mb: 1 }}>
                      <Typography
                        variant="overline"
                        sx={{
                          px: 3,
                          py: 1.5,
                          color: "#64748b",
                          fontWeight: 700,
                          letterSpacing: "0.5px",
                          display: "block",
                          bgcolor: "#f8fafc",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        💾 PDF Downloads
                      </Typography>
                      {groupedReports.downloads.map((item, index) => (
                        <MenuItem
                          key={item.label}
                          onClick={item.action}
                          sx={{
                            py: 2,
                            px: 3,
                            mx: 1,
                            mb:
                              index === groupedReports.downloads.length - 1
                                ? 1
                                : 0.5,
                            borderRadius: 2,
                            "&:hover": {
                              bgcolor: "#f1f5f9",
                              transform: "translateX(4px)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {item.icon}
                          </ListItemIcon>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="#374151"
                            >
                              {item.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {item.description}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Box>
                  </Box>

                  {/* Footer - Sticky at bottom */}
                  <Box
                    sx={{
                      px: 3,
                      py: 2,
                      background: "#f8fafc",
                      borderTop: "1px solid #e2e8f0",
                      borderRadius: "0 0 12px 12px",
                      position: "sticky",
                      bottom: 0,
                      zIndex: 1,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      💡 Tip: Use custom reports for specific date ranges and
                      filters
                    </Typography>
                  </Box>
                </Menu>
              </Box>
            )}

            {/* Profile Menu for Desktop */}
            {isLoggedIn && (
              <Box sx={{ ml: 2 }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    sx={{
                      p: 0,
                      "&:hover": { transform: "scale(1.05)" },
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "#f1f5f9",
                        color: "#475569",
                        border: "2px solid #e2e8f0",
                        fontSize: "1.2rem",
                      }}
                    >
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClose={handleProfileMenuClose}
                  onClick={handleProfileMenuClose}
                  PaperProps={{
                    elevation: 8,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                      mt: 1.5,
                      minWidth: 180,
                      borderRadius: 2,
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {profileMenuItems.map((item) => (
                    <MenuItem
                      key={item.label}
                      onClick={item.action}
                      sx={{
                        py: 1.5,
                        px: 2,
                        color: item.color === "error" ? "#c62828" : "#374151",
                        "&:hover": {
                          bgcolor:
                            item.color === "error" ? "#ffebee" : "#f8fafc",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {item.icon}
                      </ListItemIcon>
                      <Typography variant="body2" fontWeight={500}>
                        {item.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            sx={{
              display: { lg: "none" },
              color: "#374151",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.04)",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease",
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: 280, sm: 320 },
            bgcolor: "#fafafa",
          },
        }}
      >
        <Box sx={{ p: 3, bgcolor: "white", borderBottom: "1px solid #e2e8f0" }}>
          {isLoggedIn && user ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: "#f1f5f9",
                  color: "#475569",
                  border: "2px solid #e2e8f0",
                  fontSize: "1.5rem",
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight={600} color="#1e293b">
                  {user?.name || "User"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email || "user@example.com"}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="h6" fontWeight={600} color="#1e293b">
              💼 FinanceTracker
            </Typography>
          )}
        </Box>

        <List sx={{ pt: 2 }}>
          {mainNavLinks.map((link, index) => (
            <ListItem
              key={link.label}
              onClick={() => {
                setDrawerOpen(false);
                link.action();
              }}
              sx={{
                py: 1.5,
                px: 3,
                mx: 2,
                mb: 1,
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": {
                  bgcolor:
                    link.color === "primary"
                      ? "rgba(21, 101, 192, 0.08)"
                      : link.color === "success"
                      ? "rgba(46, 125, 50, 0.08)"
                      : link.color === "error"
                      ? "rgba(198, 40, 40, 0.08)"
                      : "rgba(0,0,0,0.04)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                {link.icon}
              </ListItemIcon>
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontWeight: 600,
                  color:
                    link.color === "primary"
                      ? "#1565c0"
                      : link.color === "success"
                      ? "#2e7d32"
                      : link.color === "error"
                      ? "#c62828"
                      : "#374151",
                }}
              />
            </ListItem>
          ))}

          {/* Reports Section for Mobile */}
          {isLoggedIn && (
            <>
              <Divider sx={{ my: 2, mx: 2 }} />
              <Typography
                variant="overline"
                sx={{
                  px: 3,
                  color: "#64748b",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                Reports
              </Typography>
              {reportsMenuItems.map((item) => (
                <ListItem
                  key={item.label}
                  onClick={() => {
                    setDrawerOpen(false);
                    item.action();
                  }}
                  sx={{
                    py: 1.5,
                    px: 3,
                    mx: 2,
                    mb: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "rgba(0,0,0,0.04)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={item.description}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: "#374151",
                    }}
                    secondaryTypographyProps={{
                      fontSize: "0.75rem",
                    }}
                  />
                </ListItem>
              ))}
            </>
          )}

          {isLoggedIn && (
            <>
              <Divider sx={{ my: 2, mx: 2 }} />
              {profileMenuItems.map((item) => (
                <ListItem
                  key={item.label}
                  onClick={() => {
                    setDrawerOpen(false);
                    item.action();
                  }}
                  sx={{
                    py: 1.5,
                    px: 3,
                    mx: 2,
                    mb: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor:
                        item.color === "error"
                          ? "rgba(198, 40, 40, 0.08)"
                          : "rgba(0,0,0,0.04)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: item.color === "error" ? "#c62828" : "#374151",
                    }}
                  />
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Drawer>

      {/* Loading Overlay */}
      {loading && (
        <Dialog open={loading}>
          <DialogContent
            sx={{ display: "flex", alignItems: "center", gap: 2, p: 4 }}
          >
            <CircularProgress size={24} />
            <Typography>Loading...</Typography>
          </DialogContent>
        </Dialog>
      )}

      {/* Error Alert */}
      {error && (
        <Dialog open={!!error} onClose={() => setError("")}>
          <DialogContent>
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          </DialogContent>
        </Dialog>
      )}

      {/* Summary Modal */}
      <Dialog
        open={summaryDialogOpen}
        onClose={() => setSummaryDialogOpen(false)}
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
            {summaryData?.period?.charAt(0).toUpperCase() +
              summaryData?.period?.slice(1)}{" "}
            Summary
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {summaryData && (
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
                        {formatCurrency(summaryData.initialBalance)}
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
                        {formatCurrency(summaryData.totalIncome)}
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
                        {formatCurrency(summaryData.totalExpense)}
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
                        {formatCurrency(summaryData.netChange)}
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
                        {formatCurrency(summaryData.finalBalance)}
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
                        {summaryData.totalTransactions}
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
            onClick={() => setSummaryDialogOpen(false)}
            variant="contained"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Report Results Modal */}
      <Dialog
        open={reportResultsOpen}
        onClose={() => setReportResultsOpen(false)}
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
            Transaction Report ({reportData.length} transactions)
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {reportData.length > 0 ? (
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
                  {reportData.map((transaction, index) => (
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
            onClick={() => setReportResultsOpen(false)}
            variant="contained"
            sx={{ borderRadius: 2, px: 4 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Custom Report Dialog */}
      <Dialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
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
            onClick={() => setReportDialogOpen(false)}
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

      {/* Add Income Modal */}
      <Modal open={showAddIncome} onClose={() => setShowAddIncome(false)}>
        <AddIncomeSection onSuccess={handleAddIncomeSuccess} />
      </Modal>

      {/* Add Expense Modal */}
      <Modal open={showAddExpense} onClose={() => setShowAddExpense(false)}>
        <AddExpenseSection onSuccess={handleAddExpenseSuccess} />
      </Modal>
    </>
  );
}

export default Navbar;