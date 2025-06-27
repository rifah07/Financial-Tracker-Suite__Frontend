function WalletIcon({ size = 320, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: "drop-shadow(0 20px 40px rgba(102, 126, 234, 0.25))",
        ...style,
      }}
    >
      <defs>
        {/* Main wallet gradient */}
        <linearGradient id="walletMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="30%" stopColor="#764ba2" />
          <stop offset="70%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#5a67d8" />
        </linearGradient>

        {/* Card gradient */}
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f7fafc" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#edf2f7" stopOpacity="0.7" />
        </linearGradient>

        {/* Money gradient */}
        <linearGradient id="moneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#48bb78" />
          <stop offset="50%" stopColor="#38a169" />
          <stop offset="100%" stopColor="#2f855a" />
        </linearGradient>

        {/* Glow effect */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Inner shadow */}
        <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="2" result="offset-blur" />
          <feFlood floodColor="#000000" floodOpacity="0.1" />
          <feComposite in2="offset-blur" operator="in" />
        </filter>
      </defs>

      {/* Background circle for depth */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="url(#walletMain)"
        opacity="0.1"
        filter="url(#glow)"
      />

      {/* Main wallet body */}
      <rect
        x="30"
        y="70"
        width="140"
        height="90"
        rx="12"
        ry="12"
        fill="url(#walletMain)"
        filter="url(#glow)"
      />

      {/* Wallet top flap */}
      <rect
        x="35"
        y="50"
        width="130"
        height="30"
        rx="8"
        ry="8"
        fill="url(#cardGrad)"
        opacity="0.9"
      />

      {/* Credit card */}
      <rect
        x="45"
        y="85"
        width="80"
        height="50"
        rx="6"
        ry="6"
        fill="url(#cardGrad)"
        stroke="#e2e8f0"
        strokeWidth="1"
        filter="url(#innerShadow)"
      />

      {/* Card chip */}
      <rect
        x="52"
        y="95"
        width="12"
        height="10"
        rx="2"
        ry="2"
        fill="#ffd700"
        opacity="0.8"
      />

      {/* Card lines */}
      <line
        x1="52"
        y1="110"
        x2="85"
        y2="110"
        stroke="#cbd5e0"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="52"
        y1="118"
        x2="110"
        y2="118"
        stroke="#cbd5e0"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="52"
        y1="126"
        x2="75"
        y2="126"
        stroke="#cbd5e0"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Wallet clasp/button */}
      <circle
        cx="155"
        cy="115"
        r="8"
        fill="#ffffff"
        opacity="0.9"
        filter="url(#innerShadow)"
      />
      <circle cx="155" cy="115" r="4" fill="#667eea" opacity="0.8" />

      {/* Money bills coming out */}
      <rect
        x="135"
        y="75"
        width="25"
        height="15"
        rx="2"
        ry="2"
        fill="url(#moneyGrad)"
        opacity="0.9"
        transform="rotate(-10 147.5 82.5)"
      />
      <rect
        x="140"
        y="65"
        width="25"
        height="15"
        rx="2"
        ry="2"
        fill="url(#moneyGrad)"
        opacity="0.7"
        transform="rotate(-5 152.5 72.5)"
      />

      {/* Dollar signs on money */}
      <text
        x="147"
        y="87"
        fill="#ffffff"
        fontSize="8"
        fontWeight="bold"
        opacity="0.8"
      >
        $
      </text>
      <text
        x="152"
        y="77"
        fill="#ffffff"
        fontSize="8"
        fontWeight="bold"
        opacity="0.6"
      >
        $
      </text>

      {/* Coins */}
      <circle cx="75" cy="145" r="6" fill="#ffd700" opacity="0.8" />
      <circle cx="90" cy="150" r="5" fill="#ffd700" opacity="0.6" />
      <circle cx="105" cy="148" r="4" fill="#ffd700" opacity="0.4" />

      {/* Growth arrow */}
      <path
        d="M140 45 L155 30 L155 37 L170 37 L170 30 L185 45 L170 52 L170 45 L155 45 L155 52 Z"
        fill="url(#moneyGrad)"
        opacity="0.8"
        filter="url(#glow)"
      />

      {/* Sparkle effects */}
      <circle cx="60" cy="60" r="2" fill="#ffd700" opacity="0.6">
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="180" cy="80" r="1.5" fill="#ffffff" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="40" cy="120" r="1" fill="#ffd700" opacity="0.7">
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

export default WalletIcon;
