import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      {/* Hero */}
      <div className="mb-14">
        <Skeleton className="mb-6 h-8 w-32 rounded-full" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-18 w-18 rounded-full" />
          <Skeleton className="h-12 w-72" />
        </div>
      </div>

      {/* 교재 */}
      <div className="mb-16">
        <Skeleton className="mb-8 h-9 w-40" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[0, 0, 0, 0].map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-2xl" />
          ))}
        </div>
      </div>

      {/* TIL */}
      <div>
        <Skeleton className="mb-8 h-9 w-64" />
        <Skeleton className="mb-6 h-24 w-full rounded-2xl" />
        <div className="space-y-2">
          {[0, 0, 0, 0, 0].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
