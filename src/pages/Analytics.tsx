import { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
import { getSpendingSummary, formatRupees } from '../utils/calculations';
import Card from '../components/ui/Card';
import { cardVariants, containerVariants } from '../components/animations/variants';
import { cn } from '../utils/cn';
import { Corners } from '../components/ui/Corners';
import MonthlyTrendChart from '../components/charts/MonthlyTrendChart';
import CategoryBreakdown from '../components/charts/CategoryBreakdown';
import WastefulList from '../components/ui/WastefulList';
import PageHeader from '../components/ui/PageHeader';

const Analytics = memo(() => {
    const subscriptions = useSubscriptionStore((s) => s.subscriptions);

    const summary = useMemo(
        () => getSpendingSummary(subscriptions),
        [subscriptions]
    );

    const savingsPotential = useMemo(
        () => summary.unusedMonthly * 12,
        [summary.unusedMonthly]
    );

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
        >

            <PageHeader
                title='Analytics'
                subtitle='Understand where your money really goes'
            />

            {savingsPotential > 0 && (
                <motion.div
                    variants={cardVariants}
                    className={cn(
                        "p-4 relative border-[1px] border-dashed border-[rgba(0,229,176,0.2)] flex items-center justify-between",
                        "bg-linear-to-bl from-[rgba(0,229,176,0.08)] to-[rgba(79,142,247,0.08)] "
                    )}
                >

                    <Corners className='border-[rgba(0,229,176,1)]' />

                    <div>
                        <p
                            className="text-sm text-(--color-accent) font-bold"
                        >
                            💰 Savings Potential
                        </p>
                        <p
                            className="text-xs mt-0.5 text-(--color-text-muted) "
                        >
                            Cancel unused subscriptions to save up to
                        </p>
                    </div>
                    <div className="text-right">
                        <p
                            className="text-2xl font-(--font-display) text-(--color-accent) font-bold"
                        >
                            {formatRupees(savingsPotential)}
                        </p>
                        <p className="text-xs text-(--color-text-muted)">
                            per year
                        </p>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <Card animate={false} className="flex flex-col gap-4">
                    <div>
                        <h3
                            className="font-bold text-base font-(--font-display) text-(--color-text)"
                        >
                            Monthly Spend Trend
                        </h3>
                        <p className="text-xs text-(--color-text-muted) mt-0.5">
                            Last 6 months
                        </p>
                    </div>
                    <MonthlyTrendChart subscriptions={subscriptions} />
                </Card>

                <Card animate={false} className="flex flex-col gap-4">
                    <div>
                        <h3
                            className="font-bold font-(--font-display) text-(--color-text) text-base"
                        >
                            Spend by Category
                        </h3>
                        <p className="text-xs text-(--color-text-muted) mt-0.5">
                            Monthly breakdown
                        </p>
                    </div>
                    <CategoryBreakdown subscriptions={subscriptions} />
                </Card>
            </div>

            <Card animate={false} className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3
                            className="font-bold font-(--font-display) text-(--color-text) text-base"
                        >
                            Most Wasteful Subscriptions
                        </h3>
                        <p className="text-xs text-(--color-text-muted) mt-0.5">
                            Unused for 30+ days, sorted by cost
                        </p>
                    </div>
                    <span
                        className="text-xs bg-(--color-danger-glow) text-(--color-danger) border-[1px] border-[rgba(255,77,106,0.2)] font-semibold px-2.5 py-1 rounded-full"
                    >
                        {formatRupees(summary.unusedMonthly)}/mo wasted
                    </span>
                </div>
                <WastefulList subscriptions={subscriptions} />
            </Card>
        </motion.div>
    );
});

export default Analytics;