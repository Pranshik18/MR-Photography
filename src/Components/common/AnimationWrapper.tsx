import type { ReactNode } from "react";

type AnimationWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function AnimationWrapper({
  children,
  className = "",
}: AnimationWrapperProps) {
  return <div className={className}>{children}</div>;
}
