import { cn } from "../../utils/cn";

type CornersProps = {
    className?: string;
    offset?: "sm" | "md" | "lg";
    borderSize?: "1" | "2" | "3" | "4";
};

const borderMap = {
    "1": {
        bt: "border-t-1",
        br: "border-r-1",
        bl: "border-l-1",
        bb: "border-b-1",
    },
    "2": {
        bt: "border-t-2",
        br: "border-r-2",
        bl: "border-l-2",
        bb: "border-b-2",
    },
    "3": {
        bt: "border-t-4",
        br: "border-r-4",
        bl: "border-l-4",
        bb: "border-b-4",
    },
    "4": {
        bt: "border-t-6",
        br: "border-r-6",
        bl: "border-l-6",
        bb: "border-b-6",
    }
};

const offsetMap = {
    sm: {
        tl: "-translate-x-[10%] -translate-y-[10%]",
        tr: "translate-x-[10%] -translate-y-[10%]",
        bl: "-translate-x-[10%] translate-y-[10%]",
        br: "translate-x-[10%] translate-y-[10%]",
    },
    md: {
        tl: "-translate-x-[14%] -translate-y-[14%]",
        tr: "translate-x-[14%] -translate-y-[14%]",
        bl: "-translate-x-[14%] translate-y-[14%]",
        br: "translate-x-[14%] translate-y-[14%]",
    },
    lg: {
        tl: "-translate-x-[18%] -translate-y-[18%]",
        tr: "translate-x-[18%] -translate-y-[18%]",
        bl: "-translate-x-[18%] translate-y-[18%]",
        br: "translate-x-[18%] translate-y-[18%]",
    },
};

export const Corners = ({
    className,
    offset = "sm",
    borderSize = "2",
}: CornersProps) => {

    const { bt, br, bl, bb } = borderMap[borderSize];
    const pos = offsetMap[offset];

    return (
        <>
            <span
                className={cn(
                    "absolute top-0 left-0 w-3 h-3",
                    pos.tl,
                    bt,
                    bl,
                    className
                )}
            />

            <span
                className={cn(
                    "absolute top-0 right-0 w-3 h-3",
                    pos.tr,
                    bt,
                    br,
                    className
                )}
            />

            <span
                className={cn(
                    "absolute bottom-0 left-0 w-3 h-3",
                    pos.bl,
                    bb,
                    bl,
                    className
                )}
            />

            <span
                className={cn(
                    "absolute bottom-0 right-0 w-3 h-3",
                    pos.br,
                    bb,
                    br,
                    className
                )}
            />
        </>
    );
};