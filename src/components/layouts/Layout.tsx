import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { pageVariants } from '../animations/variants';
import Sidebar from './Sidebar';
import { cn } from '../../utils/cn';


interface LayoutProps {
    children: React.ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {

    const location = useLocation();

    const isLandingPage = location.pathname === "/";

    return (
        <div className="flex min-h-screen bg-(--color-bg)">

            {

                !isLandingPage && <Sidebar />
            }

            <main
                className={cn(
                    "flex-1 flex flex-col bg-(--color-bg) min-h-screen",
                    !isLandingPage && "ml-64"
                )}
            >
                <div
                    className="h-px w-full opacity-[0.6] bg-(--color-border-dashed)"
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        variants={pageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={cn("flex-1", !isLandingPage && "p-8")}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
});

export default Layout;