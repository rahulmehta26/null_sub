import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cardVariants, containerVariants } from '../../components/animations/variants';
import Button from '../../components/ui/Button';
import ArrowRight from '../../components/icons/ArrowRight';
import { Corners } from '../../components/ui/Corners';
import LandingMarquee from './LandingMarquee';


const LandingHero = memo(() => {
    const navigate = useNavigate();

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start w-full mx-auto"
        >
            <motion.div variants={cardVariants} className="mb-6 md:mb-8">
                <span className="inline-flex relative font-(--font-mono) border-[1.5px] border-dashed border-(--color-border-dashed) text-(--color-text-muted) items-center gap-2 text-[10px] md:text-xs font-semibold px-3 py-1.5">
                    <Corners className='w-1.5 h-1.5' offset='lg' />
                    <span className="w-1.5 h-1.5 bg-(--color-accent) animate-pulse rounded-full" />
                    <span className="sm:hidden">Validated by Razorpay Fix My Itch</span>
                    <span className="hidden sm:inline">Built for India · Validated by Razorpay Fix My Itch</span>
                </span>
            </motion.div>

            <motion.h1
                variants={cardVariants}
                className="text-3xl sm:text-5xl md:text-7xl font-bold leading-none text-(--color-text) font-(--font-display) tracking-tight mb-4 md:mb-6"
            >
                Null the waste.
                <br />
                <span className='text-(--color-text-muted)'>
                    Keep what matters.
                </span>
            </motion.h1>

            <motion.p
                variants={cardVariants}
                className="text-sm md:text-lg max-w-xs md:max-w-xl mb-10 text-(--color-text-muted) leading-relaxed"
            >
                Track every subscription — Netflix, Spotify, Hotstar and more.
                See what you use, flag what you don't, and stop paying for forgotten ones.
            </motion.p>

            <motion.div
                variants={cardVariants}
                className="flex flex-wrap items-center gap-4"
            >

                <Button
                    variant='primary'
                    onClick={() => navigate('/dashboard')}
                    type='button'
                >
                    Start Tracking Free
                    <ArrowRight />
                </Button>

                <Button
                    variant='dashed'
                    onClick={() => navigate('/dashboard')}
                    type='button'
                    className='rounded-none!'
                >
                    <Corners className='h-2 w-2' offset='md' />
                    See Demo
                </Button>

            </motion.div>

            <LandingMarquee />

        </motion.section>
    );
});

export default LandingHero;