const PersonIcon = () => <span className="text-4xl sm:text-5xl">👤</span>;

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
    <div className="w-full max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto px-3 sm:px-5 lg:px-8 pt-4 sm:pt-6 lg:pt-10 pb-4">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-2xl sm:rounded-3xl shadow-md border border-slate-200/40 backdrop-blur-sm">
        {/* Decorative Blurs */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-tr from-slate-100/40 to-blue-100/40 rounded-full blur-2xl transform -translate-x-8 translate-y-8"></div>

        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5">
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-blue-200 rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center border-2 border-white shadow-md group-hover:scale-105 transition-transform duration-300">
                <PersonIcon />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-left w-full">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 leading-tight tracking-tight break-words">
                Welcome Back,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
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