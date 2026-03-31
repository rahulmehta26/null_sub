import { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import type { Subscription } from '../../types';
import { formatRupees, getDaysAgo } from '../../utils/calculations';
import { cardVariants } from '../animations/variants';
import TrendingDown from '../icons/TrendingDown';


interface WastefulListProps {
    subscriptions: Subscription[];
}


const WastefulList = memo(({ subscriptions }: WastefulListProps) => {
    const wasteful = useMemo(
        () =>
            subscriptions
                .filter((s) => getDaysAgo(s.lastUsed) > 30)
                .sort((a, b) => b.cost - a.cost)
                .slice(0, 5),
        [subscriptions]
    );

    if (wasteful.length === 0) {
        return (
            <div
                className="py-8 text-(--color-text-muted) text-center text-sm"
            >
                ✅ No wasteful subscriptions found!
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {wasteful.map((sub, i) => {
                const daysUnused = getDaysAgo(sub.lastUsed);
                const yearlyWaste = sub.cost * 12;

                return (
                    <motion.div
                        key={sub.id}
                        variants={cardVariants}
                        custom={i}
                        className="flex bg-(--color-danger-glow) border-[1px] border-[rgba(255,77,106,0.15)] items-center gap-3 p-3 rounded-xl"
                    >
                        <span
                            className="text-xs text-(--color-danger) font-(--font-mono) font-bold w-5 text-center flex-shrink-0"
                        >
                            #{i + 1}
                        </span>

                        <span className="text-lg flex-shrink-0">{sub.logo ?? '📦'}</span>

                        <div className="flex-1 min-w-0">
                            <p
                                className="text-sm text-(--color-text) font-semibold truncate"
                            >
                                {sub.name}
                            </p>
                            <p className="text-xs text-(--color-text-muted)">
                                Unused for {daysUnused} days
                            </p>
                        </div>

                        <div className="text-right flex-shrink-0">
                            <p
                                className="text-sm font-bold text-(--color-danger) font-(--font-mono) "
                            >
                                {formatRupees(sub.cost)}/mo
                            </p>
                            <p className="text-xs text-(--color-text-muted)">
                                {formatRupees(yearlyWaste)}/yr wasted
                            </p>
                        </div>

                        <TrendingDown className='text-(--color-danger) shrink-0' />
                    </motion.div>
                );
            })}
        </div>
    );
});

export default WastefulList;