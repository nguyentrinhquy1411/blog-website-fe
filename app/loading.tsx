import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in-80 duration-1000">
      <div className="flex flex-col items-center justify-center w-full mb-12">
        {/* Hero section skeleton */}
        <div className="w-full h-[400px] rounded-2xl bg-muted/80 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent animate-pulse" 
               style={{ backgroundSize: '200% 100%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
          <div className="absolute bottom-8 left-8 space-y-4 w-1/2">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>
        </div>

        {/* Loading spinner */}
        <div className="flex items-center justify-center my-8">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* Featured posts skeleton */}
        <div className="w-full mb-12">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent posts skeleton */}
        <div className="w-full">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4">
                <Skeleton className="h-32 w-full md:w-48 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
