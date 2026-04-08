import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Subscription } from '../../types';
import Badge from './Badge';
import Button from './Button';
import { formatRupees, getDaysAgo, getDaysUntil, getRenewalInfo } from '../../utils/calculations';
import { cardVariants, hoverScale } from '../animations/variants';
import Clock from '../icons/Clock';
import Calendar from '../icons/Calendar';
import Pencil from '../icons/Pencil';
import Delete from '../icons/Delete';
import { Corners } from './Corners';
import { cn } from '../../utils/cn';

interface SubscriptionRowProps {
    subscription: Subscription;
    onDelete: (id: string) => void;
}

const SubscriptionRow = memo(({ subscription, onDelete }: SubscriptionRowProps) => {
    const navigate = useNavigate();
    const daysAgo = getDaysAgo(subscription.lastUsed);
    const renewal = getRenewalInfo(
        subscription.purchaseDate,
        subscription.billingCycle
    );

    const handleEdit = useCallback(
        () => navigate(`/edit/${subscription.id}`),
        [navigate, subscription.id]
    );

    const handleDelete = useCallback(
        () => onDelete(subscription.id),
        [onDelete, subscription.id]
    );

    return (
        <motion.div
            variants={cardVariants}
            whileHover={hoverScale}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_0.8fr_1.2fr] items-center gap-4 p-4 relative bg-(--color-surface) border-[1px] border-(--color-border) border-dashed"
        >

            <Corners />

            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                    className="w-10 h-10 bg-(--color-surface-2) border-[1px] border-(--color-border) rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                >
                    {subscription.logo ?? '📦'}
                </div>
                <div className="min-w-0">
                    <p
                        className="font-semibold text-(--color-text) font-(--font-display) text-sm truncate"
                    >
                        {subscription.name}
                    </p>
                    <p className="text-xs text-(--color-text-muted)">
                        {subscription.category}
                    </p>
                </div>
            </div>

            <div className="text-right">
                <p className="text-sm text-(--color-text) font-bold">
                    {formatRupees(subscription.cost)}
                </p>
                <p className="text-xs text-(--color-text-muted)" >
                    / {subscription.billingCycle}
                </p>
            </div>

            <div className="flex items-center gap-1.5">
                <Clock className='text-(--color-text-dim)' />
                <p
                    className={cn(
                        "text-xs",
                        daysAgo > 30
                            ? 'text-(--color-danger)'
                            : 'text-(--color-text-muted)',
                    )}

                >
                    {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
                </p>
            </div>


            <div className="flex items-center gap-1.5">
                <Calendar className='text-(--color-text-dim)' />
                <p
                    className={cn(
                        "text-xs",
                        renewal.days <= 7
                            ? 'text-(--color-warning)'
                            : 'text-(--color-text-muted)',
                    )}
                >
                    {renewal?.label}
                </p>
            </div>

            <div className="flex justify-center">
                <Badge variant={subscription.status}>{subscription.status}</Badge>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm"
                    onClick={handleEdit}
                    icon={<Pencil />}>
                    Edit
                </Button>
                <Button variant="danger" size="sm" onClick={handleDelete}
                    icon={<Delete />}>
                    Delete
                </Button>
            </div>
        </motion.div>
    );
});

export default SubscriptionRow;