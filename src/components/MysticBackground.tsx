import HeroMatrixBackdrop from "./HeroMatrixBackdrop";

export default function MysticBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(112deg,#FFFDF9_0%,#FAF5EC_48%,#F8E9DF_100%)]" />

      <div className="absolute -top-28 right-[-8%] h-[52rem] w-[52rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(221,133,97,0.18)_0%,_rgba(244,205,186,0.12)_44%,_transparent_72%)] blur-2xl" />

      {/* Subtle warm ambient glow in bottom-left */}
      <div className="absolute top-1/3 -left-32 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(212,163,115,0.15)_0%,_transparent_65%)] blur-3xl" />

      {/* Fine copper matrix construction placed behind the calculator card. */}
      <div className="absolute top-[-7rem] right-[-9rem] hidden h-[58rem] w-[63rem] opacity-[0.72] md:block lg:right-[-6rem] xl:right-[-2rem]">
        <HeroMatrixBackdrop />
      </div>

      <svg className="absolute inset-x-0 bottom-0 h-36 w-full opacity-70" viewBox="0 0 1600 180" preserveAspectRatio="none">
        <path d="M0 88C180 172 344 162 518 102C710 36 874 72 1040 118C1228 170 1412 146 1600 62V180H0Z" fill="#FFFDF9" fillOpacity="0.78" />
        <path d="M0 118C190 180 350 169 548 118C744 68 902 88 1080 132C1270 178 1430 154 1600 92" stroke="#E9BEAA" strokeWidth="1" opacity="0.34" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FDFBF7] to-transparent" />
    </div>
  );
}
