import { memo } from "react";
import FormField, { inputClass } from "../ui/FormField";
import { bindField } from "../../utils/bindField";
import BillingCycleSelector from "./BillingCycleSelector";
import CategorySelector from "./CategorySelector";
import EmojiPicker from "./EmojiPicker";
import { cn } from "../../utils/cn";
import { getRenewalInfo } from "../../utils/calculations";

const formatDate = (date: string) => {
    if (!date) return "";
    return date.split("T")[0];
};

const SubscriptionForm = ({ form }: any) => {

    const purchaseDate = form.getFieldValue("purchaseDate");
    const billingCycle = form.getFieldValue("billingCycle");

    const renewal =
        purchaseDate && billingCycle
            ? getRenewalInfo(purchaseDate, billingCycle)
            : null;

    return (
        <>
            <div className="grid grid-cols-3 pb-3 gap-4">
                <div className="col-span-2">
                    <form.Field
                        name="name"
                        validators={{
                            onChange: ({ value }: { value: string }) =>
                                !value.trim() ? "Name is required" : undefined,
                        }}
                    >
                        {(field: any) => (
                            <FormField
                                label="Subscription Name"
                                required
                                error={field.state.meta.errors[0]?.toString()}
                            >
                                <input
                                    className={cn(inputClass)}
                                    placeholder="e.g. Netflix"
                                    {...bindField(field)}
                                />
                            </FormField>
                        )}
                    </form.Field>
                </div>

                <form.Field name="logo">
                    {(field: any) => (
                        <FormField label="Emoji">
                            <EmojiPicker
                                value={field.state.value}
                                onChange={field.handleChange}
                            />
                        </FormField>
                    )}
                </form.Field>
            </div>

            <div className="grid grid-cols-2 py-3 gap-4">
                <form.Field
                    name="cost"
                    validators={{
                        onChange: ({ value }: { value: string }) =>
                            !value || isNaN(Number(value))
                                ? "Valid cost required"
                                : undefined,
                    }}
                >
                    {(field: any) => (
                        <FormField
                            error={field.state.meta.errors[0]?.toString()}
                            required
                            label="Cost"
                        >
                            <input
                                type="number"
                                min={0}
                                step={1}
                                placeholder="Enter subscription amount"
                                className={cn(inputClass)}
                                {...bindField(field)}
                            />
                        </FormField>
                    )}
                </form.Field>

                <form.Field
                    name="billingCycle"
                    validators={{
                        onChange: ({ value }: { value: string }) =>
                            !value.trim()
                                ? "Billing cycle is required"
                                : undefined,
                    }}
                >
                    {(field: any) => (
                        <FormField required label="Billing Cycle">
                            <BillingCycleSelector
                                value={field.state.value}
                                onChange={field.handleChange}
                            />
                        </FormField>
                    )}
                </form.Field>
            </div>

            <div
                className="py-3"
            >

                <form.Field
                    name="category"
                    validators={{
                        onChange: ({ value }: { value: string }) =>
                            !value.trim() ? "Category is required" : undefined,
                    }}
                >
                    {(field: any) => (
                        <FormField
                            error={field.state.meta.errors[0]?.toString()}
                            label="Category"
                        >
                            <CategorySelector
                                value={field.state.value}
                                onChange={field.handleChange}
                            />
                        </FormField>
                    )}
                </form.Field>

            </div>

            <div
                className="py-3 grid grid-cols-2 gap-4"
            >

                <form.Field
                    name="purchaseDate"
                    validators={{
                        onChange: ({ value }: { value: string }) =>
                            !value ? "Purchase date is required" : undefined,
                    }}
                >
                    {(field: any) => (
                        <FormField
                            label="Purchase Date"
                            required
                            error={field.state.meta.errors[0]?.toString()}
                        >
                            <input
                                type="date"
                                className={cn(inputClass)}
                                value={formatDate(field.state.value)}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                        </FormField>
                    )}
                </form.Field>

                <div className="flex flex-col justify-center text-sm">
                    <p className="text-(--color-text-muted)">Renewal</p>

                    {renewal ? (
                        <p className="text-(--color-text) font-semibold">
                            {renewal?.date.toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                            <span className="ml-2 text-(--color-text-muted)">
                                ({renewal.label})
                            </span>
                        </p>
                    ) : (
                        <p className="text-(--color-text-dim)">
                            Select date & cycle
                        </p>
                    )}
                </div>

            </div>

            <div className="py-3" >

                <form.Field name="notes">
                    {(field: any) => (
                        <FormField
                            hint="Optional — any context about this subscription"
                            label="Notes"
                        >
                            <textarea
                                placeholder="e.g. Shared with family, or considering cancelling"
                                className={cn(
                                    inputClass,
                                    "resize-none min-h-[72px]"
                                )}
                                {...bindField(field)}
                            />
                        </FormField>
                    )}
                </form.Field>
            </div>
        </>
    );
};

export default memo(SubscriptionForm);