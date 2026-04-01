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

const ACCENT_CLASSES = {
    none: "border-(--color-border-dashed)",
    danger: "border-[rgba(192,57,43,0.4)]",
    warning: "border-[rgba(183,112,13,0.4)]",
    accent: "border-[rgba(26,107,74,0.4)]",
};

const VARIANT_CLASSES = {
    solid: "border border-(--color-border-dashed)",
    dashed: "border-[1.5px] border-dashed",
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

    return (
        <motion.div
            variants={animate ? cardVariants : undefined}
            whileHover={hoverable ? { ...hoverScale, boxShadow: 'var(--shadow-hover)' } : undefined}
            whileTap={hoverable && onClick ? tapScale : undefined}
            onClick={onClick}
            className={cn(
                "relative p-5 bg-(--color-surface) shadow-(--shadow-card)",
                VARIANT_CLASSES[variant],
                ACCENT_CLASSES[accent],
                hoverable && "cursor-pointer",
                className
            )}
        >
            {variant === 'dashed' && <Corners />}

            {children}
        </motion.div>
    );
});

export default Card;
