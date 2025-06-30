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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-12 pb-4 sm:pb-6">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-3xl shadow-xl border border-slate-200/50 backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-slate-100/40 to-blue-100/40 rounded-full blur-3xl transform -translate-x-16 translate-y-16"></div>

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8">
            {/* Avatar Section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-blue-200 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full flex items-center justify-center border-3 border-white shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                <PersonIcon />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 mb-2 leading-tight tracking-tight">
                Welcome Back,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {user?.name?.split(" ")[0] || "User"}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium">
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