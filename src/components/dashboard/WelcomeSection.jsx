import React from "react";

const PersonIcon = () => <span style={{ fontSize: "2.5rem" }}>👤</span>;

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
    <div className="w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 pt-3 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12 pb-3 sm:pb-6 md:pb-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl border border-slate-200/50 backdrop-blur-sm w-full">
        <div className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-xl sm:blur-2xl md:blur-3xl transform translate-x-6 sm:translate-x-10 md:translate-x-14 lg:translate-x-20 -translate-y-6 sm:-translate-y-10 md:-translate-y-14 lg:-translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 bg-gradient-to-tr from-slate-100/40 to-blue-100/40 rounded-full blur-xl sm:blur-2xl md:blur-3xl transform -translate-x-5 sm:-translate-x-8 md:-translate-x-10 lg:-translate-x-16 translate-y-5 sm:translate-y-8 md:translate-y-10 lg:translate-y-16"></div>

        <div className="relative z-10 p-3 sm:p-6 md:p-8 lg:p-10 w-full">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 md:gap-6 lg:gap-8 w-full">
            {/* Avatar Section */}
            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-blue-200 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center border-2 sm:border-3 border-white shadow-md sm:shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                <span
                  style={{ fontSize: "1rem" }}
                  className="sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                >
                  👤
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center sm:text-left w-full min-w-0">
              <h1 className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-slate-800 mb-1 sm:mb-2 leading-tight tracking-tight overflow-hidden">
                <span className="block sm:inline">Welcome Back,</span>{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block sm:inline truncate">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </h1>

              <p className="text-xs sm:text-base md:text-lg text-slate-600 font-medium truncate">
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