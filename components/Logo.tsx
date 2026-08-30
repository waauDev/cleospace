const Logo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 40 32"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <rect x="1" y="1" width="38" height="30" rx="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="13" cy="16" r="6.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="13" cy="16" r="2" fill="currentColor" />
    <circle cx="27" cy="16" r="6.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="27" cy="16" r="2" fill="currentColor" />
    <path d="M18.5 12.5C19.5 14 19.5 18 18.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21.5 12.5C20.5 14 20.5 18 21.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default Logo;
