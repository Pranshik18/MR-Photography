import { RecentWork } from "@/Components/recentwork/RecentWork";
import { Suspense } from "react";

export default function RecentWorkPage() { 
    return (
        <Suspense fallback={<div>Loading Recent Work...</div>}>
            <RecentWork />
        </Suspense>
    );
}