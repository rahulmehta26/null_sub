import { memo } from 'react';
import { cn } from '../../utils/cn';

type BadgeVariant = 'active' | 'unused' | 'expiring' | 'cancelled' | 'default';

interface BadgeProps {
    variant?: BadgeVariant;
    children: React.ReactNode;
    className?: string;
}

const BADGE_STYLES: Record<
    BadgeVariant,
    { bg: string; color: string; border: string }
> = {
    active: {
        bg: 'var(--color-accent-glow)',
        color: 'var(--color-accent)',
        border: 'rgba(0,229,176,0.2)',
    },
    unused: {
        bg: 'var(--color-danger-glow)',
        color: 'var(--color-danger)',
        border: 'rgba(255,77,106,0.2)',
    },
    expiring: {
        bg: 'var(--color-warning-glow)',
        color: 'var(--color-warning)',
        border: 'rgba(245,166,35,0.2)',
    },
    cancelled: {
        bg: 'rgba(107,127,158,0.1)',
        color: 'var(--color-text-muted)',
        border: 'rgba(107,127,158,0.2)',
    },
    default: {
        bg: 'var(--color-primary-glow)',
        color: 'var(--color-primary)',
        border: 'rgba(79,142,247,0.2)',
    },
};

const Badge = memo(
    ({ variant = 'default', children, className }: BadgeProps) => {
        const style = BADGE_STYLES[variant];

        return (
            <span
                className={cn(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                    className
                )}
                style={{
                    background: style.bg,
                    color: style.color,
                    border: `1px solid ${style.border}`,
                    letterSpacing: '0.02em',
                }}
            >
                {children}
            </span>
        );
    }
);

export default Badge;