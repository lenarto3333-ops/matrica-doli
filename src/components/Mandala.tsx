interface MandalaProps {
  className?: string;
}

interface Ring {
  count: number;
  innerR: number;
  outerR: number;
  halfWidth: number;
  offset: number;
  opacity: number;
}

const RINGS: Ring[] = [
  { count: 16, innerR: 112, outerR: 172, halfWidth: 24, offset: 0, opacity: 0.55 },
  { count: 16, innerR: 74, outerR: 122, halfWidth: 19, offset: 11.25, opacity: 0.65 },
  { count: 12, innerR: 40, outerR: 80, halfWidth: 15, offset: 0, opacity: 0.8 },
  { count: 10, innerR: 10, outerR: 42, halfWidth: 7, offset: 6, opacity: 1 },
];

function petalPath(cx: number, cy: number, innerR: number, outerR: number, halfWidth: number) {
  const baseY = cy - innerR;
  const tipY = cy - outerR;
  const midY = cy - (innerR + outerR) / 2;
  return `M${cx},${baseY} Q${cx + halfWidth},${midY} ${cx},${tipY} Q${cx - halfWidth},${midY} ${cx},${baseY} Z`;
}

export default function Mandala({ className = "" }: MandalaProps) {
  const cx = 200;
  const cy = 200;

  return (
    <svg viewBox="0 0 400 400" className={className} fill="none">
      {RINGS.map((ring, ri) => (
        <g key={ri} opacity={ring.opacity}>
          {Array.from({ length: ring.count }).map((_, i) => {
            const angle = (360 / ring.count) * i + ring.offset;
            return (
              <path
                key={i}
                d={petalPath(cx, cy, ring.innerR, ring.outerR, ring.halfWidth)}
                stroke="currentColor"
                strokeWidth="1"
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
        </g>
      ))}

      {/* outer + inner containment rings */}
      <circle cx={cx} cy={cy} r={180} stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx={cx} cy={cy} r={112} stroke="currentColor" strokeWidth="0.75" opacity="0.3" />

      <circle cx={cx} cy={cy} r={6} fill="currentColor" />
    </svg>
  );
}
