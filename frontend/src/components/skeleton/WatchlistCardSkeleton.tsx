import { Skeleton } from "@/components/ui/skeleton";

function WatchlistCardSkeleton() {
  return (
    <div className="w-[600px] mx-auto p-4 border rounded-md flex items-center justify-between gap-4">

      <div className="flex items-center flex-1 min-w-0">
        <Skeleton className="h-5 w-3/4" />
      </div>

      <div className="flex items-center gap-4">

        <Skeleton className="h-4 w-16" />

        <Skeleton className="h-6 w-6 rounded-full" />

        <Skeleton className="h-8 w-16 rounded-md" />

      </div>

    </div>
  );
}

export default WatchlistCardSkeleton;