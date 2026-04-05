import { memo } from "react";
import { motion } from "motion/react";
import { cn } from "../../utils/cn";
import { Corners } from "../../components/ui/Corners";
import { STATUS_CONFIG, SUBS } from "../../constant/landing-marquee.constant";

const Pill = memo(({ name, logo, status, cost }: (typeof SUBS)[0]) => {
    const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

    return (
        <div
            className={cn(
                "inline-flex relative items-center gap-5 px-3.5 py-2 flex-shrink-0",
                "bg-(--color-surface) border-[1px] border-dashed border-(--color-border-dashed)",
            )}
        >

            <Corners />

            <span className="text-sm">{logo}</span>

            <div className="flex flex-col leading-none gap-0.5">
                <span className="text-xs font-semibold text-(--color-text) font-display">
                    {name}
                </span>
                <span className="text-xs text-(--color-text-muted) font-mono">
                    {cost}/mo
                </span>
            </div>

            <span
                className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold border border-dashed rounded",
                    cfg.wrapper,
                )}
            >
                <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                {cfg.label}
            </span>
        </div>
    );
});

const LandingMarquee = memo(() => {
    const doubled = [...SUBS, ...SUBS];

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full space-y-4 mt-14 overflow-hidden"
        >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-(--color-text) font-(--font-display)">
                subscriptions NullSub tracks
            </p>

            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <motion.div
                    className="flex gap-3 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 40,
                        ease: "linear",
                    }}
                >
                    {doubled.map((sub, i) => (
                        <Pill key={`${sub.name}-${i}`} {...sub} />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
});

export default LandingMarquee;
