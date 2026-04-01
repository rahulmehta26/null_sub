import { memo, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { useSubscriptionStore } from "../store/useSubscriptionStore";
import { useSubscriptionForm } from "../hooks/useSubscriptionForm";
import Button from "../components/ui/Button";
import type { SubscriptionCategory, BillingCycle } from "../types";
import {
    cardVariants,
    containerVariants,
} from "../components/animations/variants";
import FormField, { inputClass } from "../components/ui/FormField";
import ArrowLeft from "../components/icons/ArrowLeft";
import Sparkles from "../components/icons/Sparkles";
import Save from "../components/icons/Save";
import PageHeader from "../components/ui/PageHeader";
import { cn } from "../utils/cn";

const CATEGORIES: SubscriptionCategory[] = [
    "Entertainment",
    "Productivity",
    "Music",
    "Cloud",
    "Gaming",
    "Fitness",
    "News",
    "Other",
];
const BILLING_CYCLES: BillingCycle[] = ["monthly", "yearly", "weekly"];
const EMOJI_OPTIONS = [
    "🎬",
    "🎵",
    "📦",
    "📺",
    "▶️",
    "☁️",
    "⭐",
    "📝",
    "🎮",
    "💪",
    "📰",
    "🔧",
];

const AddSubscription = memo(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getSubscriptionById, addSubscription, updateSubscription } =
        useSubscriptionStore();

    const isEdit = Boolean(id);
    const existing = id ? getSubscriptionById(id) : undefined;
    const [saved, setSaved] = useState(false);

    const form = useSubscriptionForm(existing, (values) => {
        const payload = {
            name: values.name.trim(),
            category: values.category,
            cost: Number(values.cost),
            billingCycle: values.billingCycle,
            lastUsed: new Date(values.lastUsed).toISOString(),
            renewalDate: new Date(values.renewalDate).toISOString(),
            logo: values.logo || "📦",
            notes: values.notes,
        };
        if (isEdit && id) updateSubscription(id, payload);
        else addSubscription(payload);
        setSaved(true);
        setTimeout(() => navigate("/subscriptions"), 800);
    });

    const handleBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 max-w-2xl"
        >
            <PageHeader
                title={isEdit ? "Edit Subscription" : "Add Subscription"}
                subtitle={
                    isEdit ? "Update the details below" : "Track a new subscription"
                }
            />

            <motion.button
                variants={cardVariants}
                className={cn(
                    "w-fit pl-2 pr-10 py-1 flex items-center cursor-pointer gap-3",
                    " bg-linear-to-r from-(--color-surface) via-[#ffffff81] to-[#ffffff0f] ",
                )}
                onClick={handleBack}
                type="button"
            >
                <ArrowLeft /> Back
            </motion.button>

            <motion.div
                variants={cardVariants}
                className="p-6 rounded-xl bg-(--color-surface) border-[1.5px] border-dashed border-(--color-border-dashed) flex flex-col gap-5"
            >
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <form.Field
                            name="name"
                            validators={{
                                onChange: ({ value }) =>
                                    !value.trim() ? "Name is required" : undefined,
                            }}
                        >
                            {(field) => (
                                <FormField
                                    label="Subscription Name"
                                    required
                                    error={field.state.meta.errors[0]?.toString()}
                                >
                                    <input
                                        className={cn(inputClass)}
                                        placeholder="e.g. Netflix"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                </FormField>
                            )}
                        </form.Field>
                    </div>

                    <form.Field name="logo">
                        {(field) => (
                            <FormField label="Emoji Logo">
                                <div className="flex flex-wrap gap-1.5">
                                    {EMOJI_OPTIONS.map((emoji) => (
                                        <button
                                            key={emoji}
                                            type="button"
                                            onClick={() => field.handleChange(emoji)}
                                            className={cn(
                                                "w-8 h-8 rounded-lg text-base flex items-center justify-center border-[1.5px]",

                                                field.state.value === emoji
                                                    ? "bg-(--color-primary-glow) border-(--color-primary) border-solid"
                                                    : "bg-(--color-surface-2) border-(--color-border-dashed) border-dashed",
                                            )}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </FormField>
                        )}
                    </form.Field>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <form.Field
                        name="cost"
                        validators={{
                            onChange: ({ value }) =>
                                !value || isNaN(Number(value)) || Number(value) <= 0
                                    ? "Enter a valid cost"
                                    : undefined,
                        }}
                    >
                        {(field) => (
                            <FormField
                                label="Cost (₹)"
                                required
                                error={field.state.meta.errors[0]?.toString()}
                            >
                                <input
                                    className={cn(inputClass)}
                                    type="number"
                                    placeholder="e.g. 649"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </FormField>
                        )}
                    </form.Field>

                    <form.Field name="billingCycle">
                        {(field) => (
                            <FormField label="Billing Cycle" required>
                                <select
                                    className={cn(inputClass)}
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value as BillingCycle)
                                    }
                                >
                                    {BILLING_CYCLES.map((c) => (
                                        <option key={c} value={c}>
                                            {c.charAt(0).toUpperCase() + c.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </FormField>
                        )}
                    </form.Field>
                </div>

                <form.Field name="category">
                    {(field) => (
                        <FormField label="Category" required>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map((cat) => {
                                    const isActive = field.state.value === cat;
                                    return (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => field.handleChange(cat)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-md text-xs font-semibold border-[1.5px]",
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
                        </FormField>
                    )}
                </form.Field>

                <div className="grid grid-cols-2 gap-4">
                    <form.Field
                        name="lastUsed"
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "Last used date is required" : undefined,
                        }}
                    >
                        {(field) => (
                            <FormField
                                label="Last Used"
                                required
                                error={field.state.meta.errors[0]?.toString()}
                                hint="When did you last open this app?"
                            >
                                <input
                                    className={cn(inputClass)}
                                    type="date"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </FormField>
                        )}
                    </form.Field>

                    <form.Field
                        name="renewalDate"
                        validators={{
                            onChange: ({ value }) =>
                                !value ? "Renewal date is required" : undefined,
                        }}
                    >
                        {(field) => (
                            <FormField
                                label="Next Renewal"
                                required
                                error={field.state.meta.errors[0]?.toString()}
                                hint="When does it charge next?"
                            >
                                <input
                                    className={cn(inputClass)}
                                    type="date"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </FormField>
                        )}
                    </form.Field>
                </div>

                <form.Field name="notes">
                    {(field) => (
                        <FormField
                            label="Notes"
                            hint="Optional — any context about this subscription"
                        >
                            <textarea
                                className={cn(
                                    inputClass,
                                    "resize-none min-h-[72px]"
                                )}
                                placeholder="e.g. Shared with family, or considering cancelling"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                            />
                        </FormField>
                    )}
                </form.Field>

                <div className="flex items-center gap-3 pt-2">
                    <form.Subscribe selector={(s) => s.canSubmit}>
                        {(canSubmit) => (
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => form.handleSubmit()}
                                disabled={!canSubmit}
                                icon={saved ? <Sparkles /> : <Save />}
                            >
                                {saved
                                    ? "Saved!"
                                    : isEdit
                                        ? "Update Subscription"
                                        : "Add Subscription"}
                            </Button>
                        )}
                    </form.Subscribe>
                    <Button variant="ghost" size="lg" onClick={handleBack}>
                        Cancel
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
});

export default AddSubscription;
