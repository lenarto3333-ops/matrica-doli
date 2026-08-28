import type { ReactNode } from "react";

interface AccentWordProps {
  children: ReactNode;
}

export default function AccentWord({ children }: AccentWordProps) {
  return (
    <span className="bg-[linear-gradient(90deg,#E48FA1_0%,#CB7F8F_34%,#B16F7D_67%,#985F6B_100%)] bg-clip-text text-transparent">
      {children}
    </span>
  );
}
