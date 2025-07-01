import React from "react";

// Custom icon components
const TrendingUpIcon = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center text-emerald-600 font-bold text-sm sm:text-base lg:text-lg">
    ↗
  </div>
);
const TrendingDownIcon = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center text-red-600 font-bold text-sm sm:text-base lg:text-lg">
    ↘
  </div>
);
const CreditCardIcon = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-white text-sm sm:text-base">
    💳
  </div>
);
const BarChartIcon = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center text-blue-600 text-sm sm:text-base lg:text-lg">
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
    <div className="w-full max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 mb-4 sm:mb-6 lg:mb-8">
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;

          return (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 sm:hover:-translate-y-1 border min-w-0 ${
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
              {/* Background elements */}
              <div
                className={`absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 ${
                  stat.isGradient
                    ? "bg-white/10"
                    : "bg-gradient-to-br " + stat.bgPattern
                } rounded-full blur-xl sm:blur-2xl transform translate-x-6 sm:translate-x-8 lg:translate-x-10 -translate-y-6 sm:-translate-y-8 lg:-translate-y-10`}
              ></div>
              <div
                className={`absolute bottom-0 left-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 ${
                  stat.isGradient
                    ? "bg-white/5"
                    : "bg-gradient-to-tr " + stat.bgPattern
                } rounded-full blur-xl sm:blur-2xl transform -translate-x-5 sm:-translate-x-6 lg:-translate-x-8 translate-y-5 sm:translate-y-6 lg:translate-y-8`}
              ></div>

              <div className="relative z-10 p-3 xs:p-4 sm:p-5 lg:p-6">
                {stat.isGradient ? (
                  <div className="flex flex-col xs:flex-row items-start xs:justify-between mb-2 sm:mb-3 lg:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 xs:mb-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center">
                        <IconComponent />
                      </div>
                      <div className="xs:hidden sm:block">
                        <h3 className="text-xs sm:text-sm font-semibold text-white/90 mb-1">
                          {stat.title}
                        </h3>
                      </div>
                    </div>
                    <div className="xs:hidden sm:hidden">
                      <h3 className="text-xs font-semibold text-white/90 mb-1">
                        {stat.title}
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center mb-2 sm:mb-3 lg:mb-4">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${stat.iconBg} rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300 mb-2`}
                    >
                      <IconComponent />
                    </div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-600 text-center leading-tight">
                      {stat.title}
                    </h3>
                  </div>
                )}

                <div className={stat.isGradient ? "text-left" : "text-center"}>
                  <div
                    className={`text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 leading-tight ${
                      stat.isGradient ? "text-white" : stat.color
                    }`}
                  >
                    {typeof stat.value === 'string' && stat.value.length > 10 ? (
                      <span className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">
                        {stat.value}
                      </span>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <p
                    className={`text-xs sm:text-sm leading-tight ${
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