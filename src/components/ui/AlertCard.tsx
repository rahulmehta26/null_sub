import { memo } from 'react';
import { motion } from 'motion/react';
import Clock from '../icons/Clock';
import AlertTriangle from '../icons/AlertTriangle';
import TrendingDown from '../icons/TrendingDown';
import type { Alert } from '../../types';
import { alertVariants } from '../animations/variants';
import { cn } from '../../utils/cn';


const ALERT_CONFIG = {
    unused: {
        icon: TrendingDown,
        color: 'text-(--color-danger)',
        bg: 'bg-(--color-danger-glow)',
        border: 'border-[rgba(255,77,106,0.2)]',
        label: 'Unused',
    },
    expiring: {
        icon: Clock,
        color: 'text-(--color-warning)',
        bg: 'bg-(--color-warning-glow)',
        border: 'border-[rgba(245,166,35,0.2)]',
        label: 'Expiring',
    },
    wasteful: {
        icon: AlertTriangle,
        color: 'text-(--color-danger)',
        bg: 'bg-(--color-danger-glow)',
        border: 'border-[rgba(255,77,106,0.2)]',
        label: 'Wasteful',
    },
};


interface AlertCardProps {
    alert: Alert;
    index: number;
}

const AlertCard = memo(({ alert, index }: AlertCardProps) => {
    const config = ALERT_CONFIG[alert.type];
    const Icon = config.icon;

    return (
        <motion.div
            variants={alertVariants}
            custom={index}
            className={cn(
                "flex items-start gap-3 p-3 rounded-xl",
                config.bg,
                config.border
            )}

        >
            <div
                className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                    config.bg,
                    config.color
                )}
            >
                <Icon />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <p
                        className={cn(
                            "text-xs font-bold uppercase tracking-wider",
                            config.color
                        )}
                    >
                        {config.label}
                    </p>
                    {alert.severity === 'high' && (
                        <span
                            className={cn(
                                "text-xs px-1.5 py-px text-[#fff] text-[9px] rounded-full font-semibold",
                                config.color
                            )}
                        >
                            HIGH
                        </span>
                    )}
                </div>
                <p className="text-sm text-(--color-text)">
                    {alert.message}
                </p>
            </div>
        </motion.div>
    );
});

export default AlertCard;