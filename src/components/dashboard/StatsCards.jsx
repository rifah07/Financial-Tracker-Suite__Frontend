import React from "react";

// Custom icon components
const TrendingUpIcon = ({ isMobile }) => (
  <div
    className={`flex items-center justify-center text-emerald-600 font-bold ${
      isMobile ? "w-4 h-4 text-sm" : "w-6 h-6 text-lg"
    }`}
  >
    ↗
  </div>
);

const TrendingDownIcon = ({ isMobile }) => (
  <div
    className={`flex items-center justify-center text-red-600 font-bold ${
      isMobile ? "w-4 h-4 text-sm" : "w-6 h-6 text-lg"
    }`}
  >
    ↘
  </div>
);

const CreditCardIcon = ({ isMobile }) => (
  <div
    className={`flex items-center justify-center text-white ${
      isMobile ? "w-4 h-4 text-sm" : "w-5 h-5 text-lg"
    }`}
  >
    💳
  </div>
);

const BarChartIcon = ({ isMobile }) => (
  <div
    className={`flex items-center justify-center text-blue-600 font-bold ${
      isMobile ? "w-4 h-4 text-sm" : "w-6 h-6 text-lg"
    }`}
  >
    📊
  </div>
);

function StatsCards({ transactions = [], user = { balance: 5420.5 } }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const formatCurrency = (amount) => {
    if (isMobile) {
      if (Math.abs(amount) >= 1000000)
        return `$${(amount / 1000000).toFixed(1)}M`;
      if (Math.abs(amount) >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
      return `$${amount.toFixed(0)}`;
    }
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
      title: isMobile ? "Balance" : "Current Balance",
      value: formatCurrency(user?.balance || 0),
      subtitle: isMobile ? "Available" : "Available funds",
      icon: CreditCardIcon,
      gradient: "from-blue-600 via-purple-600 to-indigo-700",
      isGradient: true,
      bgPattern: "from-blue-500/10 to-purple-500/10",
    },
    {
      title: isMobile ? "Income" : "Total Income",
      value: formatCurrency(totalIncome),
      subtitle: "Total Income",
      icon: TrendingUpIcon,
      color: "text-emerald-600",
      bgColor: "from-emerald-50 to-green-50",
      iconBg: "bg-emerald-100",
      borderColor: "border-emerald-200/50",
    },
    {
      title: isMobile ? "Expenses" : "Total Expenses",
      value: formatCurrency(totalExpenses),
      subtitle: "Total Expenses",
      icon: TrendingDownIcon,
      color: "text-red-600",
      bgColor: "from-red-50 to-rose-50",
      iconBg: "bg-red-100",
      borderColor: "border-red-200/50",
    },
    {
      title: isMobile ? "Count" : "Total Transactions",
      value: transactions.length,
      subtitle: "Transactions",
      icon: BarChartIcon,
      color: "text-blue-600",
      bgColor: "from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      borderColor: "border-blue-200/50",
    },
  ];

  return (
    <div
      className={`w-full ${
        isMobile
          ? "px-2 mb-4"
          : "max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 mb-6 sm:mb-8"
      }`}
    >
      <div
        className={`grid ${
          isMobile
            ? "grid-cols-2 gap-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        }`}
      >
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-${
                isMobile ? "lg" : "2xl"
              } shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border min-w-0 ${
                stat.isGradient
                  ? "bg-gradient-to-br " +
                    stat.gradient +
                    " text-white border-white/20"
                  : "bg-gradient-to-br " + stat.bgColor + " " + stat.borderColor
              }`}
              style={isMobile ? { minHeight: "90px" } : {}}
            >
              <div
                className={`absolute top-0 right-0 ${
                  isMobile ? "w-8 h-8" : "w-20 h-20"
                } ${
                  stat.isGradient
                    ? "bg-white/10"
                    : "bg-gradient-to-br " + stat.bgPattern
                } rounded-full blur-${
                  isMobile ? "lg" : "2xl"
                } transform translate-x-${isMobile ? "4" : "10"} -translate-y-${
                  isMobile ? "4" : "10"
                }`}
              ></div>

              <div className="relative z-10 p-3 sm:p-4 md:p-6 h-full flex flex-col">
                {stat.isGradient ? (
                  <div
                    className={`flex items-center ${
                      isMobile ? "mb-1" : "mb-4"
                    }`}
                  >
                    <div
                      className={`w-${isMobile ? "6" : "10"} h-${
                        isMobile ? "6" : "10"
                      } bg-white/20 backdrop-blur-sm rounded-${
                        isMobile ? "md" : "xl"
                      } flex items-center justify-center mr-2`}
                    >
                      <IconComponent isMobile={isMobile} />
                    </div>
                    <h3
                      className={`text-${
                        isMobile ? "xs" : "sm"
                      } font-medium text-white/90`}
                    >
                      {stat.title}
                    </h3>
                  </div>
                ) : (
                  <div className="flex justify-center mb-2">
                    <div
                      className={`w-6 h-6 ${stat.iconBg} rounded-md flex items-center justify-center`}
                    >
                      <IconComponent isMobile={isMobile} />
                    </div>
                  </div>
                )}

                <div
                  className={`flex-1 flex flex-col ${
                    stat.isGradient ? "" : "text-center"
                  } justify-center`}
                >
                  <div
                    className={`font-bold leading-tight ${
                      isMobile ? "text-sm" : "text-xl sm:text-2xl md:text-3xl"
                    } ${stat.isGradient ? "text-white" : stat.color}`}
                  >
                    {stat.value}
                  </div>
                  <p
                    className={`text-${isMobile ? "xs" : "sm"} ${
                      stat.isGradient ? "text-white/70" : "text-slate-500"
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