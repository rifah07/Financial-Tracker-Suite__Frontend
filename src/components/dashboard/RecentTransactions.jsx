import React from "react";

function RecentTransactions({
  transactions,
  onEditTransaction,
  onViewTransaction,
  onViewAll,
}) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTxType = (tx) => {
    if (tx.transaction_type) return tx.transaction_type.toLowerCase();
    if (tx.type) return tx.type.toLowerCase();
    if (typeof tx.amount === "number")
      return tx.amount >= 0 ? "income" : "expense";
    return "income";
  };

  const getTxDescription = (tx) =>
    tx.remarks || tx.description || "Transaction";
  const getTxAmount = (tx) => Math.abs(Number(tx.amount) || 0);

  const TrendingUpIcon = () => (
    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 text-green-700 text-lg sm:text-xl font-bold">
      ↗
    </div>
  );

  const TrendingDownIcon = () => (
    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-100 to-rose-200 text-red-700 text-lg sm:text-xl font-bold">
      ↘
    </div>
  );

  const getTransactionIcon = (tx) =>
    getTxType(tx) === "income" ? <TrendingUpIcon /> : <TrendingDownIcon />;

  const getTransactionColor = (tx) =>
    getTxType(tx) === "income" ? "text-green-700" : "text-red-700";

  const getBadgeColor = (tx) =>
    getTxType(tx) === "income"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/20 rounded-3xl shadow-xl border border-slate-200/50 backdrop-blur-sm">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full blur-3xl transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-100/40 to-indigo-100/40 rounded-full blur-3xl transform -translate-x-12 translate-y-12"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="p-6 sm:p-8 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <div className="text-white text-lg font-bold">💳</div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
                  Recent Transactions
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Your latest financial activity
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          {recentTransactions.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                <div className="text-2xl sm:text-3xl text-slate-400">📊</div>
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-slate-600 mb-2">
                No transactions yet
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Start by adding your first income or expense
              </p>
            </div>
          ) : (
            <div className="px-6 sm:px-8">
              <div className="space-y-2">
                {recentTransactions.map((transaction, index) => (
                  <div
                    key={transaction._id}
                    onClick={() => onEditTransaction(transaction)}
                    className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-200/50 hover:border-indigo-200 transition-all duration-300 cursor-pointer hover:shadow-lg hover:bg-white/80 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        {getTransactionIcon(transaction)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm sm:text-base font-semibold text-slate-800 truncate group-hover:text-indigo-800 transition-colors duration-200">
                              {" "}
                              {getTxDescription(transaction)}
                            </h4>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-xs sm:text-sm text-slate-600">
                                {formatDate(transaction.createdAt)}
                              </p>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(
                                  transaction
                                )}`}
                              >
                                {getTxType(transaction)}
                              </span>
                            </div>
                          </div>

                          {/* Amount */}
                          <div className="text-right flex-shrink-0">
                            <div
                              className={`text-base sm:text-lg font-bold ${getTransactionColor(
                                transaction
                              )}`}
                            >
                              {getTxType(transaction) === "income" ? "+" : "−"}
                              {formatCurrency(getTxAmount(transaction))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* More options button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewTransaction(transaction);
                        }}
                        className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100/50 hover:bg-slate-200/70 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* View All Button */}
          {recentTransactions.length > 0 && (
            <div className="p-6 sm:p-8 pt-6">
              <button
                onClick={onViewAll}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="text-sm sm:text-base">
                    View All Transactions
                  </span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentTransactions;
