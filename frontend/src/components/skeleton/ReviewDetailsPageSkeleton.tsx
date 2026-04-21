import MovieDetailsCardSkeleton from "@/components/skeleton/MovieDetailsCardSkeleton";

function ReviewDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">

      <MovieDetailsCardSkeleton />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-12 bg-gray-200 rounded" />
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </div>

        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>

      <div className="flex justify-end gap-2">
        <div className="h-10 w-24 bg-gray-200 rounded-md" />
        <div className="h-10 w-24 bg-gray-200 rounded-md" />
      </div>

    </div>
  );
}

export default ReviewDetailSkeleton;