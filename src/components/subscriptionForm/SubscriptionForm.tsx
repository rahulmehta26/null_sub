import { memo } from "react";
import FormField, { inputClass } from "../ui/FormField";
import { bindField } from "../../utils/bindField";
import BillingCycleSelector from "./BillingCycleSelector";
import CategorySelector from "./CategorySelector";
import EmojiPicker from "./EmojiPicker";
import { cn } from "../../utils/cn";

const SubscriptionForm = ({ form }: any) => {
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
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

            <div className="grid grid-cols-2 gap-4">
                <form.Field
                    validators={{
                        onChange: ({ value }: { value: string }) =>
                            !value.trim() ? "Cost is required" : undefined,
                    }}
                    name="cost"
                >
                    {(field: any) => (
                        <FormField
                            error={field.state.meta.errors[0]?.toString()}
                            required
                            label="Cost"
                        >
                            <input
                                type="text"
                                placeholder="enter subscription money"
                                className={cn(inputClass)}
                                {...bindField(field)}
                            />
                        </FormField>
                    )}
                </form.Field>

                <form.Field
                    validators={{
                        onChange: ({ value }: { value: string }) =>
                            !value.trim() ? "Billing cycle is required" : undefined,
                    }}
                    name="billingCycle"
                >
                    {(field: any) => (
                        <FormField
                            required
                            label="Billing Cycle"
                        >
                            <BillingCycleSelector
                                value={field.state.value}
                                onChange={field.handleChange}
                            />
                        </FormField>
                    )}
                </form.Field>
            </div>

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

            <div className="grid grid-cols-2 gap-4">
                <form.Field
                    name="lastUsed"
                    validators={{
                        onChange: ({ value }: { value: string }) =>
                            !value ? "Last used date is required" : undefined,
                    }}
                >
                    {(field: any) => (
                        <FormField
                            label="Last Used"
                            required
                            error={field.state.meta.errors[0]?.toString()}
                        >
                            <input
                                type="date"
                                className={cn(inputClass)}
                                {...bindField(field)}
                            />
                        </FormField>
                    )}
                </form.Field>

                <form.Field
                    name="renewalDate"
                    validators={{
                        onChange: ({ value }: { value: string }) =>
                            !value ? "Renewal date is required" : undefined,
                    }}
                >
                    {(field: any) => (
                        <FormField
                            label="Next Renewal"
                            required
                            error={field.state.meta.errors[0]?.toString()}
                        >
                            <input
                                type="date"
                                className={cn(inputClass)}
                                {...bindField(field)}
                            />
                        </FormField>
                    )}
                </form.Field>
            </div>

            <form.Field name="notes">
                {(field: any) => (
                    <FormField
                        hint="Optional — any context about this subscription"
                        label="Notes"
                    >
                        <textarea
                            placeholder="e.g. Shared with family, or considering cancelling"
                            className={cn(inputClass, "resize-none min-h-[72px]")}
                            {...bindField(field)}
                        />
                    </FormField>
                )}
            </form.Field>
        </>
    );
};

export default memo(SubscriptionForm);