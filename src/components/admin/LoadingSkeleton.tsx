import { motion } from "framer-motion";

export function CardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6"
    >
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6"></div>
      </div>
    </motion.div>
  );
}

export function GridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6"
    >
      <div className="animate-pulse space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-4/6"></div>
        </div>
      </div>
    </motion.div>
  );
}
