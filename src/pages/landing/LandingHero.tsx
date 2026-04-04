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
            <motion.div variants={cardVariants} className="mb-8">
                <span
                    className="inline-flex relative font-(--font-mono) border-[1.5px] border-dashed border-(--color-border-dashed) text-(--color-text-muted) items-center gap-2 text-xs font-semibold px-3 py-1.5"
                >
                    <Corners className='w-1.5 h-1.5' offset='18%' />
                    <span
                        className="w-1.5 h-1.5 bg-(--color-accent) animate-pulse transition-all duration-300 rounded-full"
                    />
                    Built for India · Validated by Razorpay Fix My Itch
                </span>
            </motion.div>

            <motion.h1
                variants={cardVariants}
                className="text-7xl font-bold text-shadow-xs leading-none text-(--color-text) font-(--font-display) tracking-tight mb-6"
            >
                Null the waste.
                <br />
                <span className='text-(--color-text-muted)'>
                    Keep what matters.
                </span>
            </motion.h1>

            <motion.p
                variants={cardVariants}
                className="text-lg max-w-xl mb-10 text-(--color-text-muted) leading-relaxed"
            >
                Track every subscription — Netflix, Spotify, Hotstar and more.
                See what you use, flag what you don't, and stop paying for forgotten ones.
            </motion.p>

            <motion.div
                variants={cardVariants}
                className="flex items-center gap-4"
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
                    className='rounded-none'
                    dashed={true}
                    cornerClassName='w-2 h-2'
                >
                    See Demo
                </Button>

            </motion.div>

            <LandingMarquee />

        </motion.section>
    );
});

export default LandingHero;