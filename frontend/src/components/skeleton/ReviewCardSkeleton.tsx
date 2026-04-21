import { Skeleton } from "@/components/ui/skeleton";

function ReviewCardSkeleton() {
  return (
    <div className="relative mx-auto w-[240px] aspect-[2/3] flex flex-col overflow-hidden my-4 rounded-xl">
      
      <Skeleton className="flex-1 w-full h-full" />

      <div className="absolute bottom-0 left-0 w-full p-2 space-y-2 bg-gray-400">
        <Skeleton className="h-4 w-3/4" />

        <div className="flex gap-2 items-center">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-6" />
        </div>
      </div>
    </div>
  );
}

export default ReviewCardSkeleton;