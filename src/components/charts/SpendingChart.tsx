import { memo, useMemo } from 'react';
import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { Subscription } from '../../types';
import { getCategorySpend } from '../../utils/calculations';
import { cn } from '../../utils/cn';

interface SpendingChartProps {
    subscriptions: Subscription[];
}

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;

    const data = payload[0].payload;

    return (
        <div
            className={cn(
                'px-3 py-2 rounded-xl text-sm',
                'bg-(--color-surface-2)',
                'border border-(--color-border)',
                'text-(--color-text)'
            )}
        >
            <p className="font-semibold">{data.category}</p>

            <p className="text-(--color-text-muted)">
                ₹{data.amount}/mo
            </p>

            <p className="text-(--color-text-muted)">
                {data.count} sub{data.count > 1 ? 's' : ''}
            </p>
        </div>
    );
};

const SpendingChart = memo(({ subscriptions }: SpendingChartProps) => {
    const data = useMemo(
        () =>
            getCategorySpend(subscriptions).map((item) => ({
                ...item,
                fill: item.color,
            })),
        [subscriptions]
    );

    return (
        <div className="w-full h-full flex flex-col">
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="amount"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                {data.map((item) => (
                    <div
                        key={item.category}
                        className="flex items-center gap-1.5"
                    >
                        <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: item.color }}
                        />
                        <span className="text-xs text-(--color-text-muted)">
                            {item.category}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default SpendingChart;