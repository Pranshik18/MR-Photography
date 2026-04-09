import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {

  return <div className="pt-28 md:pt-32">{children}</div>;
}
