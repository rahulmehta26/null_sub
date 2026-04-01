import { memo } from 'react';
import { motion } from 'motion/react';
import { cardVariants, hoverScale, tapScale } from '../animations/variants';
import { cn } from '../../utils/cn';
import { Corners } from './Corners';


interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverable?: boolean;
    variant?: 'solid' | 'dashed';
    accent?: 'none' | 'danger' | 'warning' | 'accent';
    onClick?: () => void;
    animate?: boolean;
}

const ACCENT_COLORS = {
    none: 'var(--color-border-dashed)',
    danger: 'rgba(192,57,43,0.4)',
    warning: 'rgba(183,112,13,0.4)',
    accent: 'rgba(26,107,74,0.4)',
};

const Card = memo(({
    children,
    className = '',
    hoverable = false,
    variant = 'dashed',
    accent = 'none',
    onClick,
    animate = true,
}: CardProps) => {
    const borderColor = ACCENT_COLORS[accent];
    const isDashed = variant === 'dashed';

    const style: React.CSSProperties = {
        background: 'var(--color-surface)',
        border: isDashed
            ? `1.5px dashed ${borderColor}`
            : `1px solid ${borderColor}`,
        boxShadow: hoverable ? undefined : 'var(--shadow-card)',
    };

    return (
        <motion.div
            variants={animate ? cardVariants : undefined}
            whileHover={hoverable ? { ...hoverScale, boxShadow: 'var(--shadow-hover)' } : undefined}
            whileTap={hoverable && onClick ? tapScale : undefined}
            onClick={onClick}
            style={style}
            className={cn(
                'relative  p-5',
                hoverable && 'cursor-pointer',
                className
            )}
        >
            {variant === 'dashed' && <Corners />}

            {children}
        </motion.div>
    );
});

export default Card;
