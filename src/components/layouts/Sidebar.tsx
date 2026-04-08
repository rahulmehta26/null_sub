import { memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import PlusCircle from '../icons/PlusCircle';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';
import { useAlerts } from '../../hooks/useAlerts';
import CreditCard from '../icons/CreditCard';
import DashboardIcon from '../icons/DashboardIcon';
import { navItemVariants } from '../animations/variants';
import BarChart from '../icons/BarChart';
import { Corners } from '../ui/Corners';
import { cn } from '../../utils/cn';
import logo from "../../assets/nullSub.png"

const NAV_ITEMS = [
    { label: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
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
            className="fixed bg-(--color-surface) border-r-[1.5px] border-dashed border-(--color-border-dashed) left-0 top-0 h-screen w-64 flex flex-col z-40"
        >
            <motion.button
                onClick={() => navigate("/")}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="px-6 py-7 cursor-pointer flex items-center gap-3"
                type='button'
            >
                <div
                    className="w-10 h-10 rounded-lg bg-(--color-primary-glow) border-[1px] border-[--color-primary]  flex items-center justify-center"
                >
                    <img
                        src={logo}
                        loading="lazy"
                        className='object-cover w-full h-full '
                        alt='NullSub illustration'
                    />
                </div>
                <div>
                    <h1
                        className="text-lg font-bold text-(--color-text) font-(--font-display) tracking-tight"
                    >
                        NullSub
                    </h1>
                    <p className="text-xs text-(--color-text-muted)">
                        Null the waste.
                    </p>
                </div>
            </motion.button>

            <div className="mx-4 bg-(--color-border) h-px" />

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
                            className={cn(
                                "w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-left transition-colors relative",
                                isActive ? 'bg-(--color-primary-glow)' : 'bg-transparent',
                                isActive ? 'text-(--color-primary)' : 'text-(--color-text-muted)',
                                isActive ? 'border-[1.5px] border-dashed border-(--color-border-dashed)' : 'border-[1.5px] border-solid border-transparent',
                            )}
                        >
                            {
                                isActive && <Corners />
                            }

                            <Icon className='size-6' />

                            {item.label}

                            {item.path === '/dashboard' && alerts.length > 0 && (
                                <span
                                    className="ml-auto bg-(--color-danger) text-[#fff] text-[10px] text-xs font-bold px-1.5 py-0.5 rounded-full"
                                >
                                    {alerts.length}
                                </span>
                            )}
                        </motion.button>
                    );
                })}
            </nav>

        </aside>
    );
});

export default Sidebar;