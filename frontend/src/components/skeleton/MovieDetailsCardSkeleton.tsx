import { Skeleton } from "@/components/ui/skeleton";

function MovieDetailsCardSkeleton() {
  return (
    <div className="p-6 flex gap-6">
      <Skeleton className="w-[220px] aspect-[2/3] rounded-md bg-gray-400 shrink-0" />

      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export default MovieDetailsCardSkeleton;