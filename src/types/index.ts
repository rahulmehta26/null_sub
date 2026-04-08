export type BillingCycle = "monthly" | "yearly" | "quarterly";

export type SubscriptionCategory =
  | "Entertainment"
  | "Productivity"
  | "Music"
  | "Cloud"
  | "Gaming"
  | "Fitness"
  | "News"
  | "Other";

export type SubscriptionStatus = "active" | "unused" | "expiring" | "cancelled";

export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory;
  cost: number;
  billingCycle: BillingCycle;
  purchaseDate: string;
  lastUsed: string;
  status: SubscriptionStatus;
  logo?: string;
  notes?: string;
  createdAt: string;
}

export interface SubscriptionStore {
  subscriptions: Subscription[];
  addSubscription: (
    sub: Omit<Subscription, "id" | "createdAt" | "status" | "lastUsed">,
  ) => void;
  updateSubscription: (id: string, sub: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  getSubscriptionById: (id: string) => Subscription | undefined;
}

export interface SpendingSummary {
  totalMonthly: number;
  totalYearly: number;
  unusedMonthly: number;
  unusedCount: number;
  activeCount: number;
  expiringCount: number;
}

export interface CategorySpend {
  category: SubscriptionCategory;
  amount: number;
  count: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  amount: number;
}

export type AlertType = "unused" | "expiring" | "wasteful";

export interface Alert {
  id: string;
  subscriptionId: string;
  subscriptionName: string;
  type: AlertType;
  message: string;
  severity: "low" | "medium" | "high";
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface FilterOption {
  label: string;
  value: string;
}
