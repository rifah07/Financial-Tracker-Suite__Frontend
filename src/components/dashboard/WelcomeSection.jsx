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
    <div className="w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10 pt-3 xs:pt-4 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12 pb-3 xs:pb-4 sm:pb-6 md:pb-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-xl xs:rounded-2xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-slate-200/50 backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-2xl sm:blur-3xl transform translate-x-8 xs:translate-x-10 sm:translate-x-14 md:translate-x-18 lg:translate-x-20 -translate-y-8 xs:-translate-y-10 sm:-translate-y-14 md:-translate-y-18 lg:-translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gradient-to-tr from-slate-100/40 to-blue-100/40 rounded-full blur-2xl sm:blur-3xl transform -translate-x-7 xs:-translate-x-8 sm:-translate-x-10 md:-translate-x-14 lg:-translate-x-16 translate-y-7 xs:translate-y-8 sm:translate-y-10 md:translate-y-14 lg:translate-y-16"></div>

        <div className="relative z-10 p-3 xs:p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="flex flex-col xs:flex-col sm:flex-row items-center sm:items-start gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {/* Avatar Section */}
            <div className="relative group flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-blue-200 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center border-2 sm:border-3 border-white shadow-md sm:shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                <span
                  style={{ fontSize: "1.2rem" }}
                  className="xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
                >
                  👤
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center sm:text-left min-w-0 max-w-full">
              <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-slate-800 mb-1 xs:mb-1 sm:mb-2 leading-tight tracking-tight break-words hyphens-auto">
                <span className="inline-block">Welcome Back,</span>{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block break-words">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </h1>

              <p className="text-xs xs:text-sm sm:text-base md:text-lg text-slate-600 font-medium break-words">
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