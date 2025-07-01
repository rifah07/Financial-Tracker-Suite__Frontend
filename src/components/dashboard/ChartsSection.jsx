import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ChartsSection({ transactions = [] }) {
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
  const getTxDescription = (tx) => tx.remarks || tx.description || "Other";

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
      const description = getTxDescription(tx);
      const key = `${description}`;

      if (!categories[key]) {
        categories[key] = {
          name: description,
          income: 0,
          expenses: 0,
        };
      }

      const amount = getTxAmount(tx);
      if (type === "income") {
        categories[key].income += amount;
      } else {
        categories[key].expenses += amount;
      }
    });

    return Object.values(categories)
      .map((cat) => ({
        ...cat,
        total: cat.income + cat.expenses,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);
  };

  const monthlyData = generateMonthlyData(transactions);
  const categoryData = generateCategoryData(transactions);

  const totalIncome = categoryData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = categoryData.reduce(
    (sum, item) => sum + item.expenses,
    0
  );
  const grandTotal = totalIncome + totalExpenses;

  const incomePercent = grandTotal
    ? ((totalIncome / grandTotal) * 100).toFixed(1)
    : 0;
  const expensePercent = grandTotal
    ? ((totalExpenses / grandTotal) * 100).toFixed(1)
    : 0;

  return (
    <div className="w-full max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl -mx-2 sm:mx-1 md:mx-2 my-4 px-4 sm:px-5 lg:px-4 mb-6 sm:mb-8">
      {/* Monthly Income vs Expenses Chart */}
      <div className="mb-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-blue-50/20 rounded-3xl shadow-xl border border-slate-200/50 backdrop-blur-sm h-96 lg:h-[420px]">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-100/40 to-blue-100/40 rounded-full blur-3xl transform -translate-x-12 translate-y-12"></div>

          <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <div className="text-white text-lg font-bold">📈</div>
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                    Monthly Income vs Expenses
                  </h3>
                  <p className="text-sm text-slate-600">
                    Financial overview for the last 6 months
                  </p>
                </div>
              </div>
            </div>

            {/* Chart Container */}
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="incomeGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="expenseGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#ef4444"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="month"
                    stroke="#64748b"
                    fontSize={12}
                    tick={{ fill: "#64748b" }}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => `$${value}`}
                    tick={{ fill: "#64748b" }}
                  />
                  <Tooltip
                    formatter={(value) => [formatCurrency(value), ""]}
                    labelStyle={{ color: "#1e293b", fontWeight: "600" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      fontSize: "14px",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="circle"
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#incomeGradient)"
                    name="Income"
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    activeDot={{
                      r: 6,
                      stroke: "#10b981",
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={3}
                    fill="url(#expenseGradient)"
                    name="Expenses"
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                    activeDot={{
                      r: 6,
                      stroke: "#ef4444",
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Chart */}
      <div className="mb-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/20 rounded-3xl shadow-xl border border-slate-200/50 backdrop-blur-sm h-[460px] lg:h-[540px] pb-4">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-purple-100/40 to-indigo-100/40 rounded-full blur-3xl transform translate-x-14 -translate-y-14"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-100/40 to-purple-100/40 rounded-full blur-3xl transform -translate-x-10 translate-y-10"></div>

          <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <div className="text-white text-lg font-bold">🎯</div>
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                    Category Breakdown
                  </h3>
                  <p className="text-sm text-slate-600">
                    Income and expenses by transaction type
                  </p>
                </div>
              </div>
            </div>

            {/* Chart Container */}
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={12}
                    tick={{ fill: "#64748b" }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => `$${value}`}
                    tick={{ fill: "#64748b" }}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      formatCurrency(value),
                      name.charAt(0).toUpperCase() + name.slice(1),
                    ]}
                    labelStyle={{ color: "#1e293b", fontWeight: "600" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      fontSize: "14px",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="income"
                    fill="#10b981"
                    name="Income"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="expenses"
                    fill="#ef4444"
                    name="Expenses"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>

              <div className="w-full xs:w-[90%] sm:w-[80%] mt-1 xs:mt-1 mb-2 xs:mb-4 xs:pb-10 text-center text-xs xs:text-sm sm:text-base text-slate-600 overflow-hidden mx-auto">
                <p>
                  <span className="text-green-600 font-medium">
                    Income: {incomePercent}%
                  </span>{" "}
                  |{" "}
                  <span className="text-red-600 font-medium">
                    Expenses: {expensePercent}%
                  </span>{" "}
                  of all transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartsSection;
