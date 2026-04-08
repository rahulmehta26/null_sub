import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { STEPS } from '../../constant/cta.constant';
import Button from '../../components/ui/Button';
import { Corners } from '../../components/ui/Corners';
import ArrowRight from '../../components/icons/ArrowRight';
import DashedBorder from '../../components/ui/DashedBorder';
import logo from "../../assets/nullSub.png"


const LandingCTA = memo(() => {
    const navigate = useNavigate();

    return (
        <>
            <section
                className="w-full pt-8"
                id="how-it-works"
            >

                <DashedBorder />

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xs font-bold uppercase tracking-widest font-(--font-mono) text-(--color-text-muted) mb-10"
                >
                    How It Works
                </motion.p>

                <div className="grid grid-cols-3 gap-6">
                    {STEPS?.map((step, i) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.45 }}
                        >
                            <p
                                className="text-4xl font-bold mb-3 font-(--font-mono) text-(--color-border-dashed) "
                            >
                                {step.num}
                            </p>
                            <h3
                                className="text-base text-(--color-text) font-(--font-display) font-bold mb-1.5"
                            >
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-(--color-text-muted)">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="mt-12 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-(--color-surface) border-[1.5px] border-dashed border-(--color-border-dashed) p-12 flex flex-col items-start gap-6 overflow-hidden"

                >
                    <Corners
                        offset='1%'
                        borderSize='4'
                        className='w-8 h-8'
                    />

                    <h2
                        className="text-4xl text-shadow-2xs font-bold font-(--font-display) text(--color-text) tracking-tight"
                    >
                        Stop paying for what<br />you don't use.
                    </h2>
                    <p className="text-base max-w-md text-(--color-text-muted)" >
                        NullSub is free, needs no account, and works instantly in your browser.
                        Your data stays on your device — always.
                    </p>

                    <Button
                        variant='primary'
                        onClick={() => navigate('/dashboard')}
                        type='button'
                    >
                        Open NullSub — it's free
                        <ArrowRight />
                    </Button>

                </motion.div>
            </section>

            <DashedBorder />

            <footer
                className="mx-auto pb-8 flex items-center justify-between"
            >

                <div
                    className='flex gap-2 items-center'
                >

                    <div
                        className="w-8 h-8 rounded-lg bg-(--color-primary-glow) border-[1px] border-[--color-primary]  flex items-center justify-center"
                    >
                        <img
                            src={logo}
                            loading="lazy"
                            className='object-cover w-full h-full '
                            alt='NullSub illustration'
                        />
                    </div>

                    <div>
                        <p
                            className="text-sm font-(--font-display) text-(--color-text) font-bold"
                        >
                            NullSub
                        </p>

                        <p className="text-xs text-(--color-text-muted)">
                            Null the waste.
                        </p>
                    </div>

                </div>
                <p className="text-xs text-(--color-text-muted)">
                    Built with React · Inspired by {" "}
                    <span className='text-(--color-text)'>Razorpay Fix My Itch</span>
                </p>
                <p className="text-xs text-(--color-text-dim)">
                    &copy; {new Date().getFullYear()} NullSub
                </p>
            </footer>
        </>
    );
});

export default LandingCTA;