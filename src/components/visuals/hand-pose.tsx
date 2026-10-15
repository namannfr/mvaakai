/**
 * Generates a 21-keypoint hand skeleton (the MediaPipe/OpenPose convention used
 * for hand-pose annotation): wrist, then 4 joints for each of the five fingers.
 * Purely illustrative geometry for the site's technical diagrams.
 */

type Pt = [number, number];

// Canonical open right hand, wrist at origin, fingers pointing toward -y. Unit ≈ palm length.
const OPEN: Pt[] = [
  [0, 0],
  [-0.3, -0.16], [-0.52, -0.36], [-0.68, -0.54], [-0.8, -0.7],
  [-0.22, -0.86], [-0.27, -1.2], [-0.29, -1.42], [-0.31, -1.6],
  [0, -0.92], [0, -1.3], [0, -1.54], [0, -1.74],
  [0.19, -0.86], [0.22, -1.2], [0.24, -1.41], [0.26, -1.57],
  [0.35, -0.75], [0.41, -1.0], [0.45, -1.17], [0.48, -1.31],
];

const FINGERS = [
  [0, 1, 2, 3, 4],
  [0, 5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
  [0, 17, 18, 19, 20],
];
const PALM = [5, 9, 13, 17];

export type HandPose = {
  x: number;
  y: number;
  scale: number;
  /** Degrees, clockwise. */
  rotate?: number;
  /** Mirror for a left hand. */
  left?: boolean;
  /** 0 = open, 1 = closed grasp. */
  curl?: number;
};

export function handKeypoints({ x, y, scale, rotate = 0, left = false, curl = 0 }: HandPose): Pt[] {
  const rad = (rotate * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return OPEN.map(([px, py], i) => {
    if (i > 0) {
      const finger = Math.floor((i - 1) / 4);
      const joint = (i - 1) % 4; // 0 = base … 3 = tip
      const base = OPEN[finger * 4 + 1];
      const k = finger === 0 ? 0.45 : [0, 0.35, 0.62, 0.82][joint];
      const c = curl * k;
      // Fold the finger back toward the palm centre.
      px = px + (base[0] - px) * c * 0.6 + (finger === 0 ? 0.25 * c : 0);
      py = py + (base[1] - py) * c * 1.4 + 0.35 * c * (joint / 3);
    }
    const mx = left ? -px : px;
    return [x + scale * (mx * cos - py * sin), y + scale * (mx * sin + py * cos)];
  });
}

export function HandSkeleton({
  pose,
  color = "#c5f467",
  jointColor = "#ffffff",
  strokeWidth = 2.25,
  radius = 3,
}: {
  pose: HandPose;
  color?: string;
  jointColor?: string;
  strokeWidth?: number;
  radius?: number;
}) {
  const p = handKeypoints(pose);
  const line = (ids: number[]) => ids.map((i) => `${p[i][0].toFixed(1)},${p[i][1].toFixed(1)}`).join(" ");
  return (
    <g>
      {FINGERS.map((f, i) => (
        <polyline key={i} points={line(f)} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <polyline points={line(PALM)} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" opacity={0.8} />
      {p.map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx.toFixed(1)}
          cy={cy.toFixed(1)}
          r={i === 0 ? radius + 1 : [4, 8, 12, 16, 20].includes(i) ? radius : radius - 0.6}
          fill={jointColor}
          stroke={color}
          strokeWidth={1.5}
        />
      ))}
    </g>
  );
}

/**
 * Solid hand shape (the "raw footage" hand) built from the same keypoints: a palm
 * polygon plus rounded finger strokes, with a forearm running out of frame.
 */
export function HandShape({
  pose,
  skin = "#b07a56",
  shade = "#8a5a3c",
  sleeve = "#2b333d",
}: {
  pose: HandPose;
  skin?: string;
  shade?: string;
  sleeve?: string;
}) {
  const p = handKeypoints(pose);
  const s = pose.scale;
  const pt = (i: number) => `${p[i][0].toFixed(1)},${p[i][1].toFixed(1)}`;
  const finger = (ids: number[]) => ids.map(pt).join(" ");
  // Fingers point along (sin θ, −cos θ); the forearm runs the opposite way, out of frame.
  const rad = ((pose.rotate ?? 0) * Math.PI) / 180;
  const forearmEnd = `${(p[0][0] - Math.sin(rad) * s * 2.2).toFixed(1)},${(p[0][1] + Math.cos(rad) * s * 2.2).toFixed(1)}`;
  const palm = [0, 1, 5, 9, 13, 17].map(pt).join(" ");
  const fingers = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ];
  const widths = [0.2, 0.17, 0.18, 0.165, 0.14];
  return (
    <g>
      <polyline points={`${pt(0)} ${forearmEnd}`} stroke={sleeve} strokeWidth={s * 0.62} strokeLinecap="round" fill="none" />
      <polyline points={`${pt(0)} ${forearmEnd}`} stroke={shade} strokeWidth={s * 0.5} strokeLinecap="round" fill="none" />
      <polygon points={palm} fill={skin} stroke={shade} strokeWidth={s * 0.07} strokeLinejoin="round" />
      {fingers.map((f, i) => (
        <g key={i}>
          <polyline points={finger(f)} fill="none" stroke={shade} strokeWidth={s * (widths[i] + 0.035)} strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={finger(f)} fill="none" stroke={skin} strokeWidth={s * widths[i]} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
      <polygon points={palm} fill={skin} />
    </g>
  );
}
