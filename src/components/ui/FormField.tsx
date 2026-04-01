import { memo } from 'react';
import { cn } from '../../utils/cn';

interface FormFieldProps {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    hint?: string;
}

const FormField = memo(({ label, error, required, children, hint }: FormFieldProps) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                className="text-xs text-(--color-text-muted) font-semibold uppercase tracking-wider"
            >
                {label}
                {required && (
                    <span className="ml-1 text-(--color-danger)" >*</span>
                )}
            </label>

            {children}

            {hint && !error && (
                <p className="text-xs text-(--color-text-dim)">
                    {hint}
                </p>
            )}
            {error && (
                <p className=" text-(--color-danger)">
                    {error}
                </p>
            )}
        </div>
    );
});


export const inputClass = cn(
    "w-full px-3 py-2 text-sm",
    "bg-(--color-surface-2)",
    "text-(--color-text)",
    "border border-(--color-border)",
    "rounded-(--radius-md)",
    "font-(--font-body)",
    "outline-none transition-colors",
    "focus:border-(--color-primary)"
);

export const inputFocusClass = cn("focus:border-(--color-primary)");

export default FormField;