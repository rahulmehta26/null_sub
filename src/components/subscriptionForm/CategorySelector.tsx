import { CATEGORIES } from "../../constant/subscription.constant";
import { cn } from "../../utils/cn";


const CategorySelector = ({ value, onChange }: any) => {
    return (
        <div className="flex flex-wrap gap-2">
            {CATEGORIES?.map((cat) => {
                const isActive = value === cat;

                return (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => onChange(cat)}
                        className={cn(
                            "px-3 py-1.5 cursor-pointer rounded-md text-xs font-semibold border-[1.5px]",
                            isActive
                                ? "bg-(--color-primary) text-white border-transparent"
                                : "bg-(--color-surface-2) text-(--color-text-muted) border-(--color-border-dashed) border-dashed",
                        )}
                    >
                        {cat}
                    </button>
                );
            })}
        </div>
    );
};

export default CategorySelector;