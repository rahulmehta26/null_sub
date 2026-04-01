import { memo } from "react";
import { motion } from "motion/react";
import { tapScale } from "../animations/variants";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "outline" | "dashed" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    icon?: React.ReactNode;
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-sm",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
    primary:
        "bg-(--color-primary) text-white border-[1.5px] border-(--color-primary)",

    outline:
        "bg-transparent text-(--color-text) border-[1.5px] border-(--color-primary)",

    dashed:
        "bg-(--color-surface) text-(--color-text) border-[1.5px] border-dashed border-(--color-border-dashed)",

    danger:
        "bg-(--color-danger-glow) text-(--color-danger) border-[1.5px] border-dashed border-[rgba(192,57,43,0.35)]",

    ghost:
        "bg-transparent text-(--color-text-muted) border-[1.5px] border-transparent",
};


const Button = memo(
    ({
        children,
        variant = "primary",
        size = "md",
        onClick,
        disabled = false,
        type = "button",
        className,
        icon,
    }: ButtonProps) => {

        return (
            <motion.button
                type={type}
                onClick={onClick}
                disabled={disabled}
                whileTap={!disabled ? tapScale : undefined}
                whileHover={
                    !disabled ? { y: -1, transition: { duration: 0.15 } } : undefined
                }
                className={cn(
                    "relative inline-flex items-center gap-2 font-semibold font-(--font-body) rounded-(--radius-sm) tracking-[0.01em]",
                    SIZE_CLASSES[size],
                    VARIANT_CLASSES[variant],
                    disabled && "opacity-45 cursor-not-allowed",
                    !disabled && "cursor-pointer",
                    className
                )}
            >
                {icon && <span className="flex items-center">{icon}</span>}
                {children}
            </motion.button>
        );
    },
);

export default Button;
