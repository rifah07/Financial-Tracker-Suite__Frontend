import React from "react";
import { Box, Grid, Typography } from "@mui/material";

// Icon Wrapper Component
const IconWrapper = ({ children, bgColor }) => (
  <Box
    className={`${bgColor} rounded-xl flex items-center justify-center`}
    sx={{
      width: { xs: 32, sm: 40, md: 48 },
      height: { xs: 32, sm: 40, md: 48 },
    }}
  >
    {children}
  </Box>
);

// Emoji Icon
const EmojiIcon = ({ icon, color }) => (
  <Typography
    fontWeight="bold"
    sx={{
      fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
      color: color,
    }}
  >
    {icon}
  </Typography>
);

// Card Data
const getStatsData = ({ balance, income, expenses, transactions }) => [
  {
    title: "Current Balance",
    value: `$${balance.toLocaleString()}`,
    subtitle: "Available funds",
    icon: <EmojiIcon icon="💳" color="#fff" />,
    gradient: "from-blue-600 via-purple-600 to-indigo-700",
    isGradient: true,
  },
  {
    title: "Total Income",
    value: `$${income.toLocaleString()}`,
    subtitle: "Total received",
    icon: <EmojiIcon icon="↗" color="#047857" />,
    color: "#047857",
    iconBg: "bg-emerald-100",
    bgColor: "from-emerald-50 to-green-50",
  },
  {
    title: "Total Expenses",
    value: `$${expenses.toLocaleString()}`,
    subtitle: "Total spent",
    icon: <EmojiIcon icon="↘" color="#dc2626" />,
    color: "#dc2626",
    iconBg: "bg-red-100",
    bgColor: "from-red-50 to-rose-50",
  },
  {
    title: "Transactions",
    value: `${transactions}`,
    subtitle: "Total count",
    icon: <EmojiIcon icon="📊" color="#2563eb" />,
    color: "#2563eb",
    iconBg: "bg-blue-100",
    bgColor: "from-blue-50 to-indigo-50",
  },
];

const StatsCards = ({ transactions = [], user = { balance: 5420.5 } }) => {
  const getTxType = (tx) =>
    tx?.transaction_type?.toLowerCase() || tx?.type?.toLowerCase() || "income";
  const getTxAmount = (tx) => Math.abs(Number(tx.amount) || 0);

  const totalIncome = transactions
    .filter((tx) => getTxType(tx) === "income")
    .reduce((sum, tx) => sum + getTxAmount(tx), 0);

  const totalExpenses = transactions
    .filter((tx) => getTxType(tx) === "expense")
    .reduce((sum, tx) => sum + getTxAmount(tx), 0);

  const stats = getStatsData({
    balance: user?.balance || 0,
    income: totalIncome,
    expenses: totalExpenses,
    transactions: transactions.length,
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "70%", sm: "90%", md: "100%" },
        mx: { xs: "1%", sm: "auto", md: "auto" },
        px: { xs: 1, sm: 2, md: 3 },
        py: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 4, md: 4 }}>
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={3} md={3} key={i}>
            <Box
              className={`rounded-2xl overflow-hidden relative border ${
                stat.isGradient
                  ? `bg-gradient-to-br ${stat.gradient} text-white border-white/20`
                  : `bg-gradient-to-br ${stat.bgColor} border-slate-200/50`
              }`}
              sx={{
                p: { xs: 2, sm: 4, md: 4 },
                minHeight: { xs: 130, sm: 150, md: 180 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Blurred Background Bubbles */}
              <Box
                className="absolute top-0 right-0 rounded-full blur-2xl"
                sx={{
                  width: { xs: 36, sm: 48 },
                  height: { xs: 36, sm: 48 },
                  background: stat.isGradient
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.03)",
                  transform: "translate(30%, -30%)",
                }}
              />
              <Box
                className="absolute bottom-0 left-0 rounded-full blur-2xl"
                sx={{
                  width: { xs: 32, sm: 44 },
                  height: { xs: 32, sm: 44 },
                  background: stat.isGradient
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  transform: "translate(-30%, 30%)",
                }}
              />

              <Box className="relative z-10">
                <Box className="flex items-center gap-3 mb-2">
                  <IconWrapper bgColor={stat.iconBg || "bg-white/20"}>
                    {stat.icon}
                  </IconWrapper>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: stat.isGradient ? "white" : "#334155",
                      fontSize: { xs: "0.85rem", sm: "0.95rem" },
                      fontWeight: 600,
                    }}
                  >
                    {stat.title}
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                    color: stat.isGradient ? "#fff" : stat.color,
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    color: stat.isGradient
                      ? "rgba(255,255,255,0.7)"
                      : "#64748b",
                  }}
                >
                  {stat.subtitle}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsCards;
