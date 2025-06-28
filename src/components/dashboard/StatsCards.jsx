import React from "react";

// Custom icon components
const TrendingUpIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center text-emerald-600 font-bold text-lg">
    ↗
  </div>
);

const TrendingDownIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center text-red-600 font-bold text-lg">
    ↘
  </div>
);

const CreditCardIcon = () => (
  <div className="w-5 h-5 flex items-center justify-center text-white text-lg">
    💳
  </div>
);

const BarChartIcon = () => (
  <div className="w-6 h-6 flex items-center justify-center text-blue-600 text-lg">
    📊
  </div>
);

function StatsCards({ transactions = [], user = { balance: 5420.5 } }) {
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
      icon: CreditCardIcon,
      gradient: "from-blue-600 via-purple-600 to-indigo-700",
      isGradient: true,
      bgPattern: "from-blue-500/10 to-purple-500/10",
    },
    {
      title: "Total Income",
      value: formatCurrency(totalIncome),
      subtitle: "Total Income",
      icon: TrendingUpIcon,
      color: "text-emerald-600",
      bgColor: "from-emerald-50 to-green-50",
      iconBg: "bg-emerald-100",
      borderColor: "border-emerald-200/50",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      subtitle: "Total Expenses",
      icon: TrendingDownIcon,
      color: "text-red-600",
      bgColor: "from-red-50 to-rose-50",
      iconBg: "bg-red-100",
      borderColor: "border-red-200/50",
    },
    {
      title: "Total Transactions",
      value: transactions.length,
      subtitle: "Total Transactions",
      icon: BarChartIcon,
      color: "text-blue-600",
      bgColor: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      borderColor: "border-blue-200/50",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;

          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${
                stat.isGradient
                  ? "bg-gradient-to-br " +
                    stat.gradient +
                    " text-white border-white/20"
                  : "bg-gradient-to-br " +
                    stat.bgColor +
                    " border-slate-200/50 " +
                    stat.borderColor
              }`}
            >
              {/* Background decorative elements */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 ${
                  stat.isGradient
                    ? "bg-white/10"
                    : "bg-gradient-to-br " + stat.bgPattern
                } rounded-full blur-2xl transform translate-x-10 -translate-y-10`}
              ></div>
              <div
                className={`absolute bottom-0 left-0 w-16 h-16 ${
                  stat.isGradient
                    ? "bg-white/5"
                    : "bg-gradient-to-tr " + stat.bgPattern
                } rounded-full blur-2xl transform -translate-x-8 translate-y-8`}
              ></div>

              <div className="relative z-10 p-6">
                {stat.isGradient ? (
                  // Gradient card layout (Current Balance)
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <IconComponent />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white/90 mb-1">
                          {stat.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular card layout
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent />
                    </div>
                  </div>
                )}

                <div className={stat.isGradient ? "text-left" : "text-center"}>
                  <div
                    className={`text-2xl sm:text-3xl font-bold mb-1 ${
                      stat.isGradient ? "text-white" : stat.color
                    }`}
                  >
                    {stat.value}
                  </div>
                  <p
                    className={`text-sm ${
                      stat.isGradient ? "text-white/80" : "text-slate-600"
                    }`}
                  >
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatsCards;