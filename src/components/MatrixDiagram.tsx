import { reduce } from "@/lib/matrix";
import type { Destinations, Channels } from "@/lib/matrix";

export interface MatrixDiagramValues {
  day: number; // a (Left - 0 yrs - Purple)
  month: number; // b (Top - 20 yrs - Purple)
  year: number; // c (Right - 40 yrs - Red)
  karma: number; // d (Bottom - 60 yrs - Red)
  center: number; // e (Center - Yellow)
  ancestralStrength: number; // q (Ancestral strength)
  nw: number; // f (Top-Left - Male)
  ne: number; // g (Top-Right - Female)
  se: number; // y (Bottom-Right - Male)
  sw: number; // k (Bottom-Left - Female)
  dayAxis: [number, number, number]; // a2, a1, a3
  monthAxis: [number, number, number]; // b2, b1, b3
  yearAxis: [number, number, number]; // c2, c1, c3
  karmaAxis: [number, number, number]; // d2, d1, d3
  karmicTail?: [number, number, number];
  /** Ancestral program on the NW diagonal, ordered center -> nw corner: [ancestralPoint, pointCenter] */
  nwAxis?: [number, number];
  /** Female-lineage program on the NE diagonal, ordered center -> ne corner: [ancestralPoint, pointCenter] */
  neAxis?: [number, number];
  /** Ancestral program on the SW diagonal, ordered center -> sw corner: [ancestralPoint, pointCenter] */
  swAxis?: [number, number];
  /** Ancestral program on the SE diagonal, ordered center -> se corner: [ancestralPoint, pointCenter] */
  seAxis?: [number, number];
  destinations?: Destinations;
  channels?: Channels;
}

const DEMO_VALUES: MatrixDiagramValues = {
  day: 6,
  month: 9,
  year: 20,
  karma: 8,
  center: 7,
  ancestralStrength: 5,
  nw: 15,
  ne: 11,
  se: 10,
  sw: 14,
  dayAxis: [19, 13, 20],
  monthAxis: [7, 16, 5],
  yearAxis: [11, 9, 16],
  karmaAxis: [5, 15, 22],
  karmicTail: [8, 15, 5],
  nwAxis: [20, 8],
  neAxis: [16, 9],
  swAxis: [19, 6],
  seAxis: [15, 7],
  destinations: {
    personal: { sky: 17, earth: 8, total: 7 },
    social: { maleLine: 7, femaleLine: 7, total: 14 },
    spiritual: { total: 21 },
    planetary: { total: 8 },
  },
  channels: {
    love: { entrance: 15, energy: 11, junction: 6 },
    money: { junction: 6, energy: 15, entrance: 9 },
  },
};

interface MatrixDiagramProps {
  values?: MatrixDiagramValues;
  size?: number;
}

export default function MatrixDiagram({
  values = DEMO_VALUES,
  size = 720,
}: MatrixDiagramProps) {
  const viewH = size * 1.4; // taller than wide, to fit the Destiny clusters well above the age ring
  const cx = size / 2;
  const cy = size * 0.85;

  const outerR = size * 0.35;
  const comfortR = size * 0.22;
  const cardinalR = size * 0.052;
  const cornerR = size * 0.046;
  const centerR = size * 0.056;
  const axisR = size * 0.028;

  // Helper to convert polar coords (angle in deg, 0=top/North) to (x, y)
  const pos = (angleDeg: number, r: number) => {
    const a = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
  };

  // Main 8 Outer Vertices
  const n = pos(0, outerR); // b: Top (Month) - Purple
  const ne = pos(45, outerR); // g: Top-Right (Female)
  const e = pos(90, outerR); // c: Right (Year) - Red
  const se = pos(135, outerR); // y: Bottom-Right (Male)
  const s = pos(180, outerR); // d: Bottom (Karma) - Red
  const sw = pos(225, outerR); // k: Bottom-Left (Female)
  const w = pos(270, outerR); // a: Left (Day) - Purple
  const nw = pos(315, outerR); // f: Top-Left (Male)

  // Cardinals according to Matrix rules color scheme:
  // a (Left) & b (Top): Purple (#8b46a1)
  // c (Right) & d (Bottom): Red (#e75a4d)
  const cardinals = [
    { p: n, v: values.month, key: "month", color: "#8b46a1" },
    { p: e, v: values.year, key: "year", color: "#e75a4d" },
    { p: s, v: values.karma, key: "karma", color: "#e75a4d" },
    { p: w, v: values.day, key: "day", color: "#8b46a1" },
  ];

  // Ancestral Corners: f, g, y, k (White circles with contours)
  const corners = [
    { p: nw, v: values.nw, key: "nw", border: "#3b82f6" }, // f: Male line (blue)
    { p: ne, v: values.ne, key: "ne", border: "#ef4444" }, // g: Female line (red)
    { p: se, v: values.se, key: "se", border: "#3b82f6" }, // y: Male line (blue)
    { p: sw, v: values.sw, key: "sw", border: "#ef4444" }, // k: Female line (red)
  ];

  const axisPoint = (angleDeg: number, frac: number) => {
    const o = pos(angleDeg, outerR);
    return { x: cx + frac * (o.x - cx), y: cy + frac * (o.y - cy) };
  };

  const f3 = [0.28, 0.52, 0.76];

  // Line of Heaven (Vertical b -> d): b2, b1, b3
  const monthCircles = [
    { p: axisPoint(0, 0.38), v: values.monthAxis[2] ?? 5, bg: "#4ade80", fg: "#000" },
    { p: axisPoint(0, 0.57), v: values.monthAxis[1] ?? 16, bg: "#38bdf8", fg: "#fff" },
    { p: axisPoint(0, 0.76), v: values.monthAxis[0] ?? 7, bg: "#3b82f6", fg: "#fff" },
  ];

  // Line of Earth (Horizontal a -> c): a2, a1, a3
  const dayCircles = [
    { p: axisPoint(270, 0.38), v: values.dayAxis[2] ?? 20, bg: "#4ade80", fg: "#000" },
    { p: axisPoint(270, 0.57), v: values.dayAxis[1] ?? 13, bg: "#38bdf8", fg: "#fff" },
    { p: axisPoint(270, 0.76), v: values.dayAxis[0] ?? 19, bg: "#3b82f6", fg: "#fff" },
  ];

  // Love & Money Channel Line endpoints (connecting Love Entrance d1 on karma axis to Money Entrance c1 on year axis)
  const channelStart = axisPoint(180, 0.58); // d1 (Love Entrance - 15)
  const channelEnd = axisPoint(90, 0.58);   // Money Entrance - 9 (at 90 deg)

  const channelPos = (t: number) => ({
    x: channelStart.x + t * (channelEnd.x - channelStart.x),
    y: channelStart.y + t * (channelEnd.y - channelStart.y),
  });

  // Line of Earth, c-side (a→c horizontal): Manipura sexuality program [center, sexPoint1, sexPoint2]
  // (uses the already-computed matrix values directly — calling calculateSexualityProgram here would
  // re-run calculateMatrix on the already-reduced day/month/year and silently produce wrong numbers)
  // sexPoint1 = ancestralStrength; sexPoint2 continues the chain: reduce(center + sexPoint1).
  // Verified against avatariumlife.com for 26.07.1997 (11 -> 21).
  const sexPoint1 = values.ancestralStrength;
  const sexPoint2 = reduce(values.center + sexPoint1);

  const yearCircles = [
    { p: axisPoint(90, 0.20), v: sexPoint1, bg: "#c084fc", fg: "#ffffff", border: "#9333ea" }, // sexPoint1 (Rich soft lilac)
    { p: axisPoint(90, 0.36), v: sexPoint2, bg: "#c084fc", fg: "#ffffff", border: "#9333ea" }, // sexPoint2 (Rich soft lilac)
    { p: channelEnd, v: values.channels?.money?.entrance ?? 9, bg: "#fb923c", fg: "#fff", border: "#fb923c" }, // 9 (Orange Money Entrance at 0.58)
    { p: axisPoint(90, 0.76), v: values.yearAxis[0] ?? 11, bg: "#ffffff", fg: "#000", border: "#94a3b8" }, // 11 (White circle near cardinal 20)
  ];

  // Karmic Tail (d1, d2 - Orange) on Bottom Axis
  const karmaCircles = [
    { p: channelStart, v: values.channels?.love?.entrance ?? 15, bg: "#fb923c", fg: "#fff", border: "#fb923c" }, // d1 Orange (0.58)
    { p: axisPoint(180, 0.76), v: values.karmicTail?.[2] ?? 5, bg: "#fb923c", fg: "#fff", border: "#fb923c" }, // d2 Orange (0.76 with clean gap before cardinal 8)
  ];

  // Ancestral-diagonal small circles are slightly smaller than the axis circles so that
  // ancestralPoint (comfortR) / pointCenter (frac 0.78) / the corner (outerR) don't overlap.
  const ancestralR = axisR * 0.85;

  // NW Diagonal (ancestral program): ancestralPoint (on inner circle), pointCenter (closer to nw corner)
  const nwCircles = [
    { p: pos(315, comfortR), v: values.nwAxis?.[0] ?? 20, bg: "#ffffff", fg: "#000", border: "#94a3b8" },
    { p: axisPoint(315, 0.78), v: values.nwAxis?.[1] ?? 8, bg: "#ffffff", fg: "#000", border: "#94a3b8" },
  ];

  // NE Diagonal (Female lineage program): ancestralPoint (on inner circle), pointCenter (closer to ne corner)
  const neCircles = [
    { p: pos(45, comfortR), v: values.neAxis?.[0] ?? 16, bg: "#ffffff", fg: "#000", border: "#94a3b8" },
    { p: axisPoint(45, 0.78), v: values.neAxis?.[1] ?? 9, bg: "#ffffff", fg: "#000", border: "#94a3b8" },
  ];

  // SW Diagonal (ancestral program): ancestralPoint (on inner circle), pointCenter (closer to sw corner)
  const swCircles = [
    { p: pos(225, comfortR), v: values.swAxis?.[0] ?? 19, bg: "#ffffff", fg: "#000", border: "#94a3b8" },
    { p: axisPoint(225, 0.78), v: values.swAxis?.[1] ?? 6, bg: "#ffffff", fg: "#000", border: "#94a3b8" },
  ];

  // SE Diagonal (Love & Money Channel line 9 -> 15 -> 6 -> 21 -> 15): in a straight line connecting 9 (90 deg) to 15 (180 deg)
  const seCircles = [
    { p: channelPos(0.50), v: values.channels?.love?.junction ?? 6, bg: "#ffffff", fg: "#0f172a", border: "#fb923c" }, // 6 (Balance)
    { p: channelPos(0.25), v: values.channels?.love?.energy ?? 21, bg: "#ffffff", fg: "#0f172a", border: "#a855f7" }, // 21 (Love)
    { p: channelPos(0.75), v: values.channels?.money?.energy ?? 15, bg: "#fb923c", fg: "#fff", border: "#fb923c" }, // 15 (Money Orange)
  ];

  // SE Diagonal (ancestral program): ancestralPoint (on inner circle), pointCenter (closer to se corner)
  const seAncestralCircles = [
    { p: pos(135, comfortR), v: values.seAxis?.[0] ?? 15, bg: "#ffffff", fg: "#000", border: "#94a3b8" },
    { p: axisPoint(135, 0.78), v: values.seAxis?.[1] ?? 7, bg: "#ffffff", fg: "#000", border: "#94a3b8" },
  ];

  // Icons: Heart directly above circle 21 (love energy t=0.25), Dollar directly above circle 15 (money energy t=0.75)
  const heartPos = {
    x: channelPos(0.25).x,
    y: channelPos(0.25).y - axisR * 1.45,
  };

  const dollarPos = {
    x: channelPos(0.75).x,
    y: channelPos(0.75).y - axisR * 1.45,
  };

  const ringR = outerR * 1.14;
  const ageR = outerR * 1.25;

  // Age wheel: 0 years sits on the Day cardinal (angle 270), 80 years completes the circle.
  // Each 10-year arc is governed by recursive bisection of its two boundary points:
  //   mid5    = reduce(start + end)
  //   mid2.5  = reduce(start + mid5);   mid7.5  = reduce(mid5 + end)
  //   mid1.25 = reduce(start + mid2.5); mid3.75 = reduce(mid2.5 + mid5)
  //   mid6.25 = reduce(mid5 + mid7.5);  mid8.75 = reduce(mid7.5 + end)
  // Verified against the avatarium.life reference (24.09.1973, day=6 -> nw=15 sector): all 7 values matched.
  const formatAge = (age: number) => {
    const rounded = Math.round(age * 100) / 100;
    return rounded.toString().replace(".", ",");
  };

  type AgePoint = { age: number; angle: number; value: number; tier: "major" | "mid" | "minor"; rangeEnd?: number };

  const decadePoints = [values.day, values.nw, values.month, values.ne, values.year, values.se, values.karma, values.sw, values.day];
  const ageWheel: AgePoint[] = [];
  for (let sector = 0; sector < 8; sector++) {
    const startAge = sector * 10;
    const baseAngle = (270 + sector * 45) % 360;
    const startVal = decadePoints[sector];
    const endVal = decadePoints[sector + 1];
    const mid5 = reduce(startVal + endVal);
    const mid2_5 = reduce(startVal + mid5);
    const mid7_5 = reduce(mid5 + endVal);
    const mid1_25 = reduce(startVal + mid2_5);
    const mid3_75 = reduce(mid2_5 + mid5);
    const mid6_25 = reduce(mid5 + mid7_5);
    const mid8_75 = reduce(mid7_5 + endVal);
    const angleAt = (age: number) => (baseAngle + ((age - startAge) / 10) * 45) % 360;

    ageWheel.push({ age: startAge, angle: baseAngle, value: startVal, tier: "major" });
    ageWheel.push({ age: startAge + 1.25, angle: angleAt(startAge + 1.25), value: mid1_25, tier: "minor", rangeEnd: startAge + 2.5 });
    ageWheel.push({ age: startAge + 2.5, angle: angleAt(startAge + 2.5), value: mid2_5, tier: "minor", rangeEnd: startAge + 3.75 });
    ageWheel.push({ age: startAge + 3.75, angle: angleAt(startAge + 3.75), value: mid3_75, tier: "minor", rangeEnd: startAge + 5 });
    ageWheel.push({ age: startAge + 5, angle: angleAt(startAge + 5), value: mid5, tier: "mid" });
    ageWheel.push({ age: startAge + 6.25, angle: angleAt(startAge + 6.25), value: mid6_25, tier: "minor", rangeEnd: startAge + 7.5 });
    ageWheel.push({ age: startAge + 7.5, angle: angleAt(startAge + 7.5), value: mid7_5, tier: "minor", rangeEnd: startAge + 8.75 });
    ageWheel.push({ age: startAge + 8.75, angle: angleAt(startAge + 8.75), value: mid8_75, tier: "minor", rangeEnd: startAge + 10 });
  }

  // Strictly radial text: rotate to follow the ray from the center, flipped upright on the left half
  const radialRotation = (angle: number) => (angle > 180 && angle < 360 ? angle + 90 : angle - 90);

  // Top Destiny Arc (Дуга призначень над матрицею: j, z, s)
  const destSky = values.destinations?.personal?.sky ?? 17;
  const destEarth = values.destinations?.personal?.earth ?? 8;
  const destPersonal = values.destinations?.personal?.total ?? 7;

  const destMale = values.destinations?.social?.maleLine ?? 7;
  const destFemale = values.destinations?.social?.femaleLine ?? 7;
  const destSocial = values.destinations?.social?.total ?? 14;

  const destSpiritual = values.destinations?.spiritual?.total ?? 21;

  // Spiritual (s): strictly above the top vertex n, r/outerR measured at 2.05 on the avatarium.life reference
  const pArcSpiritual = pos(0, outerR * 2.05);

  // Personal cluster (j): measured angles/radii from the reference (avatarium.life, 24.09.1973)
  const pArcPersonal = pos(319, outerR * 1.85); // total (big) — apex, farthest out
  const pArcEarth = pos(330, outerR * 1.6); // earth (small) — closer to the top
  const pArcSky = pos(306, outerR * 1.58); // sky (small) — closer to the side

  // Social cluster (z): mirrored angles/radii
  const pArcSocial = pos(41, outerR * 1.85); // total (big) — apex, farthest out
  const pArcFemale = pos(30, outerR * 1.6); // female (small) — closer to the top
  const pArcMale = pos(53, outerR * 1.56); // male (small) — closer to the side

  // Concentric "aura" rings around a Destiny point — same center, growing radius, fading opacity
  const auraRings = (p: { x: number; y: number }, baseR: number, ringCount: number, maxScale: number, keyPrefix: string) =>
    Array.from({ length: ringCount }, (_, i) => {
      const scale = 1 + ((maxScale - 1) * (i + 1)) / ringCount;
      const opacity = 0.6 - (i * 0.3) / Math.max(1, ringCount - 1);
      return (
        <circle
          key={`${keyPrefix}-aura-${i}`}
          cx={p.x}
          cy={p.y}
          r={baseR * scale}
          fill="#E8F1FF"
          fillOpacity={opacity * 0.4}
          stroke="#4A90E2"
          strokeOpacity={opacity}
          strokeWidth={1}
        />
      );
    });

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <svg
        viewBox={`0 0 ${size} ${viewH}`}
        className="w-full h-full max-w-[900px] max-h-[1300px]"
        role="img"
        aria-label="Матриця Ізобилія (Школа Максима Ульянова)"
      >
        <defs>
          <marker
            id="blue-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path d="M0,1 L8,4 L0,7 Z" fill="#3b82f6" />
          </marker>
          <marker
            id="red-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path d="M0,1 L8,4 L0,7 Z" fill="#ef4444" />
          </marker>
        </defs>

        {/* Decorative focus halo behind the whole matrix (octagon + age wheel) */}
        <circle
          cx={cx}
          cy={cy}
          r={outerR * 1.32}
          fill="#582C4D"
          fillOpacity={0.04}
          stroke="#582C4D"
          strokeOpacity={0.25}
          strokeWidth={1}
        />
        <circle
          cx={cx}
          cy={cy}
          r={outerR * 1.38}
          fill="none"
          stroke="#743f52"
          strokeOpacity={0.55}
          strokeWidth={outerR * 0.08}
        />

        {/* Top Destiny Arc (Верхній блок призначень над матрицею) */}
        <g key="destiny-top-arc">
          {/* Connector from the month cardinal up to Spiritual, matching the reference */}
          <line x1={n.x} y1={n.y} x2={pArcSpiritual.x} y2={pArcSpiritual.y} stroke="#94a3b8" strokeWidth={1} />

          {/* Personal cluster (NW ray, opposite "10 лет"): Sky, Earth -> Personal Orange */}
          <g>
            {auraRings(pArcSky, axisR * 0.9, 2, 1.7, "sky")}
            <circle cx={pArcSky.x} cy={pArcSky.y} r={axisR * 0.9} fill="#ffffff" stroke="#94a3b8" strokeWidth={1.5} />
            <text x={pArcSky.x} y={pArcSky.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.8} fontWeight={700} fill="#475569">{destSky}</text>
          </g>
          <g>
            {auraRings(pArcEarth, axisR * 0.9, 2, 1.7, "earth")}
            <circle cx={pArcEarth.x} cy={pArcEarth.y} r={axisR * 0.9} fill="#ffffff" stroke="#94a3b8" strokeWidth={1.5} />
            <text x={pArcEarth.x} y={pArcEarth.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.8} fontWeight={700} fill="#475569">{destEarth}</text>
          </g>
          {/* Personal Destiny */}
          <g>
            {auraRings(pArcPersonal, axisR * 1.05, 3, 1.8, "personal")}
            <circle cx={pArcPersonal.x} cy={pArcPersonal.y} r={axisR * 1.05} fill="#ead1dc" stroke="#ffffff" strokeWidth={2} />
            <text x={pArcPersonal.x} y={pArcPersonal.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.9} fontWeight={800} fill="#7a2e4a">{destPersonal}</text>
          </g>

          {/* Social cluster (NE ray, opposite "30 лет"): Male, Female -> Social Orange */}
          <g>
            {auraRings(pArcMale, axisR * 0.9, 2, 1.7, "male")}
            <circle cx={pArcMale.x} cy={pArcMale.y} r={axisR * 0.9} fill="#ffffff" stroke="#94a3b8" strokeWidth={1.5} />
            <text x={pArcMale.x} y={pArcMale.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.8} fontWeight={700} fill="#475569">{destMale}</text>
          </g>
          <g>
            {auraRings(pArcFemale, axisR * 0.9, 2, 1.7, "female")}
            <circle cx={pArcFemale.x} cy={pArcFemale.y} r={axisR * 0.9} fill="#ffffff" stroke="#94a3b8" strokeWidth={1.5} />
            <text x={pArcFemale.x} y={pArcFemale.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.8} fontWeight={700} fill="#475569">{destFemale}</text>
          </g>
          {/* Social Destiny */}
          <g>
            {auraRings(pArcSocial, axisR * 1.05, 3, 1.8, "social")}
            <circle cx={pArcSocial.x} cy={pArcSocial.y} r={axisR * 1.05} fill="#ead1dc" stroke="#ffffff" strokeWidth={2} />
            <text x={pArcSocial.x} y={pArcSocial.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.9} fontWeight={800} fill="#7a2e4a">{destSocial}</text>
          </g>

          {/* Spiritual Destiny — biggest aura of the group */}
          <g>
            {auraRings(pArcSpiritual, axisR * 1.15, 3, 2.4, "spiritual")}
            <circle cx={pArcSpiritual.x} cy={pArcSpiritual.y} r={axisR * 1.15} fill="#ead1dc" stroke="#ffffff" strokeWidth={2} />
            <text x={pArcSpiritual.x} y={pArcSpiritual.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR} fontWeight={800} fill="#7a2e4a">{destSpiritual}</text>
          </g>
        </g>

        {/* Outer Age Ring Circle */}
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth={1.5}
        />

        {/* Outer Age Scale + per-period arcana (recursive bisection wheel) */}
        {ageWheel.map((m, i) => {
          if (m.tier === "major") {
            const p = pos(m.angle, ageR);
            return (
              <text
                key={`age-${i}`}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={size * 0.017}
                fontWeight={600}
                fill="#64748b"
              >
                {formatAge(m.age)}
              </text>
            );
          }

          // 3 layers, all on the same radial ray: dot (on the line) -> arcana (bigger) -> range/age text (outermost)
          const dotR = ringR * 1.02;
          const arcanaR = ringR + (ageR - ringR) * 0.5;
          const outerR2 = m.tier === "minor" ? ageR + (ageR - ringR) * 0.35 : ringR + (ageR - ringR) * 0.85;

          const dot = pos(m.angle, dotR);
          const arcanaP = pos(m.angle, arcanaR);
          const outerP = pos(m.angle, outerR2);
          const rot = radialRotation(m.angle);
          const outerText = m.tier === "mid" ? formatAge(m.age) : `${formatAge(m.age)}-${formatAge(m.rangeEnd!)}`;

          return (
            <g key={`age-${i}`}>
              <circle cx={dot.x} cy={dot.y} r={size * 0.003} fill="#94a3b8" />
              <text
                x={arcanaP.x}
                y={arcanaP.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={m.tier === "mid" ? size * 0.014 : size * 0.011}
                fontWeight={700}
                fill={m.tier === "mid" ? "#475569" : "#64748b"}
                transform={`rotate(${rot} ${arcanaP.x} ${arcanaP.y})`}
              >
                {m.value}
              </text>
              <text
                x={outerP.x}
                y={outerP.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={m.tier === "mid" ? size * 0.011 : size * 0.008}
                fontWeight={m.tier === "mid" ? 600 : 400}
                fill="#94a3b8"
                transform={`rotate(${rot} ${outerP.x} ${outerP.y})`}
              >
                {outerText}
              </text>
            </g>
          );
        })}

        {/* Outer Octagon Contour (Восьмикутний зовнішній контур Октограми) */}
        <polygon
          points={[n, ne, e, se, s, sw, w, nw].map((p) => `${p.x},${p.y}`).join(" ")}
          fill="rgba(248, 250, 252, 0.3)"
          stroke="#64748b"
          strokeWidth={1.5}
        />

        {/* Ancestral Rotated Square (Родовий квадрат: nw - ne - se - sw) */}
        <polygon
          points={[nw, ne, se, sw].map((p) => `${p.x},${p.y}`).join(" ")}
          fill="rgba(30, 41, 59, 0.03)"
          stroke="#1e293b"
          strokeWidth={1.5}
        />

        {/* Personal Straight Square (Особистісний квадрат: n - e - s - w) */}
        <polygon
          points={[n, e, s, w].map((p) => `${p.x},${p.y}`).join(" ")}
          fill="rgba(15, 23, 42, 0.02)"
          stroke="#1e293b"
          strokeWidth={1.5}
        />

        {/* Inner Comfort Zone Circle */}
        <circle
          cx={cx}
          cy={cy}
          r={comfortR}
          fill="none"
          stroke="#94a3b8"
          strokeWidth={1}
        />

        {/* Ancestral Male Line (f -> y: Blue Line) */}
        <line
          x1={nw.x}
          y1={nw.y}
          x2={se.x}
          y2={se.y}
          stroke="#3b82f6"
          strokeWidth={1.5}
          markerEnd="url(#blue-arrow)"
        />

        {/* Ancestral Female Line (k -> g: Red Line) */}
        <line
          x1={sw.x}
          y1={sw.y}
          x2={ne.x}
          y2={ne.y}
          stroke="#ef4444"
          strokeWidth={1.5}
          markerEnd="url(#red-arrow)"
        />

        {/* Main Axis Lines (b-d Line of Heaven and a-c Line of Earth) */}
        <line x1={n.x} y1={n.y} x2={s.x} y2={s.y} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={w.x} y1={w.y} x2={e.x} y2={e.y} stroke="#cbd5e1" strokeWidth={1} />

        {/* Love & Money Channel Line (connecting d1 to c1 in a single straight line) */}
        <line
          x1={channelStart.x}
          y1={channelStart.y}
          x2={channelEnd.x}
          y2={channelEnd.y}
          stroke="#fb923c"
          strokeWidth={1.5}
        />

        {/* Cardinal Nodes (a, b, c, d - Purple/Red Circles) */}
        {cardinals.map((c) => (
          <g key={c.key}>
            <circle
              cx={c.p.x}
              cy={c.p.y}
              r={cardinalR}
              fill={c.color}
              stroke="#ffffff"
              strokeWidth={2}
            />
            <text
              x={c.p.x}
              y={c.p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={cardinalR * 0.95}
              fontWeight={800}
              fill="#ffffff"
            >
              {c.v}
            </text>
          </g>
        ))}

        {/* Month Axis Circles (b / Line of Heaven) */}
        {monthCircles.map((c, i) => (
          <g key={`m-axis-${i}`}>
            <circle cx={c.p.x} cy={c.p.y} r={axisR} fill={c.bg} stroke="#ffffff" strokeWidth={1.5} />
            <text x={c.p.x} y={c.p.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.9} fontWeight={700} fill={c.fg}>
              {c.v}
            </text>
          </g>
        ))}

        {/* Day Axis Circles (a / Line of Earth) */}
        {dayCircles.map((c, i) => (
          <g key={`d-axis-${i}`}>
            <circle cx={c.p.x} cy={c.p.y} r={axisR} fill={c.bg} stroke="#ffffff" strokeWidth={1.5} />
            <text x={c.p.x} y={c.p.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.9} fontWeight={700} fill={c.fg}>
              {c.v}
            </text>
          </g>
        ))}

        {/* Year Axis Circles (c / Money Entrance c1 Orange!) */}
        {yearCircles.map((c, i) => (
          <g key={`y-axis-${i}`}>
            <circle cx={c.p.x} cy={c.p.y} r={axisR} fill={c.bg} stroke={c.border} strokeWidth={1.5} />
            <text x={c.p.x} y={c.p.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.9} fontWeight={700} fill={c.fg}>
              {c.v}
            </text>
          </g>
        ))}

        {/* Karma Axis Circles (d / Karmic Tail d1, d2 Orange!) */}
        {karmaCircles.map((c, i) => (
          <g key={`k-axis-${i}`}>
            <circle cx={c.p.x} cy={c.p.y} r={axisR} fill={c.bg} stroke={c.border} strokeWidth={1.5} />
            <text x={c.p.x} y={c.p.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.9} fontWeight={700} fill={c.fg}>
              {c.v}
            </text>
          </g>
        ))}

        {/* Diagonal Circles (NW f) */}
        {nwCircles.map((c, i) => (
          <g key={`nw-axis-${i}`}>
            <circle cx={c.p.x} cy={c.p.y} r={ancestralR} fill={c.bg} stroke={c.border} strokeWidth={1.5} />
            <text x={c.p.x} y={c.p.y} textAnchor="middle" dominantBaseline="central" fontSize={ancestralR * 0.9} fontWeight={700} fill={c.fg}>
              {c.v}
            </text>
          </g>
        ))}

        {/* Diagonal Circles (NE g) */}
        {neCircles.map((c, i) => (
          <g key={`ne-axis-${i}`}>
            <circle cx={c.p.x} cy={c.p.y} r={ancestralR} fill={c.bg} stroke={c.border} strokeWidth={1.5} />
            <text x={c.p.x} y={c.p.y} textAnchor="middle" dominantBaseline="central" fontSize={ancestralR * 0.9} fontWeight={700} fill={c.fg}>
              {c.v}
            </text>
          </g>
        ))}

        {/* Diagonal Circles (SW k) */}
        {swCircles.map((c, i) => (
          <g key={`sw-axis-${i}`}>
            <circle cx={c.p.x} cy={c.p.y} r={ancestralR} fill={c.bg} stroke={c.border} strokeWidth={1.5} />
            <text x={c.p.x} y={c.p.y} textAnchor="middle" dominantBaseline="central" fontSize={ancestralR * 0.9} fontWeight={700} fill={c.fg}>
              {c.v}
            </text>
          </g>
        ))}

        {/* Diagonal Circles (SE y - Money & Love Channel x, x1, x2) */}
        {seCircles.map((c, i) => (
          <g key={`se-axis-${i}`}>
            <circle cx={c.p.x} cy={c.p.y} r={axisR} fill={c.bg} stroke={c.border} strokeWidth={1.5} />
            <text x={c.p.x} y={c.p.y} textAnchor="middle" dominantBaseline="central" fontSize={axisR * 0.9} fontWeight={700} fill={c.fg}>
              {c.v}
            </text>
          </g>
        ))}

        {/* Diagonal Circles (SE y - Ancestral program) */}
        {seAncestralCircles.map((c, i) => (
          <g key={`se-ancestral-${i}`}>
            <circle cx={c.p.x} cy={c.p.y} r={ancestralR} fill={c.bg} stroke={c.border} strokeWidth={1.5} />
            <text x={c.p.x} y={c.p.y} textAnchor="middle" dominantBaseline="central" fontSize={ancestralR * 0.9} fontWeight={700} fill={c.fg}>
              {c.v}
            </text>
          </g>
        ))}

        {/* RED HEART ICON (♥) */}
        <g key="heart-icon">
          <text
            x={heartPos.x}
            y={heartPos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={size * 0.04}
            fill="#ef4444"
          >
            ♥
          </text>
        </g>

        {/* GREEN DOLLAR ICON ($) */}
        <g key="dollar-icon">
          <text
            x={dollarPos.x}
            y={dollarPos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={size * 0.045}
            fontWeight={900}
            fill="#16a34a"
          >
            $
          </text>
        </g>

        {/* Ancestral Corner Nodes (f, g, y, k - White Circles) */}
        {corners.map((c) => (
          <g key={c.key}>
            <circle
              cx={c.p.x}
              cy={c.p.y}
              r={cornerR}
              fill="#ffffff"
              stroke={c.border}
              strokeWidth={2.5}
            />
            <text
              x={c.p.x}
              y={c.p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={cornerR * 0.95}
              fontWeight={800}
              fill="#0f172a"
            >
              {c.v}
            </text>
          </g>
        ))}

        {/* Cardinal Nodes (a, b, c, d - Purple/Red Circles) */}
        {cardinals.map((c) => (
          <g key={c.key}>
            <circle
              cx={c.p.x}
              cy={c.p.y}
              r={cardinalR}
              fill={c.color}
              stroke="#ffffff"
              strokeWidth={2}
            />
            <text
              x={c.p.x}
              y={c.p.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={cardinalR * 0.95}
              fontWeight={800}
              fill="#ffffff"
            >
              {c.v}
            </text>
          </g>
        ))}

        {/* Center Node e (Comfort Zone - Yellow Circle) */}
        <circle
          cx={cx}
          cy={cy}
          r={centerR}
          fill="#fbbf24"
          stroke="#0f172a"
          strokeWidth={2.5}
        />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={centerR * 0.95}
          fontWeight={800}
          fill="#0f172a"
        >
          {values.center}
        </text>
      </svg>
    </div>
  );
}
