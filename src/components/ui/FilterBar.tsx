import { memo, useCallback } from "react";
import { motion } from "motion/react";
import Search from "../icons/Search";
import { cn } from "../../utils/cn";
import { Corners } from "./Corners";

interface FilterBarProps {
    search: string;
    onSearch: (val: string) => void;
    activeCategory: string;
    onCategory: (cat: string) => void;
    activeStatus: string;
    onStatus: (status: string) => void;
}

const CATEGORIES: Array<{ label: string; value: string }> = [
    { label: "All", value: "all" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Productivity", value: "Productivity" },
    { label: "Music", value: "Music" },
    { label: "Cloud", value: "Cloud" },
    { label: "Gaming", value: "Gaming" },
    { label: "Other", value: "Other" },
];

const STATUSES: Array<{ label: string; value: string }> = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Unused", value: "unused" },
    { label: "Expiring", value: "expiring" },
];

const FilterBar = memo(
    ({
        search,
        onSearch,
        activeCategory,
        onCategory,
        activeStatus,
        onStatus,
    }: FilterBarProps) => {
        const handleSearch = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value),
            [onSearch],
        );

        return (
            <div className="flex flex-col gap-3">
                <div className="relative border border-dashed">

                    <Corners />
                    <Search className="absolute text-(--color-text-dim) left-3 top-1/2 -translate-y-1/2" />

                    <input
                        type="text"
                        placeholder="Search subscriptions..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full pl-9 bg-(--color-surface) border[1px] border-(--color-border) text-(--color-text) font-(--font-body) pr-4 py-2.5 text-sm rounded-xl outline-none"
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    {CATEGORIES.map((cat) => (
                        <motion.button
                            key={cat.value}
                            onClick={() => onCategory(cat.value)}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "px-3 cursor-pointer py-1 border-[1px] border-(--color-border) rounded-lg text-xs font-semibold transition-colors",
                                activeCategory === cat.value ? "bg-(--color-primary)" : "bg-(--color-surface-2)",
                                activeCategory === cat.value ? "text-[#fff]" : "text-(--color-text-muted)",
                            )}
                        >
                            {cat.label}
                        </motion.button>
                    ))}
                </div>

                <div className="flex gap-2">
                    {STATUSES.map((s) => (
                        <motion.button
                            key={s.value}
                            onClick={() => onStatus(s.value)}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "px-3 py-1 border-[1px] cursor-pointer rounded-lg text-xs font-semibold",
                                activeStatus === s.value
                                    ? "bg-(--color-surface-2)"
                                    : "bg-transparent",
                                activeStatus === s.value
                                    ? "text-(--color-text)"
                                    : "text-(--color-text-muted)",
                                activeStatus === s.value
                                    ? "border-(--color-border)"
                                    : "border-transparent"
                            )}
                        >
                            {s.label}
                        </motion.button>
                    ))}
                </div>
            </div>
        );
    },
);

export default FilterBar;
