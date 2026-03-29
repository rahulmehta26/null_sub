import { memo } from 'react';
import { motion } from 'motion/react';
import { tapScale } from '../animations/variants';
// import { tapScale } from '../../animations/variants';


type ButtonVariant = 'primary' | 'outline' | 'dashed' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    icon?: React.ReactNode;
}


const SIZE_CLASSES: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-2.5 text-sm',
};


const getVariantStyle = (variant: ButtonVariant): React.CSSProperties => {
    switch (variant) {
        case 'primary':
            return { background: 'var(--color-primary)', color: '#fff', border: '1.5px solid var(--color-primary)' };
        case 'outline':
            return { background: 'transparent', color: 'var(--color-text)', border: '1.5px solid var(--color-primary)' };
        case 'dashed':
            return { background: 'var(--color-surface)', color: 'var(--color-text)', border: '1.5px dashed var(--color-border-dashed)' };
        case 'danger':
            return { background: 'var(--color-danger-glow)', color: 'var(--color-danger)', border: '1.5px dashed rgba(192,57,43,0.35)' };
        case 'ghost':
            return { background: 'transparent', color: 'var(--color-text-muted)', border: '1.5px solid transparent' };
    }
};


const CornerBrackets = () => (
    <>
        <span style={{
            position: 'absolute', top: -1, left: -1, width: 7, height: 7,
            borderTop: '2px solid var(--color-primary)', borderLeft: '2px solid var(--color-primary)'
        }} />
        <span style={{
            position: 'absolute', top: -1, right: -1, width: 7, height: 7,
            borderTop: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)'
        }} />
        <span style={{
            position: 'absolute', bottom: -1, left: -1, width: 7, height: 7,
            borderBottom: '2px solid var(--color-primary)', borderLeft: '2px solid var(--color-primary)'
        }} />
        <span style={{
            position: 'absolute', bottom: -1, right: -1, width: 7, height: 7,
            borderBottom: '2px solid var(--color-primary)', borderRight: '2px solid var(--color-primary)'
        }} />
    </>
);


const Button = memo(({
    children, variant = 'primary', size = 'md',
    onClick, disabled = false, type = 'button',
    className = '', icon,
}: ButtonProps) => {
    const isDashed = variant === 'dashed';

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileTap={!disabled ? tapScale : undefined}
            whileHover={!disabled ? { y: -1, transition: { duration: 0.15 } } : undefined}
            className={`relative inline-flex items-center gap-2 font-semibold ${SIZE_CLASSES[size]} ${className}`}
            style={{
                ...getVariantStyle(variant),
                opacity: disabled ? 0.45 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontFamily: 'var(--font-body)',
                borderRadius: 'var(--radius-sm)',
                letterSpacing: '0.01em',
            }}
        >
            {isDashed && <CornerBrackets />}
            {icon && <span className="flex items-center">{icon}</span>}
            {children}
        </motion.button>
    );
});

export default Button;