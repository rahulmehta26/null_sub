import { cn } from "../../utils/cn";

type CornersProps = {
    className?: string;
    offset?: string;
    borderSize?: string;
};

export const Corners = ({
    className,
    offset = "10%",
    borderSize = "2",
}: CornersProps) => {
    const bt = `border-t-${borderSize}`;
    const br = `border-r-${borderSize}`;
    const bl = `border-l-${borderSize}`;
    const bb = `border-b-${borderSize}`;

    return (
        <>
            <span
                className={cn(
                    `absolute top-0 left-0 w-3 h-3 -translate-x-[${offset}] -translate-y-[${offset}]`,
                    bt,
                    bl,
                    className
                )}
            />

            <span
                className={cn(
                    `absolute top-0 right-0 w-3 h-3 translate-x-[${offset}] -translate-y-[${offset}]`,
                    bt,
                    br,
                    className
                )}
            />

            <span
                className={cn(
                    `absolute bottom-0 left-0 w-3 h-3 -translate-x-[${offset}] translate-y-[${offset}]`,
                    bb,
                    bl,
                    className
                )}
            />

            <span
                className={cn(
                    `absolute bottom-0 right-0 w-3 h-3 translate-x-[${offset}] translate-y-[${offset}]`,
                    bb,
                    br,
                    className
                )}
            />
        </>
    );
};