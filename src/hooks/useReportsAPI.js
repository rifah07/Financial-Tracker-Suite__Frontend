import { useState } from "react";

export function useReportsAPI(setLoading, setError) {
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [reportResultsOpen, setReportResultsOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [reportData, setReportData] = useState([]);

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

      console.log("Calling API with URL:", url); // Debug log
      console.log("Filters:", filters); // Debug log

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
        console.log("Report data received:", data); // Debug log
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

  const handleCustomReport = () => {
    setReportDialogOpen(true);
  };

  return {
    handleGetSummary,
    handleGenerateReport,
    handleDownloadReport,
    handleCustomReport,
    summaryDialogOpen,
    setSummaryDialogOpen,
    reportResultsOpen,
    setReportResultsOpen,
    reportDialogOpen,
    setReportDialogOpen,
    summaryData,
    reportData,
    setReportData,
  };
}
