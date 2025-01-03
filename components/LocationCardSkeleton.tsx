import { Skeleton } from "@/components/ui/skeleton"

export function LocationCardSkeleton() {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg w-full max-w-[calc(100vw-2rem)] mx-auto">
      <div className="relative">
        {/* Title Bar Skeleton */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-transparent pt-2 pb-4">
          <div className="px-3 flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-3 w-24 mb-1" />
              <Skeleton className="h-2 w-32" />
            </div>
            <div className="flex gap-1 ml-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
          </div>
        </div>

        {/* Map Skeleton */}
        <Skeleton className="w-full h-28" />
        
        {/* Action Buttons Skeleton */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="flex gap-1">
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-7 w-7 rounded-lg" />
          </div>
          <Skeleton className="h-7 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  )
} 