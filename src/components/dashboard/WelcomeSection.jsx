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
    <div className="w-full px-4 pt-6 pb-4 sm:px-6 md:px-8 overflow-x-hidden">
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-2xl shadow-lg border border-slate-200/50 backdrop-blur-sm overflow-hidden w-full">
        {/* Background Blur Circles */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-2xl translate-x-6 -translate-y-6 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-tr from-slate-100/40 to-blue-100/40 rounded-full blur-2xl -translate-x-4 translate-y-4 pointer-events-none"></div>

        {/* Foreground Content */}
        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-blue-200 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-blue-100 border-2 border-white shadow-md group-hover:scale-105 transition duration-300">
                <span className="text-2xl sm:text-3xl md:text-4xl">👤</span>
              </div>
            </div>

            {/* Text */}
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
