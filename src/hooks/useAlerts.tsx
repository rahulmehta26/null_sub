import { useMemo } from 'react';
import type { Alert, Subscription } from '../types';
import { getDaysAgo, getDaysUntil } from '../utils/calculations';


export const useAlerts = (subscriptions: Subscription[]): Alert[] => {
    return useMemo(() => {
        const alerts: Alert[] = [];

        subscriptions.forEach((sub) => {
            const daysUnused = getDaysAgo(sub.lastUsed);
            const daysUntilRenewal = getDaysUntil(sub.renewalDate);

            if (daysUnused > 30) {
                alerts.push({
                    id: `unused-${sub.id}`,
                    subscriptionId: sub.id,
                    subscriptionName: sub.name,
                    type: 'unused',
                    message: `${sub.name} hasn't been used in ${daysUnused} days`,
                    severity: daysUnused > 60 ? 'high' : 'medium',
                });
            }

            if (daysUntilRenewal >= 0 && daysUntilRenewal <= 7) {
                alerts.push({
                    id: `expiring-${sub.id}`,
                    subscriptionId: sub.id,
                    subscriptionName: sub.name,
                    type: 'expiring',
                    message: `${sub.name} renews in ${daysUntilRenewal} day${daysUntilRenewal === 1 ? '' : 's'}`,
                    severity: daysUntilRenewal <= 2 ? 'high' : 'low',
                });
            }

            if (daysUnused > 30 && sub.cost > 200) {
                alerts.push({
                    id: `wasteful-${sub.id}`,
                    subscriptionId: sub.id,
                    subscriptionName: sub.name,
                    type: 'wasteful',
                    message: `You're wasting ₹${sub.cost}/mo on unused ${sub.name}`,
                    severity: 'high',
                });
            }
        });

        const severityOrder = { high: 0, medium: 1, low: 2 };
        return alerts.sort(
            (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
        );
    }, [subscriptions]);
};