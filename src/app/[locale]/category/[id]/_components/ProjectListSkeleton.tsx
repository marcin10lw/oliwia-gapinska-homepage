import { Skeleton } from '@/components/ui/skeleton';

export const ProjectListSkeleton = () => {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
      <Skeleton className="aspect-square" />
    </div>
  );
};
