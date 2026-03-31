import { memo, useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import type { Subscription } from '../../types';
import { getMonthlyTrend } from '../../utils/calculations';

interface MonthlyTrendChartProps {
    subscriptions: Subscription[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div
            className="px-3 py-2 bg-(--color-surface-2) text-(--color-text) border-[1px] border-(--color-border) rounded-xl text-sm"
        >
            <p className="font-semibold">{label}</p>
            <p className='text-(--color-primary)'>₹{payload[0].value}</p>
        </div>
    );
};


const MonthlyTrendChart = memo(({ subscriptions }: MonthlyTrendChartProps) => {
    const data = useMemo(() => getMonthlyTrend(subscriptions), [subscriptions]);

    return (
        <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} barSize={28}>
                <CartesianGrid
                    vertical={false}
                    stroke="var(--color-border)"
                    strokeDasharray="4 4"
                />
                <XAxis
                    dataKey="month"
                    tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `₹${v}`}
                    width={55}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(79,142,247,0.06)' }} />
                <Bar
                    dataKey="amount"
                    fill="var(--color-primary)"
                    radius={[6, 6, 0, 0]}
                    opacity={0.85}
                />
            </BarChart>
        </ResponsiveContainer>
    );
});

export default MonthlyTrendChart;