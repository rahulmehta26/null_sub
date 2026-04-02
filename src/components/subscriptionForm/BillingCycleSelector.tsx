import { BILLING_CYCLES } from "../../constant/subscription.constant";
import { cn } from "../../utils/cn";

const BillingCycleSelector = ({ value, onChange }: any) => {
    return (
        <div className="flex gap-2">
            {BILLING_CYCLES?.map((c) => {
                const isActive = value === c;

                return (
                    <button
                        key={c}
                        type="button"
                        onClick={() => onChange(c)}
                        className={cn(
                            "flex-1 px-3 border-dashed cursor-pointer border-(--color-border-dashed) py-2 text-sm font-semibold border",
                            isActive
                                ? "bg-(--color-primary) text-white"
                                : "bg-(--color-surface-2)"
                        )}
                    >
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                );
            })}
        </div>
    );
};

export default BillingCycleSelector;