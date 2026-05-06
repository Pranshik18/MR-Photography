import Portfolio from "@/Components/portfolio/Portfolio";
import { Suspense } from "react";

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Loading Portfolio...</div>}>
      <Portfolio />
    </Suspense>
  );
}
