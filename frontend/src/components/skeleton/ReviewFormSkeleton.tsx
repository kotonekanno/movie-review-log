import MovieDetailsCardSkeleton from "@/components/skeleton/MovieDetailsCardSkeleton";

function ReviewFormSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-[48rem] p-4 mx-auto">

      <div className="space-y-2">
        <div className="h-10 w-full bg-gray-200 rounded-md" />
      </div>

      <MovieDetailsCardSkeleton />

      <div className="border-t border-muted" />

      <div className="space-y-3">
        <div className="h-6 w-24 mx-auto bg-gray-200 rounded" />
        <div className="h-[120px] w-full bg-gray-200 rounded-md" />
      </div>

      <div className="border-t border-muted" />

      <div className="space-y-3 flex flex-col items-center">
        <div className="h-6 w-16 bg-gray-200 rounded" />
        <div className="h-6 w-64 bg-gray-200 rounded" />
        <div className="h-5 w-12 bg-gray-200 rounded" />
      </div>

      <div className="border-t border-muted" />

      <div className="space-y-3 flex flex-col items-center">
        <div className="h-6 w-20 bg-gray-200 rounded" />
        <div className="h-10 w-[200px] bg-gray-200 rounded-md" />
      </div>

      <div className="h-10 w-32 mx-auto bg-gray-200 rounded-md" />

    </div>
  );
}

export default ReviewFormSkeleton;