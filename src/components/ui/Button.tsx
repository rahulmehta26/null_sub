import { memo } from 'react';
import { motion } from 'motion/react';
import { Corners } from './Corners';
import { tapScale } from '../animations/variants';
import { cn } from '../../utils/cn';


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


const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white border border-[var(--color-primary)]",
  outline:
    "bg-transparent text-[var(--color-text)] border border-[var(--color-primary)]",
  dashed:
    "bg-[var(--color-surface)] text-[var(--color-text)] border border-dashed border-[var(--color-border-dashed)]",
  danger:
    "bg-[var(--color-danger-glow)] text-[var(--color-danger)] border border-dashed border-[rgba(192,57,43,0.35)]",
  ghost:
    "bg-transparent text-[var(--color-text-muted)] border border-transparent",
};

const Button = memo(({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  icon,
}: ButtonProps) => {


  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? tapScale : undefined}
      whileHover={!disabled ? { y: -1, transition: { duration: 0.15 } } : undefined}
      className={cn(
        "relative flex justify-center items-center gap-2 font-semibold",
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        disabled
          ? "opacity-[0.45] cursor-not-allowed"
          : "cursor-pointer",
        className
      )}
      style={{
        fontFamily: "var(--font-body)",
        borderRadius: "var(--radius-sm)",
        letterSpacing: "0.01em",
      }}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </motion.button>
  );
});


export default Button;