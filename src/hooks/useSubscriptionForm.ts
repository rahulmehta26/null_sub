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

  purchaseDate: string;

  logo: string;
  notes: string;
}

const formatDate = (date?: string) => (date ? date.split("T")[0] : "");

// default values for add/edit
const getDefaults = (initial?: Subscription): SubscriptionFormValues => ({
  name: initial?.name ?? "",
  category: initial?.category ?? "Entertainment",
  cost: initial ? String(initial.cost) : "",
  billingCycle: initial?.billingCycle ?? "monthly",

  // ✅ FIXED: use purchaseDate
  purchaseDate:
    formatDate(initial?.purchaseDate) || new Date().toISOString().split("T")[0],

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
