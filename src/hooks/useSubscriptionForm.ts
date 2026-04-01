import { useForm } from "@tanstack/react-form";
import type {
  Subscription,
  SubscriptionCategory,
  BillingCycle,
} from "../types";

export interface SubscriptionFormValues {
  name: string;
  category: SubscriptionCategory;
  cost: string;
  billingCycle: BillingCycle;
  lastUsed: string;
  renewalDate: string;
  logo: string;
  notes: string;
}

const formatDate = (date?: string) => (date ? date.split("T")[0] : "");

const getDefaults = (initial?: Subscription): SubscriptionFormValues => ({
  name: initial?.name ?? "",
  category: initial?.category ?? "Entertainment",
  cost: initial ? String(initial.cost) : "",
  billingCycle: initial?.billingCycle ?? "monthly",
  lastUsed:
    formatDate(initial?.lastUsed) || new Date().toISOString().split("T")[0],
  renewalDate: formatDate(initial?.renewalDate),
  logo: initial?.logo ?? "",
  notes: initial?.notes ?? "",
});

export const useSubscriptionForm = (
  initial: Subscription | undefined,
  onSubmit: (values: SubscriptionFormValues) => void,
) => {
  const form = useForm({
    defaultValues: getDefaults(initial),

    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return form;
};
