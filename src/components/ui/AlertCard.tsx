import { memo } from 'react';
import { motion } from 'motion/react';
import Clock from '../icons/Clock';
import AlertTriangle from '../icons/AlertTriangle';
import TrendingDown from '../icons/TrendingDown';
import type { Alert } from '../../types';
import { alertVariants } from '../animations/variants';


const ALERT_CONFIG = {
    unused: {
        icon: TrendingDown,
        color: 'var(--color-danger)',
        bg: 'var(--color-danger-glow)',
        border: 'rgba(255,77,106,0.2)',
        label: 'Unused',
    },
    expiring: {
        icon: Clock,
        color: 'var(--color-warning)',
        bg: 'var(--color-warning-glow)',
        border: 'rgba(245,166,35,0.2)',
        label: 'Expiring',
    },
    wasteful: {
        icon: AlertTriangle,
        color: 'var(--color-danger)',
        bg: 'var(--color-danger-glow)',
        border: 'rgba(255,77,106,0.2)',
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
            className="flex items-start gap-3 p-3 rounded-xl"
            style={{
                background: config.bg,
                border: `1px solid ${config.border}`,
            }}
        >
            <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: config.bg, color: config.color }}
            >
                <Icon />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <p
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: config.color }}
                    >
                        {config.label}
                    </p>
                    {alert.severity === 'high' && (
                        <span
                            className="text-xs px-1.5 py-px rounded-full font-semibold"
                            style={{ background: config.color, color: '#fff', fontSize: '9px' }}
                        >
                            HIGH
                        </span>
                    )}
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text)' }}>
                    {alert.message}
                </p>
            </div>
        </motion.div>
    );
});

export default AlertCard;