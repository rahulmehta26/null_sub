import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { pageVariants } from '../animations/variants';
import Sidebar from './Sidebar';


interface LayoutProps {
    children: React.ReactNode;
}

const Layout = memo(({ children }: LayoutProps) => {

    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-(--color-bg)">

            <Sidebar />

            <main
                className="flex-1 flex flex-col ml-64 bg-(--color-bg) min-h-screen"
            >
                <div
                    className="h-px w-full bg-(--color-border-dashed)"
                    style={{ opacity: 0.6 }}
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        variants={pageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex-1 p-8"
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
});

export default Layout;