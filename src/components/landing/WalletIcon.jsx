function WalletIcon({ size = 320, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: "drop-shadow(0 30px 60px rgba(102, 126, 234, 0.3))",
        ...style,
      }}
    >
      <defs>
        <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="50%" stopColor="#764ba2" />
          <stop offset="100%" stopColor="#667eea" />
        </linearGradient>
        <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M20 7H4C2.9 7 2 7.9 2 9V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V9C22 7.9 21.1 7 20 7Z"
        fill="url(#walletGradient)"
        filter="url(#glow)"
      />
      <path
        d="M6 3H18C19.1 3 20 3.9 20 5V7H4V5C4 3.9 4.9 3 6 3Z"
        fill="url(#cardGradient)"
      />
      <circle cx="17" cy="14" r="2.5" fill="#ffffff" opacity="0.95" />
      <circle cx="17" cy="14" r="1.2" fill="#667eea" />
      <path
        d="M6 11H10M6 13H12M6 15H9"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M12 8L14 6M14 6L16 8M14 6V10"
        stroke="#4ade80"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default WalletIcon;