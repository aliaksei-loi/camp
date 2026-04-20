export function IconSprite() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      xmlns="http://www.w3.org/2000/svg"
      id="icon-sprite"
      aria-hidden="true"
    >
      <defs>
        <symbol id="ic-tent" viewBox="0 0 64 64">
          <path d="M8 54 L32 10 L56 54 Z" fill="#F38081" stroke="#B94A2A" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M32 10 L32 54" stroke="#B94A2A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M26 54 L32 42 L38 54" fill="#B94A2A" stroke="#B94A2A" strokeWidth="2" strokeLinejoin="round" />
          <path d="M6 54 L58 54" stroke="#3A241A" strokeWidth="2.5" strokeLinecap="round" />
        </symbol>
        <symbol id="ic-fire" viewBox="0 0 64 64">
          <path
            d="M32 8 C 26 20 36 24 32 32 C 28 26 22 32 22 40 C 22 50 32 56 32 56 C 32 56 42 50 42 40 C 42 32 38 28 36 22 C 34 16 32 12 32 8 Z"
            fill="#F38081"
            stroke="#B94A2A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M32 26 C 28 30 30 38 32 42 C 34 38 36 34 32 26 Z" fill="#EFD780" stroke="#B94A2A" strokeWidth="1.5" />
          <path d="M8 56 L56 56" stroke="#3A241A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 56 L22 50" stroke="#5A3B28" strokeWidth="2" strokeLinecap="round" />
          <path d="M48 56 L42 50" stroke="#5A3B28" strokeWidth="2" strokeLinecap="round" />
        </symbol>
        <symbol id="ic-tree" viewBox="0 0 64 64">
          <path
            d="M32 6 L18 28 L24 28 L14 44 L22 44 L12 58 L52 58 L42 44 L50 44 L40 28 L46 28 Z"
            fill="#C8CE72"
            stroke="#B94A2A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <rect x="28" y="54" width="8" height="6" fill="#5A3B28" stroke="#B94A2A" strokeWidth="2" />
        </symbol>
        <symbol id="ic-canoe" viewBox="0 0 64 64">
          <path
            d="M6 36 C 20 48 44 48 58 36 L54 32 C 42 38 22 38 10 32 Z"
            fill="#F79977"
            stroke="#B94A2A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M32 36 L32 12" stroke="#B94A2A" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="32" cy="12" rx="8" ry="3" fill="#EFD780" stroke="#B94A2A" strokeWidth="2" />
          <path d="M6 48 C 18 52 46 52 58 48" stroke="#8FBCE0" strokeWidth="2" fill="none" strokeLinecap="round" />
        </symbol>
        <symbol id="ic-star" viewBox="0 0 64 64">
          <path
            d="M32 6 L38 24 L56 24 L42 36 L48 54 L32 44 L16 54 L22 36 L8 24 L26 24 Z"
            fill="#EFD780"
            stroke="#B94A2A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="ic-sun" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="14" fill="#EFD780" stroke="#B94A2A" strokeWidth="2.5" />
          <g stroke="#B94A2A" strokeWidth="2.5" strokeLinecap="round">
            <path d="M32 4 L32 12" />
            <path d="M32 52 L32 60" />
            <path d="M4 32 L12 32" />
            <path d="M52 32 L60 32" />
            <path d="M12 12 L18 18" />
            <path d="M46 46 L52 52" />
            <path d="M12 52 L18 46" />
            <path d="M46 18 L52 12" />
          </g>
        </symbol>
        <symbol id="ic-leaf" viewBox="0 0 64 64">
          <path
            d="M10 54 C 12 24 32 10 56 10 C 56 34 42 54 10 54 Z"
            fill="#C8CE72"
            stroke="#B94A2A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M14 50 L42 22" stroke="#B94A2A" strokeWidth="2" fill="none" />
        </symbol>
        <symbol id="ic-marshmallow" viewBox="0 0 64 64">
          <rect x="14" y="18" width="14" height="14" rx="2" fill="#FBF3D9" stroke="#B94A2A" strokeWidth="2.5" />
          <rect x="10" y="22" width="14" height="14" rx="2" fill="#F5E9C4" stroke="#B94A2A" strokeWidth="2.5" />
          <path d="M20 30 L58 54" stroke="#5A3B28" strokeWidth="3" strokeLinecap="round" />
        </symbol>
        <symbol id="ic-map" viewBox="0 0 64 64">
          <path
            d="M6 14 L22 10 L42 18 L58 14 L58 54 L42 58 L22 50 L6 54 Z"
            fill="#EFD780"
            stroke="#B94A2A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M22 10 L22 50" stroke="#B94A2A" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M42 18 L42 58" stroke="#B94A2A" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="32" cy="34" r="4" fill="#F38081" stroke="#B94A2A" strokeWidth="2" />
        </symbol>
        <symbol id="ic-heart" viewBox="0 0 64 64">
          <path
            d="M32 54 C 12 40 6 28 12 18 C 18 8 30 12 32 22 C 34 12 46 8 52 18 C 58 28 52 40 32 54 Z"
            fill="#F38081"
            stroke="#B94A2A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="ic-bowl" viewBox="0 0 64 64">
          <path
            d="M8 28 L56 28 C 54 46 44 56 32 56 C 20 56 10 46 8 28 Z"
            fill="#F79977"
            stroke="#B94A2A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <ellipse cx="32" cy="28" rx="24" ry="6" fill="#FBF3D9" stroke="#B94A2A" strokeWidth="2.5" />
          <path d="M20 20 C 20 12 28 12 28 20" stroke="#5A3B28" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M36 18 C 36 10 44 10 44 18" stroke="#5A3B28" strokeWidth="2" fill="none" strokeLinecap="round" />
        </symbol>
        <symbol id="ic-guitar" viewBox="0 0 64 64">
          <path
            d="M40 10 L54 24 L44 34 C 48 42 42 56 30 56 C 18 56 12 48 18 38 L28 28 L16 16 L22 10 L34 22 L40 16 Z"
            fill="#F38081"
            stroke="#B94A2A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="42" r="4" fill="#3A241A" />
        </symbol>
      </defs>
    </svg>
  );
}
