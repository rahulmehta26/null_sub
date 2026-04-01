import { memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import PlusCircle from '../icons/PlusCircle';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';
import { useAlerts } from '../../hooks/useAlerts';
import { BarChart } from 'recharts';

const NAV_ITEMS = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Subscriptions', path: '/subscriptions', icon: CreditCard },
    { label: 'Add New', path: '/add', icon: PlusCircle },
    { label: 'Analytics', path: '/analytics', icon: BarChart },
];


const Sidebar = memo(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const subscriptions = useSubscriptionStore((s) => s.subscriptions);
    const alerts = useAlerts(subscriptions);

    const handleNav = useCallback(
        (path: string) => () => navigate(path),
        [navigate]
    );

    return (
        <aside
            className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40"
            style={{
                background: 'var(--color-surface)',
                borderRight: '1.5px dashed var(--color-border-dashed)',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="px-6 py-7 flex items-center gap-3"
            >
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--color-primary-glow)', border: '1px solid var(--color-primary)' }}
                >
                    <Zap size={16} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                    <h1
                        className="text-lg font-bold tracking-tight"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                    >
                        NullSub
                    </h1>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        Null the waste.
                    </p>
                </div>
            </motion.div>

            <div className="mx-4 h-px" style={{ background: 'var(--color-border)' }} />

            <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <motion.button
                            key={item.path}
                            custom={i}
                            variants={navItemVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleNav(item.path)}
                            whileHover={{ x: 4, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors relative"
                            style={{
                                background: isActive ? 'var(--color-primary-glow)' : 'transparent',
                                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                border: isActive ? '1.5px dashed var(--color-border-dashed)' : '1.5px solid transparent',
                            }}
                        >
                            <Icon size={17} />
                            {item.label}

                            {item.path === '/dashboard' && alerts.length > 0 && (
                                <span
                                    className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
                                    style={{ background: 'var(--color-danger)', color: '#fff', fontSize: '10px' }}
                                >
                                    {alerts.length}
                                </span>
                            )}
                        </motion.button>
                    );
                })}
            </nav>

            <div className="px-4 py-5">
                <div
                    className="rounded-lg p-3 text-xs"
                    style={{
                        background: 'var(--color-surface-2)',
                        border: '1.5px dashed var(--color-border-dashed)',
                        color: 'var(--color-text-muted)',
                    }}
                >
                    <p style={{ color: 'var(--color-accent)' }} className="font-semibold mb-1">
                        💡 Did you know?
                    </p>
                    Indians waste ₹2,400/year on forgotten subscriptions on average.
                </div>
            </div>
        </aside>
    );
});

export default Sidebar;