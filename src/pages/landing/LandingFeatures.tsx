import { memo } from 'react';
import { motion } from 'motion/react';
import { FEATURES } from '../../constant/features.constant';
import { cardVariants, containerVariants } from '../../components/animations/variants';
import { Corners } from '../../components/ui/Corners';
import DashedBorder from '../../components/ui/DashedBorder';

const LandingFeatures = memo(() => {
    return (
        <section
            className="pt-8 w-full"
            id="features"
        >

            <DashedBorder />

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-12"
            >
                <p
                    className="text-xs text-(--color-text-muted) font-(--font-mono) font-bold uppercase tracking-widest mb-3"
                >
                    Why NullSub
                </p>
                <h2
                    className="text-4xl text-shadow-2xs font-bold tracking-tight text-(--color-text) font-(--font-display)"
                >
                    Everything you need.
                    <br />
                    <span className='text-(--color-text-muted)'>Nothing you don't.</span>
                </h2>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
            >
                {FEATURES?.map((f) => {
                    const Icon = f.icon;
                    return (
                        <motion.div
                            key={f.title}
                            variants={cardVariants}
                            className="p-6 relative flex flex-col gap-4 bg-(--color-surface) border-[1.5px] border-dashed border-(--color-border-dashed) "
                        >

                            <Corners />

                            <div className="flex items-center justify-between">
                                <div
                                    className="w-9 h-9 border-[1.5px] border-dashed border-(--color-border-dashed) bg-(--color-surface-2) rounded-lg flex items-center justify-center"
                                >
                                    <Icon className='text-(--color-text)' />
                                </div>
                                <span
                                    className="text-xs font-(--font-mono) border-[1px] border-dashed border-(--color-border-dashed) text-(--color-text-muted) bg-(--color-surface-2) font-semibold px-2.5 py-1 rounded-sm"
                                >
                                    {f.tag}
                                </span>
                            </div>

                            <div>
                                <h3
                                    className="text-base text(--color-text) font-(--font-display) font-bold mb-1.5"
                                >
                                    {f.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-(--color-text-muted)">
                                    {f.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
});


export default LandingFeatures;