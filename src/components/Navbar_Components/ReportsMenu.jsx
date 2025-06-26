import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ReportsIcon = () => <span style={{ fontSize: "20px" }}>📈</span>;
const SummaryIcon = () => <span style={{ fontSize: "18px" }}>📋</span>;
const ReportIcon = () => <span style={{ fontSize: "18px" }}>📄</span>;
const DownloadIcon = () => <span style={{ fontSize: "18px" }}>💾</span>;

function ReportsMenu({ reportsAPI }) {
  const [reportsMenuAnchor, setReportsMenuAnchor] = useState(null);

  const handleReportsMenuOpen = (event) => {
    setReportsMenuAnchor(event.currentTarget);
  };

  const handleReportsMenuClose = () => {
    setReportsMenuAnchor(null);
  };

  const reportsMenuItems = [
    {
      label: "Daily Summary",
      action: () => reportsAPI.handleGetSummary("daily"),
      icon: <SummaryIcon />,
      description: "View daily financial summary",
      category: "summaries",
    },
    {
      label: "Monthly Summary",
      action: () => reportsAPI.handleGetSummary("monthly"),
      icon: <SummaryIcon />,
      description: "View monthly financial summary",
      category: "summaries",
    },
    {
      label: "Yearly Summary",
      action: () => reportsAPI.handleGetSummary("yearly"),
      icon: <SummaryIcon />,
      description: "View yearly financial summary",
      category: "summaries",
    },
    {
      label: "Custom Report",
      action: reportsAPI.handleCustomReport,
      icon: <ReportIcon />,
      description: "Generate custom filtered report",
      category: "reports",
    },
    {
      label: "Daily PDF",
      action: () => reportsAPI.handleDownloadReport("daily"),
      icon: <DownloadIcon />,
      description: "Download daily report as PDF",
      category: "downloads",
    },
    {
      label: "Monthly PDF",
      action: () => reportsAPI.handleDownloadReport("monthly"),
      icon: <DownloadIcon />,
      description: "Download monthly report as PDF",
      category: "downloads",
    },
    {
      label: "Yearly PDF",
      action: () => reportsAPI.handleDownloadReport("yearly"),
      icon: <DownloadIcon />,
      description: "Download yearly report as PDF",
      category: "downloads",
    },
  ];

  const groupedReports = {
    summaries: reportsMenuItems.filter((item) => item.category === "summaries"),
    reports: reportsMenuItems.filter((item) => item.category === "reports"),
    downloads: reportsMenuItems.filter((item) => item.category === "downloads"),
  };

  return (
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
            maxHeight: "85vh",
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
              transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
              zIndex: 0,
              border: "1px solid #e2e8f0",
              borderBottom: "none",
              borderRight: "none",
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
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
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
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
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Generate summaries and download reports
          </Typography>
        </Box>

        {/* Content sections */}
        <Box sx={{ py: 1 }}>
          {Object.entries(groupedReports).map(([category, items], index) => (
            <Box key={category}>
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
                {category === "summaries" && "📊 Financial Summaries"}
                {category === "reports" && "📄 Custom Reports"}
                {category === "downloads" && "💾 PDF Downloads"}
              </Typography>
              {items.map((item, itemIndex) => (
                <MenuItem
                  key={item.label}
                  onClick={item.action}
                  sx={{
                    py: 2,
                    px: 3,
                    mx: 1,
                    mb: itemIndex === items.length - 1 ? 1 : 0.5,
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: "#f1f5f9",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="#374151"
                    >
                      {item.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
              {index < Object.keys(groupedReports).length - 1 && (
                <Divider sx={{ mx: 2, my: 1 }} />
              )}
            </Box>
          ))}
        </Box>

        {/* Footer */}
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
            💡 Tip: Use custom reports for specific date ranges and filters
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
}

export default ReportsMenu;
