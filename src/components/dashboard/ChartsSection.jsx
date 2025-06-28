import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ChartsSection({ transactions }) {
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

  const generateMonthlyData = (transactions) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const monthlyStats = {};
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const monthName = months[monthIndex];
      monthlyStats[monthName] = { income: 0, expenses: 0, month: monthName };
    }
    transactions.forEach((tx) => {
      const txDate = new Date(tx.createdAt);
      const monthName = months[txDate.getMonth()];
      if (monthlyStats[monthName]) {
        const amount = getTxAmount(tx);
        if (getTxType(tx) === "income") {
          monthlyStats[monthName].income += amount;
        } else {
          monthlyStats[monthName].expenses += amount;
        }
      }
    });
    return Object.values(monthlyStats);
  };

  const generateCategoryData = (transactions) => {
    const categories = {};
    transactions.forEach((tx) => {
      const type = getTxType(tx);
      const category = tx.category || type;
      if (!categories[category]) {
        categories[category] = { name: category, value: 0, type };
      }
      categories[category].value += getTxAmount(tx);
    });
    return Object.values(categories).slice(0, 6);
  };

  const monthlyData = generateMonthlyData(transactions);
  const categoryData = generateCategoryData(transactions);
  const COLORS = [
    "#1565c0",
    "#2e7d32",
    "#c62828",
    "#ff9800",
    "#9c27b0",
    "#00bcd4",
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
        {/* Monthly Income vs Expenses Chart */}
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0",
              height: { xs: 300, sm: 350, md: 380 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2, sm: 3 },
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  color: "#1e293b",
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                Monthly Income vs Expenses
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                }}
              >
                Financial overview for the last 6 months
              </Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#64748b"
                      fontSize={window.innerWidth < 600 ? 10 : 12}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={window.innerWidth < 600 ? 10 : 12}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      formatter={(value) => [formatCurrency(value), ""]}
                      labelStyle={{ color: "#1e293b" }}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        fontSize: window.innerWidth < 600 ? "12px" : "14px",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="income"
                      stackId="1"
                      stroke="#2e7d32"
                      fill="#2e7d32"
                      fillOpacity={0.6}
                      name="Income"
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stackId="2"
                      stroke="#c62828"
                      fill="#c62828"
                      fillOpacity={0.6}
                      name="Expenses"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Category Breakdown Chart */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0",
              height: { xs: 300, sm: 350, md: 380 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{
                p: { xs: 2, sm: 3 },
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 1,
                  fontWeight: 600,
                  color: "#1e293b",
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                Category Breakdown
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  fontSize: { xs: "0.8rem", sm: "0.875rem" },
                }}
              >
                Distribution by category
              </Typography>
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={window.innerWidth < 600 ? 60 : 70}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        window.innerWidth < 600
                          ? `${(percent * 100).toFixed(0)}%`
                          : `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [formatCurrency(value), "Amount"]}
                      contentStyle={{
                        fontSize: window.innerWidth < 600 ? "12px" : "14px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChartsSection;