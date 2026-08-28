interface MiniMatrixIconProps {
  className?: string;
}

/** Small decorative echo of the matrix diagram (straight + diagonal square), no numbers. */
export default function MiniMatrixIcon({ className = "" }: MiniMatrixIconProps) {
  const cx = 24;
  const cy = 24;
  const r = 17;
  const pos = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
  };
  const n = pos(0);
  const ne = pos(45);
  const e = pos(90);
  const se = pos(135);
  const s = pos(180);
  const sw = pos(225);
  const w = pos(270);
  const nw = pos(315);
  const dot = (p: { x: number; y: number }, radius = 2) => (
    <circle cx={p.x} cy={p.y} r={radius} fill="currentColor" />
  );

  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <polygon
        points={[nw, ne, se, sw].map((p) => `${p.x},${p.y}`).join(" ")}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <polygon
        points={[n, e, s, w].map((p) => `${p.x},${p.y}`).join(" ")}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      {dot(n)}
      {dot(e)}
      {dot(s)}
      {dot(w)}
      {dot(nw, 1.5)}
      {dot(ne, 1.5)}
      {dot(se, 1.5)}
      {dot(sw, 1.5)}
      {dot({ x: cx, y: cy }, 2.5)}
    </svg>
  );
}
