import { Skeleton } from "./ui/skeleton";

export default function TodoCardLoader() {
    return (
        <div className="rounded-md bg-slate-50 border-2 py-4 px-6 z-10">
            <Skeleton className="h-[20px] rounded-full w-2/3" />
            <div className="flex flex-col gap-[3px] mt-4">
                <Skeleton className="h-[8px] rounded-full w-full" />
                <Skeleton className="h-[8px] rounded-full w-full" />
                <Skeleton className="h-[8px] rounded-full w-3/4" />
            </div>
            <Skeleton className="h-[30px] w-[100px] rounded-full mt-4" />
        </div>
    );
}
