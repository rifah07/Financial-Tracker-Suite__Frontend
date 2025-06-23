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
    <path
      d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
      fill="#1976d2"
      opacity="0.8"
    />
    <path
      d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
      stroke="#1565c0"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M6 3H18C19.1 3 20 3.9 20 5V7H4V5C4 3.9 4.9 3 6 3Z"
      fill="#1976d2"
      opacity="0.6"
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
    <div className="min-h-96 md:min-h-[420px] flex flex-col md:flex-row items-center justify-between bg-blue-50 rounded-2xl px-4 md:px-12 py-8 md:py-16 mt-8 shadow-lg relative overflow-hidden">
      <div className="flex-1 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Take Control of Your Finances
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
          Track your income, expenses, and savings with ease. Secure, fast, and
          beautifully simple.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-md transition-colors duration-200">
            Get Started
          </button>
          <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-2xl transition-colors duration-200">
            Learn More
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center mt-8 md:mt-0 z-10">
        <WalletIcon
          size={260}
          opacity={0.9}
          style={{
            filter: "drop-shadow(0 8px 32px rgba(25, 118, 210, 0.20))",
          }}
        />
      </div>

      {/* Decorative background SVG */}
      <div className="absolute -right-20 -bottom-16 w-80 h-80 opacity-5 z-0 hidden md:block">
        <WalletIcon size={320} opacity={0.07} />
      </div>
    </div>
  );
}

export default HeroSection;
