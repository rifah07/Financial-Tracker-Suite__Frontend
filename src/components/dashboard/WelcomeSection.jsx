import React from "react";

function WelcomeSection({ user }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-2xl shadow-lg border border-slate-200/50 backdrop-blur-sm w-full max-w-full">
        {/* Background Blur Effects */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-xl transform translate-x-4 -translate-y-4"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-gradient-to-tr from-slate-100/40 to-blue-100/40 rounded-full blur-xl transform -translate-x-4 translate-y-4"></div>

        {/* Main Content */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8 w-full">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
            {/* Avatar */}
            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-blue-200 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                  👤
                </span>
              </div>
            </div>

            {/* Text Section */}
            <div className="flex-1 text-center sm:text-left w-full min-w-0">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-800 mb-1 leading-tight tracking-tight">
                <span className="block sm:inline">Welcome Back,</span>{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block sm:inline truncate">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium truncate">
                Member since {formatDate(user?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;