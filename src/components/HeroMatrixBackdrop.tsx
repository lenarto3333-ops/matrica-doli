const nodes = [
  { x: 450, y: 78, r: 38, label: "9" },
  { x: 665, y: 180, r: 31, label: "7" },
  { x: 715, y: 414, r: 34, label: "4" },
  { x: 640, y: 642, r: 31, label: "6" },
  { x: 450, y: 720, r: 35, label: "8" },
  { x: 225, y: 630, r: 29, label: "5" },
  { x: 145, y: 414, r: 34, label: "2" },
  { x: 225, y: 185, r: 31, label: "3" },
];

const satellites = [
  [450, 145, 11],
  [450, 254, 8],
  [284, 235, 9],
  [610, 235, 9],
  [245, 414, 17],
  [665, 414, 17],
  [320, 340, 14],
  [580, 340, 14],
  [535, 505, 13],
  [450, 585, 10],
];

export default function HeroMatrixBackdrop() {
  return (
    <svg
      viewBox="0 0 900 820"
      className="h-full w-full overflow-visible"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hero-matrix-aura" cx="50%" cy="48%" r="52%">
          <stop offset="0" stopColor="#E9A98C" stopOpacity="0.38" />
          <stop offset="0.48" stopColor="#EFC0AA" stopOpacity="0.14" />
          <stop offset="1" stopColor="#F7E5DB" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hero-matrix-pearl">
          <stop offset="0" stopColor="#FFFDF8" />
          <stop offset="0.62" stopColor="#F8E8DC" />
          <stop offset="1" stopColor="#B96A49" />
        </radialGradient>
        <filter id="hero-matrix-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="450" cy="410" r="370" fill="url(#hero-matrix-aura)" />

      <g stroke="#C87553" strokeLinecap="round">
        <circle cx="450" cy="410" r="330" strokeWidth="1.1" opacity="0.55" />
        <circle cx="450" cy="410" r="286" strokeWidth="0.7" strokeDasharray="2 7" opacity="0.38" />
        <circle cx="450" cy="410" r="210" strokeWidth="1.1" opacity="0.6" />
        <circle cx="450" cy="410" r="178" strokeWidth="0.7" strokeDasharray="2 6" opacity="0.42" />
        <circle cx="450" cy="410" r="112" strokeWidth="0.65" opacity="0.36" />

        <path d="M450 78 715 414 450 720 145 414Z" strokeWidth="1.05" opacity="0.58" />
        <path d="M225 185H665V642H225Z" strokeWidth="0.9" opacity="0.48" />
        <path d="M225 185 640 642M665 180 225 630" strokeWidth="0.8" opacity="0.38" />
        <path d="M450 78V720M145 414H715" strokeWidth="1" opacity="0.58" />
        <path d="M225 185 715 414 225 630 450 78 665 180 145 414 640 642Z" strokeWidth="0.65" opacity="0.3" />

        {Array.from({ length: 24 }, (_, index) => {
          const angle = (index * 15 * Math.PI) / 180;
          const x1 = 450 + Math.sin(angle) * 112;
          const y1 = 410 - Math.cos(angle) * 112;
          const x2 = 450 + Math.sin(angle) * 178;
          const y2 = 410 - Math.cos(angle) * 178;
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth="0.55"
              opacity="0.25"
            />
          );
        })}
      </g>

      <g>
        <circle cx="450" cy="410" r="47" fill="#FFFDF9" fillOpacity="0.82" stroke="#C87553" strokeWidth="1.2" />
        <circle cx="450" cy="410" r="38" stroke="#C87553" strokeWidth="0.7" opacity="0.6" />
        <text x="450" y="423" textAnchor="middle" fill="#B86745" fontFamily="Georgia, serif" fontSize="39">
          1
        </text>
      </g>

      {nodes.map((node) => (
        <g key={`${node.x}-${node.y}`}>
          <circle cx={node.x} cy={node.y} r={node.r + 10} stroke="#C87553" strokeWidth="0.55" opacity="0.3" />
          <circle cx={node.x} cy={node.y} r={node.r + 5} stroke="#C87553" strokeWidth="0.8" opacity="0.48" />
          <circle cx={node.x} cy={node.y} r={node.r} fill="#FFFDF9" fillOpacity="0.76" stroke="#C87553" strokeWidth="1" />
          <text
            x={node.x}
            y={node.y + 10}
            textAnchor="middle"
            fill="#B86745"
            fontFamily="Georgia, serif"
            fontSize={node.r * 0.86}
          >
            {node.label}
          </text>
        </g>
      ))}

      {satellites.map(([x, y, r], index) => (
        <g key={`${x}-${y}`} filter={index === 6 || index === 7 ? "url(#hero-matrix-glow)" : undefined}>
          <circle cx={x} cy={y} r={r} fill="url(#hero-matrix-pearl)" opacity="0.9" />
          <circle cx={x} cy={y} r={r + 3} stroke="#C87553" strokeWidth="0.55" opacity="0.42" />
        </g>
      ))}
    </svg>
  );
}
