export default function DeveloperIllustration() {
  return (
    <svg
      className="developer-illustration"
      viewBox="0 0 760 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Stylized laptop with code and a warm drink"
    >
      <defs>
        <linearGradient id="laptop-shell" x1="270" y1="155" x2="590" y2="514" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E475B8" />
          <stop offset="0.48" stopColor="#8D62DB" />
          <stop offset="1" stopColor="#5566C9" />
        </linearGradient>
        <linearGradient id="screen" x1="350" y1="205" x2="536" y2="390" gradientUnits="userSpaceOnUse">
          <stop stopColor="#17162A" />
          <stop offset="1" stopColor="#292052" />
        </linearGradient>
        <linearGradient id="cup" x1="185" y1="215" x2="273" y2="365" gradientUnits="userSpaceOnUse">
          <stop stopColor="#BA68DF" />
          <stop offset="1" stopColor="#5F52C7" />
        </linearGradient>
        <filter id="illustration-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <ellipse cx="430" cy="522" rx="245" ry="45" fill="#8355D8" fillOpacity=".18" filter="url(#illustration-glow)" />

      <g className="developer-illustration__tile developer-illustration__tile--one">
        <path d="m93 436 35-20 35 20-35 20-35-20Z" fill="#171621" stroke="#F18191" strokeWidth="3" />
        <path d="m105 436 23-13 23 13-23 13-23-13Z" fill="#39213E" />
      </g>
      <g className="developer-illustration__tile developer-illustration__tile--two">
        <path d="m642 445 31-18 31 18-31 18-31-18Z" fill="#171621" stroke="#F18191" strokeWidth="3" />
        <path d="m653 445 20-11 20 11-20 11-20-11Z" fill="#39213E" />
      </g>
      <g className="developer-illustration__tile developer-illustration__tile--three">
        <path d="m607 520 22-13 22 13-22 13-22-13Z" fill="#171621" stroke="#9B67EF" strokeWidth="2" />
      </g>

      <g className="developer-illustration__cup">
        <ellipse cx="229" cy="388" rx="67" ry="24" fill="#11121A" stroke="#F08B82" strokeWidth="3" />
        <path d="M192 238h72l-7 127c-1 21-16 32-29 32-14 0-28-11-30-32l-6-127Z" fill="url(#cup)" stroke="#DD789F" strokeWidth="4" />
        <ellipse cx="228" cy="239" rx="36" ry="15" fill="#342151" stroke="#E49AD0" strokeWidth="4" />
        <ellipse cx="228" cy="239" rx="26" ry="10" fill="#171923" />
        <path d="M217 322c8 1 11-7 12-14 2 7 6 13 14 14-5 5-13 5-17 0-3 4-7 4-9 0Z" fill="#FFB65D" />
        <path className="developer-illustration__steam" d="M218 210c-18-24 17-35 5-62" stroke="#F6F0FF" strokeWidth="4" strokeLinecap="round" />
        <path className="developer-illustration__steam developer-illustration__steam--two" d="M239 213c-13-20 14-30 6-51" stroke="#F6F0FF" strokeWidth="3" strokeLinecap="round" />
      </g>

      <g className="developer-illustration__laptop">
        <path d="m311 142 285 105-44 245-292-119 51-231Z" fill="url(#laptop-shell)" stroke="#F08B9A" strokeWidth="5" strokeLinejoin="round" />
        <path d="m332 171 236 87-34 195-242-98 40-184Z" fill="url(#screen)" stroke="#B99AF5" strokeWidth="4" strokeLinejoin="round" />
        <path d="m260 373 292 119-91 65-310-137 109-47Z" fill="#6864BF" stroke="#E58DAE" strokeWidth="5" strokeLinejoin="round" />
        <path d="m177 415 285 126 81-58 20 14-96 76-312-142 22-16Z" fill="#34365D" stroke="#E47D93" strokeWidth="4" strokeLinejoin="round" />
        <path d="m280 405 139 57-52 38-143-62 56-33Z" fill="#8C61CD" stroke="#B58CE7" strokeWidth="3" />
        <g fill="#41386E" opacity=".9">
          <path d="m295 391 18 7-13 9-18-7 13-9Z"/><path d="m321 402 18 7-13 9-18-7 13-9Z"/><path d="m347 413 18 7-13 9-18-7 13-9Z"/><path d="m373 424 18 7-13 9-18-7 13-9Z"/>
          <path d="m275 410 18 8-13 9-18-8 13-9Z"/><path d="m301 421 18 8-13 9-18-8 13-9Z"/><path d="m327 432 18 8-13 9-18-8 13-9Z"/><path d="m353 443 18 8-13 9-18-8 13-9Z"/>
        </g>
        <g strokeLinecap="round" strokeWidth="7">
          <path d="m367 236 45 17" stroke="#FF8E9D"/><path d="m428 259 67 25" stroke="#8BA9FF"/>
          <path d="m355 265 24 9" stroke="#F6C767"/><path d="m392 279 89 33" stroke="#D17CF6"/>
          <path d="m345 295 64 24" stroke="#8BA9FF"/><path d="m421 323 48 18" stroke="#FF8E9D"/>
          <path d="m334 325 31 12" stroke="#D17CF6"/><path d="m379 342 75 28" stroke="#F6C767"/>
          <path d="m323 355 88 34" stroke="#8BA9FF"/>
        </g>
        <circle cx="439" cy="476" r="9" fill="#D2B4FF" fillOpacity=".7" />
      </g>

      <g className="developer-illustration__spark" stroke="#B68AF3" strokeWidth="3" strokeLinecap="round">
        <path d="M604 137v34M587 154h34"/><path d="M136 271v25M124 283h25"/><path d="M688 331v22M677 342h22"/>
      </g>
    </svg>
  );
}
