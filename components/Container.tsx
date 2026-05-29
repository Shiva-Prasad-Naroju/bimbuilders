import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  wide = false,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  narrow?: boolean;
}) {
  // Cap widths reflow gracefully on ultra-wide; 2xl tier gently widens `wide` for 1440px+ screens.
  const maxW = wide
    ? "max-w-7xl 2xl:max-w-[88rem]"
    : narrow
    ? "max-w-4xl"
    : "max-w-6xl 2xl:max-w-[80rem]";

  // Horizontal padding scales with breakpoints; safe-area handled globally on body.
  return (
    <div
      className={`mx-auto min-w-0 w-full ${maxW} px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
