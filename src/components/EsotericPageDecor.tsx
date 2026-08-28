function OrbitSigil({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 220 220" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round">
        <circle cx="110" cy="110" r="82" strokeWidth="1" />
        <circle cx="110" cy="110" r="58" strokeWidth="0.7" strokeDasharray="2 7" />
        <path d="M110 18V202M18 110H202M45 45 175 175M175 45 45 175" strokeWidth="0.65" opacity="0.65" />
        <path d="M110 52 168 110 110 168 52 110Z" strokeWidth="0.9" />
        <circle cx="110" cy="110" r="19" strokeWidth="1" />
        <circle cx="110" cy="110" r="5" fill="currentColor" stroke="none" />
        <circle cx="110" cy="18" r="3" fill="#FFFDF9" />
        <circle cx="110" cy="202" r="3" fill="#FFFDF9" />
        <circle cx="18" cy="110" r="3" fill="#FFFDF9" />
        <circle cx="202" cy="110" r="3" fill="#FFFDF9" />
      </g>
    </svg>
  );
}

function LunarSigil({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 260 150" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M26 75C73 23 187 23 234 75C187 127 73 127 26 75Z" strokeWidth="1" />
        <circle cx="130" cy="75" r="34" strokeWidth="0.85" />
        <circle cx="130" cy="75" r="8" fill="currentColor" stroke="none" opacity="0.75" />
        <path d="M91 37C70 48 61 68 64 88C76 72 91 64 110 62C101 54 95 46 91 37Z" strokeWidth="0.7" />
        <path d="M169 37C190 48 199 68 196 88C184 72 169 64 150 62C159 54 165 46 169 37Z" strokeWidth="0.7" />
        <path d="M130 19V35M130 115V131M56 75H40M220 75H204" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

function StarSigil({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="90" cy="90" r="68" strokeWidth="0.7" strokeDasharray="2 6" />
        <path d="M90 18 105 75 162 90 105 105 90 162 75 105 18 90 75 75Z" strokeWidth="1" />
        <path d="M39 39 81 81M141 39 99 81M39 141 81 99M141 141 99 99" strokeWidth="0.65" />
        <circle cx="90" cy="90" r="14" strokeWidth="0.9" />
        <circle cx="90" cy="90" r="3.5" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export default function EsotericPageDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-[#C87553]" aria-hidden="true">
      <div className="absolute right-[-5rem] top-16 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(226,164,137,0.15),_transparent_68%)] blur-xl" />
      <div className="absolute right-[8%] top-[24rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(222,145,113,0.12),_transparent_70%)] blur-2xl" />
      <OrbitSigil className="absolute right-[-3rem] top-10 h-64 w-64 opacity-[0.16]" />
      <StarSigil className="absolute right-[30%] top-16 h-44 w-44 opacity-[0.16]" />
      <LunarSigil className="absolute right-[2%] top-[27rem] h-48 w-80 opacity-[0.13]" />
      <OrbitSigil className="absolute -bottom-24 right-[-4rem] h-72 w-72 rotate-[22deg] opacity-[0.11]" />
      <div className="absolute right-[12%] top-[22rem] h-1.5 w-1.5 rounded-full bg-current opacity-30 shadow-[0_0_14px_4px_rgba(200,117,83,0.24)]" />
      <div className="absolute right-[42%] top-32 h-1 w-1 rounded-full bg-current opacity-35 shadow-[0_0_12px_3px_rgba(200,117,83,0.22)]" />
      <div className="absolute bottom-52 right-[22%] h-1 w-1 rounded-full bg-current opacity-25 shadow-[0_0_12px_3px_rgba(200,117,83,0.2)]" />
    </div>
  );
}
