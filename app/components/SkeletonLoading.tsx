import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoading = () => {
  return (
    <div className="grid grid-cols-2 lg:col-span-3 col-span-4 gap-6  lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col gap-1 space-y-3">
          <div className="relative ">
            <Skeleton className="absolute top-0 left-0 h-4 lg:w-[80px] w-[50px] bg-gray-400 z-10 ml-5 mt-5" />
            <Skeleton className="lg:h-[300px] lg:w-[300px] h-[200px] w-[180px] rounded-xl z-100" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 lg:w-[250px] w-[140px]" />
            <Skeleton className="h-2 lg:w-[150px] w-[80px]" />
            <Skeleton className="h-4 lg:w-[50px] w-[30px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
