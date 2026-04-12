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
                'inline-flex relative items-center gap-2.5 px-3 py-2 flex-shrink-0',
                'bg-(--color-surface) border-[1px] border-dashed border-(--color-border-dashed)',
            )}
        >

            <Corners borderSize="2" offset="md" className="w-2 h-2" />

            <span className="text-sm leading-none">{logo}</span>

            <div className="flex flex-col leading-none gap-0.5">
                <span className="text-[10px] sm:text-xs font-semibold text-(--color-text) font-display">
                    {name}
                </span>
                <span className="hidden sm:block text-[10px] text-(--color-text-muted) font-mono">
                    {cost}/mo
                </span>
            </div>

            <span
                className={cn(
                    'inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold border border-dashed rounded',
                    cfg.wrapper,
                )}
            >
                <span className={cn("w-1.5 h-1.5 rounded-full", cfg.dot)} />
                <span className="hidden sm:inline">{cfg.label}</span>
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
            className="w-full space-y-3 sm:space-y-4 mt-10 sm:mt-14 overflow-hidden"
        >
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-(--color-text-dim) font-(--font-mono)">
                subscriptions NullSub tracks
            </p>


            <div
                className="overflow-hidden w-full"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
                }}
            >
                <motion.div
                    className="flex gap-2 sm:gap-3 w-max "
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 25,
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
