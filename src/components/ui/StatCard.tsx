import { memo } from 'react';
import { motion } from 'motion/react';
import { cardVariants, numberVariants } from '../animations/variants';
import { cn } from '../../utils/cn';
import { Corners } from './Corners';
import { statsCardVariants } from '../../constant/stats-card.constant';

export type StatCardVariant = keyof typeof statsCardVariants;

interface StatCardProps {
    label: string;
    value: string;
    subtext?: string;
    icon: React.ReactNode;
    variant?: StatCardVariant;
    className?: string
}


const StatCard = memo(({
    label,
    value,
    subtext,
    icon,
    variant = "primary",
    className,
}: StatCardProps) => {

    const v = statsCardVariants[variant]
    return (
        <motion.div
            variants={cardVariants}
            className={cn(
                'p-5 relative flex flex-col gap-4',
                'bg-(--color-surface)',
                'border border-dashed ',
                v.border,
                v.glow,
                className
            )}

        >

            <Corners className={cn(v.corner)} />

            <div className="flex items-center justify-between">
                <p
                    className={cn(
                        'text-xs font-semibold uppercase tracking-widest',
                        'text-(--color-text-muted)'
                    )}
                >
                    {label}
                </p>
                <div
                    className={cn(
                        'w-9 h-9 rounded-xl shadow-md bg-(--color-text-dim)/20 flex items-center justify-center',
                    )}
                >
                    {icon}
                </div>
            </div>

            <motion.div
                variants={numberVariants}
                initial="hidden"
                animate="visible"
            >
                <p
                    className={cn(
                        'text-3xl font-bold tracking-tight',
                        'text-(--color-text)',
                        'font-(--font-display)'
                    )}
                >
                    {value}
                </p>
                {subtext && (
                    <p className={cn(
                        'text-xs mt-1',
                        'text-(--color-text-muted)'
                    )}>
                        {subtext}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
});

export default StatCard;