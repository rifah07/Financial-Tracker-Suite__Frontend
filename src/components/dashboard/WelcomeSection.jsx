import React from "react";

// Custom icon components - mobile optimized
const TrendingUpIcon = () => (
  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-emerald-600 font-bold text-base sm:text-lg">
    ↗
  </div>
);
const TrendingDownIcon = () => (
  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-red-600 font-bold text-base sm:text-lg">
    ↘
  </div>
);
const CreditCardIcon = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-white text-sm sm:text-base">
    💳
  </div>
);
const BarChartIcon = () => (
  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-blue-600 text-base sm:text-lg">
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
      title: "Balance",
      value: formatCurrency(user?.balance || 0),
      subtitle: "Available funds",
      icon: CreditCardIcon,
      gradient: "from-blue-600 via-purple-600 to-indigo-700",
      isGradient: true,
      bgPattern: "from-blue-500/10 to-purple-500/10",
    },
    {
      title: "Income",
      value: formatCurrency(totalIncome),
      subtitle: "Total Income",
      icon: TrendingUpIcon,
      color: "text-emerald-600",
      bgColor: "from-emerald-50 to-green-50",
      iconBg: "bg-emerald-100",
      borderColor: "border-emerald-200/50",
    },
    {
      title: "Expenses",
      value: formatCurrency(totalExpenses),
      subtitle: "Total Expenses",
      icon: TrendingDownIcon,
      color: "text-red-600",
      bgColor: "from-red-50 to-rose-50",
      iconBg: "bg-red-100",
      borderColor: "border-red-200/50",
    },
    {
      title: "Transactions",
      value: transactions.length,
      subtitle: "Total Count",
      icon: BarChartIcon,
      color: "text-blue-600",
      bgColor: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      borderColor: "border-blue-200/50",
    },
  ];

  return (
    <div className="w-full px-1 sm:px-3 md:px-4 mb-4 sm:mb-6 md:mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;

          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm sm:shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 border min-w-0 ${
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
                className={`absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ${
                  stat.isGradient
                    ? "bg-white/10"
                    : "bg-gradient-to-br " + stat.bgPattern
                } rounded-full blur-xl transform translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8`}
              ></div>
              <div
                className={`absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 ${
                  stat.isGradient
                    ? "bg-white/5"
                    : "bg-gradient-to-tr " + stat.bgPattern
                } rounded-full blur-xl transform -translate-x-5 sm:-translate-x-6 translate-y-5 sm:translate-y-6`}
              ></div>

              <div className="relative z-10 p-2 sm:p-4 md:p-5 lg:p-6">
                {stat.isGradient ? (
                  // Special layout for the balance card
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <IconComponent />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-white/90 mb-1">
                        {stat.title}
                      </h3>
                      <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 leading-tight">
                        {stat.value}
                      </div>
                      <p className="text-xs sm:text-sm text-white/80 leading-tight">
                        {stat.subtitle}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Layout for other cards
                  <div className="text-center space-y-2 sm:space-y-3">
                    <div className="flex justify-center">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${stat.iconBg} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                      >
                        <IconComponent />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-slate-600 mb-1 leading-tight">
                        {stat.title}
                      </h3>
                      <div
                        className={`text-sm sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 leading-tight ${stat.color}`}
                      >
                        {stat.value}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-tight">
                        {stat.subtitle}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatsCards;