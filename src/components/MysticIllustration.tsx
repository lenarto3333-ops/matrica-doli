interface MysticIllustrationProps {
  className?: string;
}

/** Small matrix-diagram glyph, drawn inline so the whole illustration is one SVG. */
function MatrixGlyph({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const pos = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
  };
  const pts = [0, 45, 90, 135, 180, 225, 270, 315].map(pos);
  const straight = [pts[7], pts[1], pts[3], pts[5]];
  const diamond = [pts[0], pts[2], pts[4], pts[6]];
  return (
    <g>
      <polygon
        points={straight.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <polygon
        points={diamond.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i % 2 === 0 ? 2.6 : 1.7} fill="currentColor" />
      ))}
      <circle cx={cx} cy={cy} r={3.2} fill="currentColor" />
    </g>
  );
}

/** Moon phase drawn via mask-based subtraction — a full disc with an offset disc cut out. */
function MoonPhase({
  id,
  cx,
  cy,
  r,
  offset,
}: {
  id: string;
  cx: number;
  cy: number;
  r: number;
  offset: number;
}) {
  return (
    <>
      <mask id={id} maskUnits="userSpaceOnUse" x={cx - r - 2} y={cy - r - 2} width={2 * r + 4} height={2 * r + 4}>
        <rect x={cx - r - 2} y={cy - r - 2} width={2 * r + 4} height={2 * r + 4} fill="black" />
        <circle cx={cx} cy={cy} r={r} fill="white" />
        {offset !== 0 && <circle cx={cx + offset} cy={cy} r={r * 0.92} fill="black" />}
      </mask>
      <circle cx={cx} cy={cy} r={r} fill="currentColor" mask={`url(#${id})`} />
    </>
  );
}

export default function MysticIllustration({ className = "" }: MysticIllustrationProps) {
  const moonY = 44;
  const moonXs = [30, 96, 166, 236, 302];
  const figureCx = 166;
  const figureCy = 250;

  const sparkles: [number, number, number][] = [
    [16, 96, 5],
    [128, 8, 4],
    [312, 88, 4.5],
    [56, 132, 3.5],
    [286, 18, 3.5],
    [200, 4, 3],
  ];

  return (
    <svg viewBox="0 0 340 520" className={className} fill="none">
      {/* moon phase row — first slot replaced by the matrix glyph */}
      <MatrixGlyph cx={moonXs[0]} cy={moonY} r={20} />
      <MoonPhase id="moon-1" cx={moonXs[1]} cy={moonY} r={15} offset={9} />
      <circle cx={moonXs[2]} cy={moonY - 8} r={23} fill="currentColor" />
      <MoonPhase id="moon-3" cx={moonXs[3]} cy={moonY} r={15} offset={-9} />
      <MoonPhase id="moon-4" cx={moonXs[4]} cy={moonY} r={11} offset={7} />

      {/* scattered sparkles */}
      {sparkles.map(([x, y, s], i) => (
        <path
          key={i}
          d={`M${x},${y - s} Q${x + s * 0.28},${y - s * 0.28} ${x + s},${y} Q${x + s * 0.28},${y + s * 0.28} ${x},${y + s} Q${x - s * 0.28},${y + s * 0.28} ${x - s},${y} Q${x - s * 0.28},${y - s * 0.28} ${x},${y - s} Z`}
          fill="currentColor"
          opacity="0.55"
        />
      ))}

      {/* concentric aura rings behind the meditating figure */}
      <circle cx={figureCx} cy={figureCy} r={148} stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
      <circle cx={figureCx} cy={figureCy} r={116} stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <circle cx={figureCx} cy={figureCy} r={86} stroke="currentColor" strokeWidth="1.2" opacity="0.48" />
      <circle cx={figureCx} cy={figureCy} r={58} stroke="currentColor" strokeWidth="1.2" opacity="0.65" />

      {/* seated meditating figure */}
      <circle cx={figureCx} cy={figureCy - 52} r={15} stroke="currentColor" strokeWidth="1.4" />
      <path
        d={`M${figureCx - 22},${figureCy + 32}
            Q${figureCx - 30},${figureCy + 6} ${figureCx - 13},${figureCy - 10}
            Q${figureCx - 8},${figureCy - 18} ${figureCx},${figureCy - 18}
            Q${figureCx + 8},${figureCy - 18} ${figureCx + 13},${figureCy - 10}
            Q${figureCx + 30},${figureCy + 6} ${figureCx + 22},${figureCy + 32}
            Q${figureCx},${figureCy + 44} ${figureCx - 22},${figureCy + 32}
            Z`}
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {/* resting arms hint */}
      <path
        d={`M${figureCx - 15},${figureCy + 12} Q${figureCx - 8},${figureCy + 22} ${figureCx},${figureCy + 20} Q${figureCx + 8},${figureCy + 22} ${figureCx + 15},${figureCy + 12}`}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* flower of life, bottom */}
      {(() => {
        const cx = 166;
        const cy = 452;
        const r = 21;
        const ring = Array.from({ length: 6 }, (_, i) => {
          const a = (Math.PI / 3) * i;
          return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
        });
        return (
          <g opacity="0.85">
            <circle cx={cx} cy={cy} r={r} stroke="currentColor" strokeWidth="1" />
            {ring.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={r} stroke="currentColor" strokeWidth="1" />
            ))}
            <circle cx={cx} cy={cy} r={r * 2.2} stroke="currentColor" strokeWidth="1.1" />
          </g>
        );
      })()}
    </svg>
  );
}
