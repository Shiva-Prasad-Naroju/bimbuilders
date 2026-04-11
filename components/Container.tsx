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
  const maxW = wide ? "max-w-7xl" : narrow ? "max-w-4xl" : "max-w-6xl";
  return (
    <div className={`mx-auto w-full ${maxW} px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
