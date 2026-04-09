import { CATEGORY_COLORS } from "../constant/mockData";
import type {
  CategorySpend,
  MonthlyTrend,
  SpendingSummary,
  Subscription,
  SubscriptionStatus,
} from "../types";

export const getNextRenewalDate = (
  purchaseDate: string,
  billingCycle: string,
) => {
  const date = new Date(purchaseDate);

  if (billingCycle === "monthly") date.setMonth(date.getMonth() + 1);
  if (billingCycle === "quarterly") date.setMonth(date.getMonth() + 3);
  if (billingCycle === "yearly") date.setFullYear(date.getFullYear() + 1);

  return date;
};

export const getRenewalInfo = (
  purchaseDate: string,
  billingCycle: "monthly" | "yearly" | "quarterly",
) => {
  const purchase = new Date(purchaseDate);
  const now = new Date();

  const renewal = new Date(purchase);

  if (billingCycle === "monthly") {
    renewal.setMonth(renewal.getMonth() + 1);
  } else if (billingCycle === "quarterly") {
    renewal.setMonth(renewal.getMonth() + 3);
  } else if (billingCycle === "yearly") {
    renewal.setFullYear(renewal.getFullYear() + 1);
  }

  const diff = renewal.getTime() - now.getTime();
  const days = Math.ceil(diff / 86400000);

  let label = "";

  if (days <= 0) label = "Overdue";
  else if (days === 0) label = "Today";
  else label = `in ${days}d`;

  return {
    date: renewal,
    days,
    label,
  };
};

export const computeStatus = (
  lastUsed: string,
  purchaseDate: string,
  billingCycle: string,
): SubscriptionStatus => {
  const now = Date.now();

  const daysSinceUsed = (now - new Date(lastUsed).getTime()) / 86400000;

  const renewalDate = getNextRenewalDate(purchaseDate, billingCycle);

  const daysUntilRenewal = (renewalDate.getTime() - now) / 86400000;

  if (daysSinceUsed > 30) return "unused";
  if (daysUntilRenewal <= 7) return "expiring";
  return "active";
};

const getMonthlyCost = (s: Subscription) => {
  if (s.billingCycle === "monthly") return s.cost;
  if (s.billingCycle === "yearly") return s.cost / 12;
  if (s.billingCycle === "quarterly") return s.cost / 3;
  return s.cost;
};

export const getSpendingSummary = (
  subscriptions: Subscription[],
): SpendingSummary => {
  const active = subscriptions.filter((s) => s.status !== "cancelled");

  const totalMonthly = active.reduce((sum, s) => sum + getMonthlyCost(s), 0);

  const unused = active.filter((s) => s.status === "unused");

  const unusedMonthly = unused.reduce((sum, s) => sum + getMonthlyCost(s), 0);

  return {
    totalMonthly: Math.round(totalMonthly),
    totalYearly: Math.round(totalMonthly * 12),
    unusedMonthly: Math.round(unusedMonthly),
    unusedCount: unused.length,
    activeCount: active.filter((s) => s.status === "active").length,
    expiringCount: active.filter((s) => s.status === "expiring").length,
  };
};

export const getCategorySpend = (
  subscriptions: Subscription[],
): CategorySpend[] => {
  const map = new Map<string, { amount: number; count: number }>();

  subscriptions.forEach((s) => {
    const existing = map.get(s.category) ?? {
      amount: 0,
      count: 0,
    };

    map.set(s.category, {
      amount: existing.amount + getMonthlyCost(s),
      count: existing.count + 1,
    });
  });

  return Array.from(map.entries()).map(([category, data]) => ({
    category: category as CategorySpend["category"],
    amount: Math.round(data.amount),
    count: data.count,
    color: CATEGORY_COLORS[category] ?? "#6b7f9e",
  }));
};

export const getMonthlyTrend = (
  subscriptions: Subscription[],
): MonthlyTrend[] => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonth = new Date().getMonth();

  return Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - 5 + i + 12) % 12;

    const baseAmount = subscriptions
      .filter((s) => s.status !== "cancelled")
      .reduce((sum, s) => sum + getMonthlyCost(s), 0);

    const variance = (Math.random() - 0.5) * 200;

    return {
      month: months[monthIndex],
      amount: Math.round(baseAmount + variance),
    };
  });
};

export const formatRupees = (amount: number): string =>
  `₹${amount.toLocaleString("en-IN")}`;

export const getDaysAgo = (dateStr: string): number =>
  Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);

export const getDaysUntil = (date: Date): number =>
  Math.ceil((date.getTime() - Date.now()) / 86400000);
