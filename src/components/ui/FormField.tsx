import { memo } from 'react';

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
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-text-muted)' }}
            >
                {label}
                {required && (
                    <span className="ml-1" style={{ color: 'var(--color-danger)' }}>*</span>
                )}
            </label>

            {children}

            {hint && !error && (
                <p className="text-xs" style={{ color: 'var(--color-text-dim)' }}>
                    {hint}
                </p>
            )}
            {error && (
                <p className="text-xs" style={{ color: 'var(--color-danger)' }}>
                    {error}
                </p>
            )}
        </div>
    );
});


export const inputStyle: React.CSSProperties = {
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    padding: '10px 14px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
};

export const focusStyle: React.CSSProperties = {
    borderColor: 'var(--color-primary)',
};

export default FormField;