import { CATEGORY_COLORS } from "../constant/mockData";
import type {
  CategorySpend,
  MonthlyTrend,
  SpendingSummary,
  Subscription,
  SubscriptionStatus,
} from "../types";

export const computeStatus = (
  lastUsed: string,
  renewalDate: string,
): SubscriptionStatus => {
  const now = Date.now();
  const daysSinceUsed = (now - new Date(lastUsed).getTime()) / 86400000;
  const daysUntilRenewal = (new Date(renewalDate).getTime() - now) / 86400000;

  if (daysSinceUsed > 30) return "unused";
  if (daysUntilRenewal <= 7) return "expiring";
  return "active";
};

export const getSpendingSummary = (
  subscriptions: Subscription[],
): SpendingSummary => {
  const active = subscriptions.filter((s) => s.status !== "cancelled");

  const totalMonthly = active.reduce((sum, s) => {
    if (s.billingCycle === "monthly") return sum + s.cost;
    if (s.billingCycle === "yearly") return sum + s.cost / 12;
    if (s.billingCycle === "weekly") return sum + s.cost * 4.33;
    return sum;
  }, 0);

  const unused = active.filter((s) => s.status === "unused");
  const unusedMonthly = unused.reduce((sum, s) => sum + s.cost, 0);

  return {
    totalMonthly: Math.round(totalMonthly),
    totalYearly: Math.round(totalMonthly * 12),
    unusedMonthly,
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
    const existing = map.get(s.category) ?? { amount: 0, count: 0 };
    map.set(s.category, {
      amount: existing.amount + s.cost,
      count: existing.count + 1,
    });
  });

  return Array.from(map.entries()).map(([category, data]) => ({
    category: category as CategorySpend["category"],
    amount: data.amount,
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
      .reduce(
        (sum, s) => sum + (s.billingCycle === "monthly" ? s.cost : s.cost / 12),
        0,
      );
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

export const getDaysUntil = (dateStr: string): number =>
  Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
