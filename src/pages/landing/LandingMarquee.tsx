import { memo } from "react";
import { motion } from "motion/react";
import { cn } from "../../utils/cn";
import { Corners } from "../../components/ui/Corners";

const SUBS = [
    { name: "Netflix", logo: "🎬", status: "active", cost: "₹649" },
    { name: "Hotstar", logo: "⭐", status: "unused", cost: "₹299" },
    { name: "Spotify", logo: "🎵", status: "active", cost: "₹119" },
    { name: "Amazon Prime", logo: "📦", status: "expiring", cost: "₹299" },
    { name: "SonyLIV", logo: "📺", status: "unused", cost: "₹299" },
    { name: "YouTube", logo: "▶️", status: "active", cost: "₹189" },
    { name: "iCloud", logo: "☁️", status: "active", cost: "₹75" },
    { name: "Notion", logo: "📝", status: "active", cost: "₹400" },
    { name: "Zee5", logo: "📡", status: "unused", cost: "₹199" },
    { name: "Adobe CC", logo: "🎨", status: "expiring", cost: "₹1675" },
];

const STATUS_CONFIG = {
    active: {
        wrapper:
            "bg-[rgba(26,107,74,0.06)] border-[rgba(26,107,74,0.25)] text-[#1a6b4a]",
        dot: "bg-[#1a6b4a]",
        label: "active",
    },
    unused: {
        wrapper:
            "bg-[rgba(192,57,43,0.06)] border-[rgba(192,57,43,0.25)] text-[#c0392b]",
        dot: "bg-[#c0392b]",
        label: "unused",
    },
    expiring: {
        wrapper:
            "bg-[rgba(183,112,13,0.06)] border-[rgba(183,112,13,0.25)] text-[#b7700d]",
        dot: "bg-[#b7700d]",
        label: "expiring",
    },
};

const Pill = memo(({ name, logo, status, cost }: (typeof SUBS)[0]) => {
    const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

    return (
        <div
            className={cn(
                "inline-flex relative items-center gap-2.5 px-3.5 py-2 flex-shrink-0",
                "bg-(--color-surface) border-[1px] border-dashed border-(--color-border-dashed)",
            )}
        >

            <Corners />

            <span className="text-sm">{logo}</span>

            <div className="flex flex-col leading-none gap-0.5">
                <span className="text-xs font-semibold text-[var(--color-text)] font-display">
                    {name}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] font-mono">
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
