import { memo } from 'react';
import { motion } from 'motion/react';
import { cardVariants, numberVariants } from '../animations/variants';
import { cn } from '../../utils/cn';
import { Corners } from './Corners';


interface StatCardProps {
    label: string;
    value: string;
    subtext?: string;
    icon: React.ReactNode;
    glowColor?: string;
    borderColor?: string;
}


const StatCard = memo(({
    label,
    value,
    subtext,
    icon,
    glowColor = '--color-primary-glow',
    borderColor = '--color-border',
}: StatCardProps) => {
    return (
        <motion.div
            variants={cardVariants}
            className={cn(
                'p-5 relative flex flex-col gap-4',
                'bg-(--color-surface)',
                'border border-dashed ',
                `border-[${borderColor}]`,
                `shadow-[0_4px_24px_${glowColor}]`
            )}

        >

            <Corners />

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
                        'w-9 h-9 rounded-xl flex items-center justify-center',
                        `bg-[${glowColor}]`
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