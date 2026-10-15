/**
 * Flat illustration of a small partner team with data-collection equipment:
 * smart glasses, an action camera, a laptop showing an annotation timeline and a
 * capture checklist. Illustrative only.
 */

type Person = { x: number; skin: string; shirt: string; hair: string; role: string; glasses?: boolean };

const people: Person[] = [
  { x: 150, skin: "#c68e6b", shirt: "#151a21", hair: "#2a1d16", role: "Capture lead", glasses: true },
  { x: 290, skin: "#9a6a4b", shirt: "#4a6b0e", hair: "#1b1410", role: "QA reviewer" },
  { x: 430, skin: "#b57e5c", shirt: "#737b84", hair: "#3a2a20", role: "Coordinator" },
];

function Figure({ p }: { p: Person }) {
  const { x } = p;
  return (
    <g>
      {/* torso */}
      <path d={`M${x - 58} 268 C ${x - 58} 196, ${x - 34} 174, ${x} 174 C ${x + 34} 174, ${x + 58} 196, ${x + 58} 268 Z`} fill={p.shirt} />
      {/* neck + head */}
      <rect x={x - 10} y={150} width={20} height={30} rx={8} fill={p.skin} />
      <circle cx={x} cy={128} r={28} fill={p.skin} />
      <path d={`M${x - 29} 124 C ${x - 30} 96, ${x + 30} 92, ${x + 29} 122 C ${x + 18} 108, ${x - 14} 106, ${x - 29} 124 Z`} fill={p.hair} />
      {p.glasses && (
        <g>
          <rect x={x - 24} y={124} width={48} height={11} rx={5} fill="#151a21" />
          <circle cx={x - 11} cy={129.5} r={3} fill="#c5f467" />
          <circle cx={x + 13} cy={129.5} r={1.6} fill="#ff5d5d" />
        </g>
      )}
      {/* role tag */}
      <g transform={`translate(${x} 72)`}>
        <rect x={-p.role.length * 3.6 - 10} y={-12} width={p.role.length * 7.2 + 20} height={22} rx={11} fill="#ffffff" stroke="#d7eea6" />
        <text x={0} y={3.5} textAnchor="middle" fontSize="11.5" fontFamily="var(--font-geist-sans), sans-serif" fontWeight="500" fill="#151a21">
          {p.role}
        </text>
      </g>
    </g>
  );
}

export function TeamKit({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 580 380"
      className={className}
      role="img"
      aria-label="Illustration: a small partner team — capture lead wearing smart glasses, QA reviewer and coordinator — with a laptop showing an annotation timeline, smart glasses, an action camera and a capture checklist on the table."
    >
      <rect width="580" height="380" rx="20" fill="#ffffff" />
      <rect x="0" y="0" width="580" height="380" rx="20" fill="url(#tk-grid)" />
      <defs>
        <pattern id="tk-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0 H0 V24" fill="none" stroke="#e6e8e5" strokeWidth="1" />
        </pattern>
      </defs>
      {people.map((p) => (
        <Figure key={p.role} p={p} />
      ))}

      {/* table */}
      <rect x="20" y="262" width="540" height="98" rx="10" fill="#f1fadf" />
      <rect x="20" y="262" width="540" height="8" rx="4" fill="#d7eea6" />

      {/* laptop with annotation timeline */}
      <g transform="translate(66 176)">
        <rect x="0" y="0" width="150" height="92" rx="8" fill="#151a21" />
        <rect x="8" y="8" width="134" height="58" rx="4" fill="#1e252e" />
        <rect x="16" y="16" width="56" height="34" rx="3" fill="#2b333d" />
        <path d="M30 44 l8 -12 l8 12" stroke="#c5f467" strokeWidth="2" fill="none" />
        <rect x="78" y="16" width="56" height="6" rx="3" fill="#c5f467" />
        <rect x="78" y="27" width="40" height="6" rx="3" fill="#c5f467" />
        <rect x="78" y="38" width="48" height="6" rx="3" fill="#2b333d" />
        <g>
          <rect x="16" y="56" width="28" height="6" rx="2" fill="#c5f467" />
          <rect x="46" y="56" width="22" height="6" rx="2" fill="#4a6b0e" />
          <rect x="70" y="56" width="30" height="6" rx="2" fill="#c5f467" />
          <rect x="102" y="56" width="32" height="6" rx="2" fill="#f2c46d" />
        </g>
        <path d="M-10 92 H160 L150 102 H0 Z" fill="#cdd1cc" />
      </g>

      {/* smart glasses */}
      <g transform="translate(268 286)">
        <rect x="0" y="0" width="36" height="20" rx="9" fill="#151a21" />
        <rect x="44" y="0" width="36" height="20" rx="9" fill="#151a21" />
        <rect x="34" y="6" width="12" height="4" rx="2" fill="#151a21" />
        <circle cx="10" cy="8" r="3" fill="#c5f467" />
        <path d="M0 8 L-22 2 M80 8 L102 2" stroke="#151a21" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* action camera */}
      <g transform="translate(396 280)">
        <rect x="0" y="0" width="58" height="42" rx="8" fill="#4a6b0e" />
        <circle cx="38" cy="21" r="13" fill="#151a21" />
        <circle cx="38" cy="21" r="6" fill="#c5f467" />
        <rect x="8" y="8" width="12" height="6" rx="2" fill="#f1fadf" />
      </g>

      {/* checklist */}
      <g transform="translate(476 278)">
        <rect x="0" y="0" width="64" height="62" rx="6" fill="#ffffff" stroke="#cdd1cc" />
        {[14, 30, 46].map((y, i) => (
          <g key={y}>
            <rect x="8" y={y - 5} width="9" height="9" rx="2" fill={i < 2 ? "#4a6b0e" : "#ffffff"} stroke="#4a6b0e" />
            <rect x="22" y={y - 2} width={i === 1 ? 26 : 32} height="4" rx="2" fill="#cdd1cc" />
          </g>
        ))}
      </g>
    </svg>
  );
}
