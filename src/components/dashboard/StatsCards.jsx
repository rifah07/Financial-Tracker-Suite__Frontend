import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const TrendingUpIcon = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: { xs: 36, sm: 40 },
      height: { xs: 36, sm: 40 },
      borderRadius: "50%",
      background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
      color: "#2e7d32",
      fontSize: { xs: "16px", sm: "20px" },
      fontWeight: "bold",
    }}
  >
    ↗
  </Box>
);

const TrendingDownIcon = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: { xs: 36, sm: 40 },
      height: { xs: 36, sm: 40 },
      borderRadius: "50%",
      background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
      color: "#c62828",
      fontSize: { xs: "16px", sm: "20px" },
      fontWeight: "bold",
    }}
  >
    ↘
  </Box>
);

function StatsCards({ transactions, user }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getTxType = (tx) => {
    if (tx.transaction_type) return tx.transaction_type.toLowerCase();
    if (tx.type) return tx.type.toLowerCase();
    if (typeof tx.amount === "number")
      return tx.amount >= 0 ? "income" : "expense";
    return "income";
  };

  const getTxAmount = (tx) => Math.abs(Number(tx.amount) || 0);

  const totalIncome = transactions
    .filter((tx) => getTxType(tx) === "income")
    .reduce((sum, tx) => sum + getTxAmount(tx), 0);

  const totalExpenses = transactions
    .filter((tx) => getTxType(tx) === "expense")
    .reduce((sum, tx) => sum + getTxAmount(tx), 0);

  const statsData = [
    {
      title: "Current Balance",
      value: formatCurrency(user?.balance || 0),
      subtitle: "Available funds",
      icon: "💳",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      isGradient: true,
    },
    {
      title: "Total Income",
      value: formatCurrency(totalIncome),
      subtitle: "Total Income",
      icon: <TrendingUpIcon />,
      color: "#2e7d32",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      subtitle: "Total Expenses",
      icon: <TrendingDownIcon />,
      color: "#c62828",
    },
    {
      title: "Total Transactions",
      value: transactions.length,
      subtitle: "Total Transactions",
      icon: "📊",
      color: "#1565c0",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4, lg: 5 },
        mb: { xs: 3, md: 4 },
      }}
    >
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card
              sx={{
                height: { xs: 140, sm: 160, md: 140 },
                borderRadius: 3,
                boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
                border: "1px solid #e2e8f0",
                background: stat.isGradient ? stat.gradient : "white",
                color: stat.isGradient ? "white" : "inherit",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: stat.isGradient ? "left" : "center",
                }}
              >
                {stat.isGradient ? (
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: { xs: 32, sm: 36 },
                        width: { xs: 32, sm: 36 },
                        borderRadius: "10px",
                        bgcolor: "rgba(255,255,255,0.2)",
                        fontSize: { xs: "16px", sm: "18px" },
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        ml: 2,
                        fontWeight: 600,
                        color: "white",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}
                    >
                      {stat.title}
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 1 }}
                  >
                    {typeof stat.icon === "string" ? (
                      <Box
                        sx={{
                          width: { xs: 32, sm: 36 },
                          height: { xs: 32, sm: 36 },
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: { xs: "16px", sm: "18px" },
                          color: stat.color,
                        }}
                      >
                        {stat.icon}
                      </Box>
                    ) : (
                      stat.icon
                    )}
                  </Box>
                )}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: stat.isGradient ? "white" : stat.color,
                    fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: stat.isGradient
                      ? "rgba(255,255,255,0.8)"
                      : "text.secondary",
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  {stat.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default StatsCards;