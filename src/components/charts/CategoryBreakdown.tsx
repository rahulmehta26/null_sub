import { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import type { Subscription } from '../../types';
import { getCategorySpend, formatRupees } from '../../utils/calculations';
import { cn } from '../../utils/cn';


interface CategoryBreakdownProps {
    subscriptions: Subscription[];
}


const CategoryBreakdown = memo(({ subscriptions }: CategoryBreakdownProps) => {
    const data = useMemo(() => getCategorySpend(subscriptions), [subscriptions]);
    const max = useMemo(() => Math.max(...data.map((d) => d.amount)), [data]);

    return (
        <div className="flex flex-col gap-3">
            {data
                .sort((a, b) => b.amount - a.amount)
                .map((item, i) => {
                    const pct = max > 0 ? (item.amount / max) * 100 : 0;
                    return (
                        <div key={item.category} className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={cn(
                                            "w-2 h-2 rounded-full",
                                            `bg-${item.color}`
                                        )}
                                    />
                                    <span
                                        className="text-sm text-(--color-text) font-medium"
                                    >
                                        {item.category}
                                    </span>
                                    <span
                                        className="text-xs text-(--color-text-muted)"
                                    >
                                        {item.count} sub{item.count > 1 ? 's' : ''}
                                    </span>
                                </div>
                                <span
                                    className="text-sm text-(--color-text) font-(font-mono) font-bold"
                                >
                                    {formatRupees(item.amount)}/mo
                                </span>
                            </div>

                            <div
                                className="w-full h-1.5 bg-(--color-surface-2) rounded-full overflow-hidden"
                            >
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ background: item.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{
                                        duration: 0.7,
                                        delay: i * 0.08,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
        </div>
    );
});

export default CategoryBreakdown;