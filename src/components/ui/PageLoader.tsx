import { memo } from 'react';
import { motion } from 'motion/react';


const PageLoader = memo(() => {
    return (
        <div
            className="flex-1 text-(--color-text-muted) flex items-center justify-center min-h-96"
        >
            <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="bg-(--color-primary) w-2 h-2 rounded-full"
                            animate={{
                                y: [0, -8, 0],
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>
                <p className="text-sm text-(--color-text-muted)">
                    Loading...
                </p>
            </motion.div>
        </div>
    );
});

export default PageLoader;