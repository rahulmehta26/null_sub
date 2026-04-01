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
        bg: 'bg-(--color-accent-glow)',
        color: 'text-(--color-accent)',
        border: 'border-[rgba(0,229,176,0.2)]',
    },
    unused: {
        bg: 'bg-(--color-danger-glow)',
        color: 'text-(--color-danger)',
        border: 'border-[rgba(255,77,106,0.2)]',
    },
    expiring: {
        bg: 'bg-(--color-warning-glow)',
        color: 'text-(--color-warning)',
        border: 'border-[rgba(245,166,35,0.2)]',
    },
    cancelled: {
        bg: 'bg-[rgba(107,127,158,0.1)]',
        color: 'text-(--color-text-muted)',
        border: 'border-[rgba(107,127,158,0.2)]',
    },
    default: {
        bg: 'bg-(--color-primary-glow)',
        color: 'text-(--color-primary)',
        border: 'border-[rgba(79,142,247,0.2)]',
    },
};

const Badge = memo(
    ({ variant = 'default', children, className }: BadgeProps) => {
        const style = BADGE_STYLES[variant];

        return (
            <span
                className={cn(
                    'inline-flex tracking-[0.02em] items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
                    className,
                    style.bg,
                    style.color,
                    style.border,
                )}

            >
                {children}
            </span>
        );
    }
);

export default Badge;