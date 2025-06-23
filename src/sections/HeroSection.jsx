import Paper from "@mui/material/Paper";

// Inline SVG component for reliable rendering
const WalletIcon = ({ size = 240, opacity = 0.9, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity, ...style }}
  >
    <defs>
      <linearGradient
        id="walletBody"
        x1="2"
        y1="7"
        x2="22"
        y2="21"
        gradientTransform="rotate(10)"
      >
        <stop offset="0%" stopColor="#1976d2" />
        <stop offset="100%" stopColor="#42a5f5" />
      </linearGradient>
      <radialGradient id="walletAccent" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1976d2" stopOpacity="0.1" />
      </radialGradient>
    </defs>
    <path
      d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
      fill="url(#walletBody)"
      opacity="0.95"
    />
    <path
      d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
      stroke="#1565c0"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M6 3H18C19.1 3 20 3.9 20 5V7H4V5C4 3.9 4.9 3 6 3Z"
      fill="url(#walletAccent)"
      opacity="0.7"
    />
    <circle cx="17" cy="14" r="2" fill="#fff" />
    <circle cx="17" cy="14" r="1" fill="#1976d2" />
    <path
      d="M8 11H10M8 13H12M8 15H10"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M12 8L14 6M14 6L16 8M14 6V10"
      stroke="#4caf50"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function HeroSection() {
  return (
    <div className="min-h-96 md:min-h-[420px] flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-3xl px-4 md:px-16 py-10 md:py-20 mt-8 shadow-2xl relative overflow-hidden">
      {/* Decorative blurred circle */}
      <div className="absolute left-[-80px] top-[-80px] w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-40 z-0 animate-pulse" />
      <div className="flex-1 z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 drop-shadow-lg">
          Take Control of Your <span className="text-blue-500">Finances</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
          Track your income, expenses, and savings with ease.
          <br className="hidden md:inline" />
          <span className="text-blue-600 font-semibold">
            {" "}
            Secure, fast, and beautifully simple.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold px-10 py-3 rounded-2xl shadow-lg transition-all duration-200 transform hover:scale-105">
            Get Started
          </button>
          <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold px-10 py-3 rounded-2xl transition-all duration-200 hover:shadow-md">
            Learn More
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center mt-10 md:mt-0 z-10">
        <div className="animate-float">
          <WalletIcon
            size={270}
            opacity={0.97}
            style={{
              filter: "drop-shadow(0 8px 32px rgba(25, 118, 210, 0.18))",
              transition: "transform 0.3s",
            }}
          />
        </div>
      </div>

      {/* Decorative background SVG */}
      <div className="absolute -right-24 -bottom-20 w-96 h-96 opacity-10 z-0 hidden md:block">
        <WalletIcon size={340} opacity={0.07} />
      </div>
      <style>{`
        .animate-float {
          animation: floatY 3.5s ease-in-out infinite;
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-18px);}
        }
      `}</style>
    </div>
  );
}

function SectionCard({ children, sx = {}, ...props }) {
  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 4,
        p: { xs: 2, md: 4 },
        bgcolor: "#fff",
        boxShadow: "0 4px 24px 0 rgba(25, 118, 210, 0.07)",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

export default HeroSection;
export { SectionCard };
