import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { Subscription, SubscriptionStore } from "../types";
import { computeStatus } from "../utils/calculations";
import { mockSubscriptions } from "../constant/mockData";

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      subscriptions: mockSubscriptions,

      addSubscription: (sub) => {
        const now = new Date().toISOString();

        const newSub: Subscription = {
          ...sub,
          id: uuidv4(),
          createdAt: now,
          lastUsed: now,
          status: computeStatus(now, sub.purchaseDate, sub.billingCycle),
        };
        set((state) => ({
          subscriptions: [...state.subscriptions, newSub],
        }));
      },

      updateSubscription: (id, updates) => {
        set((state) => ({
          subscriptions: state.subscriptions.map((sub) => {
            if (sub.id !== id) return sub;
            const updated = { ...sub, ...updates };
            return {
              ...updated,
              status: computeStatus(
                updated.lastUsed,
                updated.purchaseDate,
                updated.billingCycle,
              ),
            };
          }),
        }));
      },

      deleteSubscription: (id) => {
        set((state) => ({
          subscriptions: state.subscriptions.filter((sub) => sub.id !== id),
        }));
      },

      getSubscriptionById: (id) => {
        return get().subscriptions.find((sub) => sub.id === id);
      },
    }),
    {
      name: "nullsub-storage",
      version: 1,
    },
  ),
);
