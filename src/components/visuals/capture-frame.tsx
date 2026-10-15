import { HandShape, HandSkeleton, type HandPose } from "./hand-pose";

/**
 * Schematic first-person capture frame: a line-drawn scene viewed from the wearer's
 * perspective, with the annotation layers Mvaak delivers (hand keypoints, object
 * boxes, sub-action labels) overlaid. Illustrative — not a product screenshot.
 */

export type Scene = "household" | "commercial" | "agricultural" | "cup";

export type FrameLayers = { hands: boolean; objects: boolean; labels: boolean };
const ALL_LAYERS: FrameLayers = { hands: true, objects: true, labels: true };

const LINE = "rgb(232 236 244 / 0.44)";
const LINE_SOFT = "rgb(232 236 244 / 0.2)";
const BOX = "#c5f467";

type SceneSpec = {
  hands: HandPose[];
  box: { x: number; y: number; w: number; h: number; label: string };
  subAction: string;
  rig: string;
  /** Optional transform that frames the subject (e.g. zooms in on the work surface). */
  zoom?: string;
  /** Background gradient (top, bottom). Defaults to the navy capture tone. */
  bg?: [string, string];
  drawing: React.ReactNode;
};

/** Warm, filled "real footage" scene: reaching for a ceramic cup on a wooden table. */
function CupScene({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-table`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a5a42" />
          <stop offset="1" stopColor="#4a3527" />
        </linearGradient>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cfc8bd" />
          <stop offset="0.45" stopColor="#f4f0ea" />
          <stop offset="1" stopColor="#bdb5a9" />
        </linearGradient>
      </defs>
      {/* wall and window light */}
      <rect x="430" y="0" width="210" height="160" fill="rgb(255 244 220 / 0.06)" />
      <path d="M0 214 L640 196 L640 400 L0 400 Z" fill={`url(#${id}-table)`} />
      <path d="M0 214 L640 196" stroke="rgb(255 236 210 / 0.35)" strokeWidth="2" />
      {[250, 290, 340].map((y) => (
        <path key={y} d={`M0 ${y} C 200 ${y - 8}, 420 ${y - 4}, 640 ${y - 14}`} stroke="rgb(0 0 0 / 0.12)" strokeWidth="2" fill="none" />
      ))}
      {/* jar and plate in the background */}
      <rect x="92" y="128" width="64" height="96" rx="10" fill="#8a9199" opacity="0.5" />
      <rect x="98" y="118" width="52" height="14" rx="4" fill="#9a7b5c" opacity="0.8" />
      <ellipse cx="200" cy="262" rx="88" ry="24" fill="#ddd6ca" />
      <ellipse cx="200" cy="258" rx="66" ry="16" fill="#ece6dc" />
      {/* saucer, cup, handle */}
      <ellipse cx="368" cy="298" rx="88" ry="22" fill="rgb(0 0 0 / 0.25)" />
      <ellipse cx="364" cy="290" rx="84" ry="20" fill="#e3ddd2" />
      <path d="M318 206 L322 282 Q364 300 406 282 L410 206 Z" fill={`url(#${id}-cup)`} />
      <path d="M410 222 C 446 222, 446 268, 406 266" stroke="#d8d1c6" strokeWidth="10" fill="none" strokeLinecap="round" />
      <ellipse cx="364" cy="206" rx="46" ry="13" fill="#f7f4ef" />
      <ellipse cx="364" cy="207" rx="38" ry="9" fill="#6b4a32" />
    </g>
  );
}

function Household() {
  return (
    <g>
      {/* counter edge and backsplash */}
      <path d="M0 238 C 180 222, 460 222, 640 236" stroke={LINE} strokeWidth="2" fill="none" />
      <path d="M0 238 C 180 222, 460 222, 640 236 L640 400 L0 400 Z" fill="rgb(232 236 244 / 0.035)" />
      {[60, 150, 240].map((y) => (
        <path key={y} d={`M0 ${y / 1.6} H640`} stroke={LINE_SOFT} strokeWidth="1" />
      ))}
      {/* tawa on a burner */}
      <ellipse cx="372" cy="292" rx="132" ry="42" stroke={LINE} strokeWidth="2" fill="rgb(7 17 31 / 0.6)" />
      <ellipse cx="372" cy="290" rx="112" ry="33" stroke={LINE_SOFT} strokeWidth="1.5" fill="none" />
      <path d="M504 290 L606 270" stroke={LINE} strokeWidth="6" strokeLinecap="round" />
      {/* roti on the tawa */}
      <ellipse cx="364" cy="286" rx="62" ry="19" stroke="rgb(232 236 244 / 0.6)" strokeWidth="2" fill="rgb(232 236 244 / 0.06)" />
      {/* dough bowl and rolling pin */}
      <ellipse cx="98" cy="300" rx="64" ry="20" stroke={LINE} strokeWidth="2" fill="none" />
      <path d="M38 300 C 44 344, 152 344, 160 300" stroke={LINE} strokeWidth="2" fill="none" />
      <path d="M150 360 L 250 342" stroke={LINE} strokeWidth="9" strokeLinecap="round" />
      {/* spatula held in the right hand */}
      <path d="M462 322 L408 290" stroke="rgb(232 236 244 / 0.6)" strokeWidth="5" strokeLinecap="round" />
      <path d="M408 290 L384 280" stroke="rgb(232 236 244 / 0.6)" strokeWidth="12" strokeLinecap="round" />
    </g>
  );
}

function Commercial() {
  const shelves = [118, 196, 274];
  const boxes = [
    [36, 58, 70], [116, 46, 70], [176, 64, 70], [354, 54, 70], [418, 70, 70], [500, 52, 70], [562, 60, 70],
    [30, 72, 64], [114, 54, 64], [178, 50, 64], [240, 66, 64], [396, 58, 64], [468, 72, 64], [550, 62, 64],
    [44, 60, 58], [116, 64, 58], [394, 50, 58], [456, 62, 58], [530, 70, 58],
  ];
  return (
    <g>
      {shelves.map((y) => (
        <g key={y}>
          <path d={`M0 ${y} H640`} stroke={LINE} strokeWidth="2.5" />
          <path d={`M0 ${y + 6} H640`} stroke={LINE_SOFT} strokeWidth="1" />
        </g>
      ))}
      {boxes.map(([x, w, h], i) => {
        const shelf = i < 7 ? shelves[0] : i < 14 ? shelves[1] : shelves[2];
        return <rect key={i} x={x} y={shelf - h} width={w} height={h - 4} rx="3" stroke={LINE} strokeWidth="1.5" fill="rgb(232 236 244 / 0.03)" />;
      })}
      {/* box being picked */}
      <rect x="262" y="186" width="86" height="64" rx="3" stroke="rgb(232 236 244 / 0.7)" strokeWidth="2" fill="rgb(232 236 244 / 0.07)" transform="rotate(-6 305 218)" />
      <path d="M0 330 L640 330" stroke={LINE_SOFT} />
      <path d="M200 400 L260 330 M440 400 L380 330" stroke={LINE_SOFT} />
    </g>
  );
}

function Agricultural() {
  const vx = 320;
  const vy = 120;
  const rows = [-520, -330, -170, -50, 50, 170, 330, 520];
  return (
    <g>
      <path d={`M0 ${vy} H640`} stroke={LINE} strokeWidth="1.5" />
      <path d={`M0 ${vy} H640 V400 H0 Z`} fill="rgb(232 236 244 / 0.03)" />
      {rows.map((dx) => (
        <path key={dx} d={`M${vx} ${vy} L${vx + dx * 1.4} 400`} stroke={LINE_SOFT} strokeWidth="1.5" />
      ))}
      {rows.flatMap((dx) =>
        [0.28, 0.45, 0.64, 0.86].map((t) => {
          const x = vx + dx * 1.4 * t + (dx > 0 ? 14 : -14) * t;
          const y = vy + (400 - vy) * t;
          const s = 3 + 9 * t;
          return (
            <path
              key={`${dx}-${t}`}
              d={`M${x} ${y} l${-s * 0.7} ${-s} M${x} ${y} l${s * 0.7} ${-s} M${x} ${y} v${-s * 1.2}`}
              stroke={LINE}
              strokeWidth={1 + t}
              strokeLinecap="round"
            />
          );
        }),
      )}
      {/* seedling held for transplanting */}
      <path d="M352 236 l-16 -30 M352 236 l14 -34 M352 236 l2 -40" stroke="rgb(232 236 244 / 0.75)" strokeWidth="3" strokeLinecap="round" />
      <path d="M352 236 l-4 26" stroke="rgb(232 236 244 / 0.45)" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

const SCENES: Record<Scene, SceneSpec> = {
  cup: {
    drawing: null,
    bg: ["#2e333a", "#23282f"],
    hands: [
      { x: 520, y: 398, scale: 112, rotate: -42, curl: 0.38 },
      { x: 120, y: 440, scale: 100, rotate: 26, left: true, curl: 0.15 },
    ],
    box: { x: 304, y: 184, w: 150, h: 120, label: "ceramic_cup · obj_01" },
    subAction: "grasp",
    rig: "STANDARD · STEREO RGB + IMU",
  },
  household: {
    drawing: <Household />,
    hands: [
      { x: 168, y: 396, scale: 104, rotate: 30, left: true, curl: 0.2 },
      { x: 520, y: 392, scale: 100, rotate: -42, curl: 0.82 },
    ],
    box: { x: 296, y: 260, w: 138, h: 50, label: "roti · obj_02" },
    subAction: "flip_roti",
    zoom: "translate(-96 -170) scale(1.3)",
    rig: "STANDARD · STEREO RGB + IMU",
  },
  commercial: {
    drawing: <Commercial />,
    hands: [
      { x: 326, y: 372, scale: 104, rotate: -6, curl: 0.45 },
      { x: 128, y: 404, scale: 100, rotate: 24, left: true, curl: 0.2 },
    ],
    box: { x: 250, y: 172, w: 112, h: 92, label: "sku_box · obj_11" },
    subAction: "pick_from_shelf",
    rig: "SCALE · MONO RGB + IMU",
  },
  agricultural: {
    drawing: <Agricultural />,
    hands: [
      { x: 420, y: 386, scale: 96, rotate: -30, curl: 0.85 },
      { x: 176, y: 404, scale: 98, rotate: 26, left: true, curl: 0.25 },
    ],
    box: { x: 322, y: 186, w: 64, h: 84, label: "seedling · obj_04" },
    subAction: "transplant_seedling",
    rig: "SCALE · MONO RGB + IMU",
  },
};

export function CaptureFrame({
  scene,
  className,
  title,
  showHud = true,
  episode = "ep_0142",
  uid,
  layers = ALL_LAYERS,
}: {
  scene: Scene;
  className?: string;
  title: string;
  showHud?: boolean;
  episode?: string;
  /** Unique per instance on a page (SVG defs and title ids must not repeat). */
  uid?: string;
  /** Which annotation overlays are visible (all by default). */
  layers?: FrameLayers;
}) {
  const s = SCENES[scene];
  const id = `cf-${uid ?? `${scene}-${episode}`}`;
  return (
    <svg viewBox="0 0 640 400" className={className} role="img" aria-labelledby={`${id}-t`}>
      <title id={`${id}-t`}>{title}</title>
      <defs>
        <radialGradient id={`${id}-v`} cx="50%" cy="45%" r="75%">
          <stop offset="55%" stopColor="#151a21" stopOpacity="0" />
          <stop offset="100%" stopColor="#151a21" stopOpacity="0.85" />
        </radialGradient>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={s.bg?.[0] ?? "#1e252e"} />
          <stop offset="1" stopColor={s.bg?.[1] ?? "#12161c"} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <rect width="640" height="400" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="640" height="400" fill={`url(#${id}-bg)`} />
        <g transform={s.zoom}>
        {scene === "cup" ? <CupScene id={id} /> : s.drawing}
        {s.hands.map((h, i) => (
          <HandShape key={i} pose={h} />
        ))}
        <g className="transition-opacity duration-500" opacity={layers.hands ? 1 : 0}>
          {s.hands.map((h, i) => (
            <HandSkeleton key={i} pose={h} />
          ))}
        </g>
        <g className="transition-opacity duration-500" opacity={layers.objects ? 1 : 0}>
        <rect x={s.box.x} y={s.box.y} width={s.box.w} height={s.box.h} fill="none" stroke={BOX} strokeWidth="1.75" strokeDasharray="6 4" rx="2" />
        <g transform={`translate(${s.box.x} ${s.box.y - 24})`}>
          <rect width={s.box.label.length * 7.4 + 16} height="20" rx="3" fill={BOX} />
          <text x="8" y="14" fontFamily="var(--font-geist-mono), monospace" fontSize="11.5" fill="#151a21" fontWeight="600">
            {s.box.label}
          </text>
        </g>
        </g>
        </g>
        <rect width="640" height="400" fill={`url(#${id}-v)`} />
        {showHud && (
          <g fontFamily="var(--font-geist-mono), monospace" fontSize="11" fill="rgb(232 236 244 / 0.82)" letterSpacing="0.06em">
            <circle cx="24" cy="25" r="4" fill="#ff5d5d" className="animate-pulse-dot" />
            <text x="36" y="29">{episode.toUpperCase()}</text>
            <text x="616" y="29" textAnchor="end">{s.rig}</text>
            <g transform="translate(20 44)" className="transition-opacity duration-500" opacity={layers.labels ? 1 : 0}>
              <rect width={s.subAction.length * 7 + 108} height="22" rx="4" fill="rgb(7 17 31 / 0.75)" stroke="rgb(232 236 244 / 0.18)" />
              <text x="10" y="15" fill="#c5f467">SUB-ACTION</text>
              <text x="96" y="15">{s.subAction}</text>
            </g>
            <text x="616" y="59" textAnchor="end" fill="rgb(232 236 244 / 0.6)" className="transition-opacity duration-500" opacity={layers.hands ? 1 : 0}>
              21 kp × 2 hands
            </text>
            {/* corner brackets */}
            <path d="M12 376 V388 H24 M628 376 V388 H616" stroke="rgb(232 236 244 / 0.35)" fill="none" strokeWidth="1.5" />
          </g>
        )}
      </g>
    </svg>
  );
}
