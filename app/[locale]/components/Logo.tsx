// FK monogramı. app/icon.svg (favicon) ile birebir aynı geometri.
// Harfler 64x64 kutuya ortalanmış olsun diye translate/scale uygulanıyor;
// ince beyaz halka koyu navbar'da kutunun zemine karışmasını engelliyor.
const Logo = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    // Yanındaki "Furkan" metni zaten linkin adını veriyor; burada tekrar etmeyelim
    aria-hidden="true"
    focusable="false"
  >
    <rect width="64" height="64" rx="14" fill="#0f172a" />
    <rect
      x="0.5"
      y="0.5"
      width="63"
      height="63"
      rx="13.5"
      fill="none"
      stroke="#ffffff"
      strokeOpacity="0.14"
    />
    <g transform="translate(32 32) scale(0.88) translate(-36 -32)">
      <g stroke="#ffffff" strokeWidth="9" fill="none">
        <path d="M17 16V48" />
        <path d="M17 20.5H31" />
        <path d="M17 32H28" />
        <path d="M40 16V48" />
        <path d="M44.5 32L54 17" />
        <path d="M48.5 27L55 48" />
      </g>
    </g>
  </svg>
);

export default Logo;
