import { memo, useMemo } from 'react';
import { motion } from 'motion/react';
import Card from '../components/ui/Card';
import { containerVariants } from '../components/animations/variants';
import { useAlerts } from '../hooks/useAlerts';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
import { formatRupees, getSpendingSummary } from '../utils/calculations';
import StatCard from '../components/ui/StatCard';
import Wallet from '../components/icons/Wallet';
import { cn } from '../utils/cn';
import AlertTriangle from '../components/icons/AlertTriangle';
import TrendingUp from '../components/icons/TrendingUp';
import Clock from '../components/icons/Clock';
import AlertCard from '../components/ui/AlertCard';
import SpendingChart from '../components/charts/SpendingChart';
import PageHeader from '../components/ui/PageHeader';

const Dashboard = memo(() => {
    const subscriptions = useSubscriptionStore((s) => s.subscriptions);
    const alerts = useAlerts(subscriptions);

    const summary = useMemo(
        () => getSpendingSummary(subscriptions),
        [subscriptions]
    );

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
        >

            <PageHeader
                title='Dashboard'
                subtitle='Your subscription overview at a glance'
            />

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    label="Monthly Spend"
                    value={formatRupees(summary.totalMonthly)}
                    subtext={`${formatRupees(summary.totalYearly)} / year`}
                    icon={<Wallet className={cn('text-(--color-primary) size-8 ')} />}
                    glowColor="--color-primary-glow"
                />
                <StatCard
                    label="Wasted Monthly"
                    value={formatRupees(summary.unusedMonthly)}
                    subtext={`${summary.unusedCount} unused subscriptions`}
                    icon={<AlertTriangle className={cn('text-(--color-danger) size-8 ')} />}
                    glowColor="--color-danger-glow"
                    borderColor="rgba(255,77,106,0.2)"
                />
                <StatCard
                    label="Active"
                    value={String(summary.activeCount)}
                    subtext="subscriptions in use"
                    icon={<TrendingUp className={cn('text-(--color-accent) size-8 ')} />}
                    glowColor="--color-accent-glow"
                    borderColor="rgba(0,229,176,0.2)"
                />
                <StatCard
                    label="Expiring Soon"
                    value={String(summary.expiringCount)}
                    subtext="renewing within 7 days"
                    icon={<Clock className={cn('text-(--color-warning) size-8 ')} />}
                    glowColor="--color-warning-glow"
                    borderColor="rgba(245,166,35,0.2)"
                />
            </div>

            <div className="grid grid-cols-5 gap-4">

                <Card className="col-span-3 flex flex-col gap-3" animate={false}>
                    <div className="flex items-center justify-between mb-1">
                        <h3
                            className="font-bold text-base font-display text-(--color-text) "
                        >
                            Active Alerts
                        </h3>
                        <span
                            className="text-xs bg-danger-glow text-danger font-semibold px-2 py-0.5 rounded-full"
                        >
                            {alerts.length} issues
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 max-h-72 overflow-y-auto scroll-smooth pr-1">
                        {alerts.length === 0 ? (
                            <p className="text-sm py-6 text-center text-text-muted">
                                ✅ No alerts — all subscriptions look healthy!
                            </p>
                        ) : (
                            alerts?.map((alert, i) => (
                                <AlertCard key={alert.id} alert={alert} index={i} />
                            ))

                        )}
                    </div>
                </Card>

                <Card className="col-span-2 flex flex-col gap-3" animate={false}>
                    <h3
                        className="font-bold text-text font-display text-base"
                    >
                        Spend by Category
                    </h3>
                    <SpendingChart subscriptions={subscriptions} />
                </Card>
            </div>
        </motion.div>
    );
});

export default Dashboard;