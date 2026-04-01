import { cn } from "../../utils/cn";

export const Corners = ({ className }: { className?: string }) => (
    <>
        <span className={cn("absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-(--color-primary) -translate-x-[10%] -translate-y-[10%]", className)} />

        <span className={cn("absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-(--color-primary) translate-x-[10%] -translate-y-[10%]", className)} />

        <span className={cn("absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-(--color-primary) -translate-x-[10%] translate-y-[10%]", className)} />

        <span className={cn("absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-(--color-primary) translate-x-[10%] translate-y-[10%]", className)} />
    </>
);