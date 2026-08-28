interface ChakraIconProps {
  chakraId: number;
  className?: string;
}

const CHAKRA_CONFIG: Record<
  number,
  {
    primary: string;
    lightBg: string;
    border: string;
  }
> = {
  7: { primary: "#8E44AD", lightBg: "#F4ECF7", border: "#D2B4DE" }, // Sahasrara — Violet
  6: { primary: "#2980B9", lightBg: "#EBF5FB", border: "#AED6F1" }, // Ajna — Indigo/Blue
  5: { primary: "#00A8FF", lightBg: "#E0F7FA", border: "#80DEEA" }, // Vishuddha — Light Blue
  4: { primary: "#27AE60", lightBg: "#E8F8F5", border: "#A3E4D7" }, // Anahata — Green
  3: { primary: "#F39C12", lightBg: "#FEF9E7", border: "#F9E79F" }, // Manipura — Yellow
  2: { primary: "#E67E22", lightBg: "#FDF2E9", border: "#F5CBA7" }, // Svadhistana — Orange
  1: { primary: "#E74C3C", lightBg: "#FDEDEC", border: "#F5B7B1" }, // Muladhara — Red
  0: { primary: "#7D3C98", lightBg: "#F4ECF7", border: "#BB8FCE" }, // Total / Итог — Aura
};

export default function ChakraIcon({ chakraId, className = "h-10 w-10" }: ChakraIconProps) {
  const config = CHAKRA_CONFIG[chakraId] || CHAKRA_CONFIG[0];
  const color = config.primary;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Outer circle border */}
      <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke={color} strokeWidth="2.5" />

      {/* Inner graphic depending on chakraId */}
      {chakraId === 7 && (
        <>
          {/* Sahasrara - Violet Crown Lotus */}
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={i}
              d="M32 6C30 14 30 20 32 24C34 20 34 14 32 6Z"
              fill={color}
              opacity="0.3"
              transform={`rotate(${i * 22.5} 32 32)`}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={`in-${i}`}
              d="M32 12C30 18 30 22 32 25C34 22 34 18 32 12Z"
              fill={color}
              transform={`rotate(${i * 45} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="8" fill="#FFFFFF" stroke={color} strokeWidth="2" />
          <circle cx="32" cy="32" r="4" fill={color} />
        </>
      )}

      {chakraId === 6 && (
        <>
          {/* Ajna - Blue Third Eye */}
          <path
            d="M 12 32 C 18 20, 26 20, 32 32 C 26 44, 18 44, 12 32 Z"
            fill={color}
            opacity="0.25"
          />
          <path
            d="M 52 32 C 46 20, 38 20, 32 32 C 38 44, 46 44, 52 32 Z"
            fill={color}
            opacity="0.25"
          />
          <circle cx="32" cy="32" r="14" fill="#FFFFFF" stroke={color} strokeWidth="2" />
          <polygon points="32,23 23,37 41,37" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="32" cy="31" r="3" fill={color} />
        </>
      )}

      {chakraId === 5 && (
        <>
          {/* Vishuddha - Cyan Throat Lotus */}
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d="M32 8C29 16 29 20 32 24C35 20 35 16 32 8Z"
              fill={color}
              opacity="0.35"
              transform={`rotate(${i * 30} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="13" fill="#FFFFFF" stroke={color} strokeWidth="2" />
          <polygon points="32,41 23,26 41,26" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="32" cy="32" r="4" fill={color} opacity="0.8" />
        </>
      )}

      {chakraId === 4 && (
        <>
          {/* Anahata - Green Heart 6-Pointed Star */}
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d="M32 8C29 16 29 20 32 24C35 20 35 16 32 8Z"
              fill={color}
              opacity="0.3"
              transform={`rotate(${i * 30} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="13" fill="#FFFFFF" stroke={color} strokeWidth="2" />
          <polygon points="32,21 41,37 23,37" fill="none" stroke={color} strokeWidth="2" />
          <polygon points="32,43 23,27 41,27" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="32" cy="32" r="3" fill={color} />
        </>
      )}

      {chakraId === 3 && (
        <>
          {/* Manipura - Yellow Solar Plexus Inverted Triangle */}
          {Array.from({ length: 10 }).map((_, i) => (
            <path
              key={i}
              d="M32 9C29 16 29 21 32 24C35 21 35 16 32 9Z"
              fill={color}
              opacity="0.4"
              transform={`rotate(${i * 36} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="13" fill="#FFFFFF" stroke={color} strokeWidth="2" />
          <polygon points="32,42 22,25 42,25" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
          <circle cx="32" cy="30" r="3" fill={color} />
        </>
      )}

      {chakraId === 2 && (
        <>
          {/* Svadhistana - Orange Sacral Crescent Moon */}
          {Array.from({ length: 6 }).map((_, i) => (
            <path
              key={i}
              d="M32 8C28 17 28 22 32 25C36 22 36 17 32 8Z"
              fill={color}
              opacity="0.4"
              transform={`rotate(${i * 60} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="13" fill="#FFFFFF" stroke={color} strokeWidth="2" />
          <path
            d="M 37 23 A 9 9 0 0 1 37 41 A 11 11 0 1 0 37 23 Z"
            fill={color}
          />
        </>
      )}

      {chakraId === 1 && (
        <>
          {/* Muladhara - Red Root Square & Triangle */}
          {Array.from({ length: 4 }).map((_, i) => (
            <path
              key={i}
              d="M32 7C27 17 27 23 32 25C37 23 37 17 32 7Z"
              fill={color}
              opacity="0.45"
              transform={`rotate(${i * 90} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="13" fill="#FFFFFF" stroke={color} strokeWidth="2" />
          <rect x="23" y="23" width="18" height="18" fill="none" stroke={color} strokeWidth="2" />
          <polygon points="32,39 25,26 39,26" fill={color} opacity="0.7" />
        </>
      )}

      {(chakraId === 0 || chakraId < 1 || chakraId > 7) && (
        <>
          {/* Total / Итог - Energy Field Aura Icon */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="32"
              y1="8"
              x2="32"
              y2="15"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              transform={`rotate(${i * 45} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="12" fill={color} opacity="0.15" stroke={color} strokeWidth="2" />
          <circle cx="32" cy="32" r="6" fill={color} />
          <polygon points="32,23 35,29 41,32 35,35 32,41 29,35 23,32 29,29" fill="#FFFFFF" />
        </>
      )}
    </svg>
  );
}

