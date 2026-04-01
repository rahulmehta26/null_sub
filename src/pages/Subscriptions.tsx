import { memo, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
import { formatRupees, getSpendingSummary } from '../utils/calculations';
import Button from '../components/ui/Button';
import { cardVariants, containerVariants } from '../components/animations/variants';
import PlusCircle from '../components/icons/PlusCircle';
import FilterBar from '../components/ui/FilterBar';
import SubscriptionRow from '../components/ui/SubscriptionRow';


const Subscriptions = memo(() => {
    const navigate = useNavigate();
    const { subscriptions, deleteSubscription } = useSubscriptionStore();

    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeStatus, setActiveStatus] = useState('all');

    const filtered = useMemo(() => {
        return subscriptions.filter((sub) => {
            const matchSearch = sub.name.toLowerCase().includes(search.toLowerCase());
            const matchCat = activeCategory === 'all' || sub.category === activeCategory;
            const matchStatus = activeStatus === 'all' || sub.status === activeStatus;
            return matchSearch && matchCat && matchStatus;
        });
    }, [subscriptions, search, activeCategory, activeStatus]);

    const summary = useMemo(() => getSpendingSummary(filtered), [filtered]);

    const handleDelete = useCallback(
        (id: string) => deleteSubscription(id),
        [deleteSubscription]
    );

    const handleAdd = useCallback(() => navigate('/add'), [navigate]);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
        >
            <motion.div
                variants={cardVariants}
                className="flex items-start justify-between"
            >
                <div>
                    <h2
                        className="text-2xl font-(--font-display) text-(--color-text) font-bold"
                    >
                        Subscriptions
                    </h2>
                    <p className="text-sm text-(--color-text-muted) mt-1">
                        {subscriptions.length} total · {formatRupees(summary.totalMonthly)}/mo
                    </p>
                </div>
                <Button
                    variant="primary"
                    size="md"
                    onClick={handleAdd}
                    icon={<PlusCircle />}
                >
                    Add New
                </Button>
            </motion.div>

            <motion.div variants={cardVariants}>
                <FilterBar
                    search={search}
                    onSearch={setSearch}
                    activeCategory={activeCategory}
                    onCategory={setActiveCategory}
                    activeStatus={activeStatus}
                    onStatus={setActiveStatus}
                />
            </motion.div>

            <motion.div
                variants={cardVariants}
                className="grid px-4 text-var(--color-text-dim) grid-cols-7 gap-7 text-xs font-semibold uppercase tracking-wider"

            >
                <span>Name</span>
                <span className="text-right">Cost</span>
                <span>Last Used</span>
                <span>Renewal</span>
                <span className="text-center">Status</span>
                <span>Actions</span>
            </motion.div>

            <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-16 text-(--color-text-muted) text-center"
                    >
                        <p className="text-4xl mb-3">🔍</p>
                        <p className="font-semibold">No subscriptions found</p>
                        <p className="text-sm mt-1">Try adjusting your filters</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-2"
                    >
                        {filtered.map((sub) => (
                            <SubscriptionRow
                                key={sub.id}
                                subscription={sub}
                                onDelete={handleDelete}
                            />
                        ))}
                    </motion.div>

                )}
            </AnimatePresence>
        </motion.div>
    );
});

export default Subscriptions;