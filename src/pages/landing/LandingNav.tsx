import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Button from '../../components/ui/Button';
import ArrowRight from '../../components/icons/ArrowRight';
import logo from "../../assets/nullSub.png"

const LandingNav = memo(() => {
    const navigate = useNavigate();
    const handleApp = useCallback(() => navigate('/dashboard'), [navigate]);

    const navItems = [
        {
            id: 1,
            title: "Features",
            href: "#features",
        },

        {
            id: 2,
            title: "How It Works",
            href: "#how-it-works",
        },
    ]

    return (
        <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full border-b-[1px] border-dashed border-(--color-border-dashed) backdrop-blur-[10px] bg-[rgba(249,249,247,0.85)] fixed top-0 left-0 right-0 z-50 px-16 py-4"
        >
            <div
                className="max-w-4xl mx-auto flex items-center justify-between"
            >

                <div className="flex items-center gap-2.5">
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
                    <span
                        className="text-base font-(--font-display) text-(--color-text) font-bold tracking-tight"
                    >
                        NullSub
                    </span>
                </div>

                <div className="flex items-center gap-8">
                    {navItems?.map(({ title: link, href, id }) => (
                        <a
                            href={href}
                            key={id}
                            className="text-sm text-(--color-text-muted) font-(--font-body) hover:text-(--color-text) transition-colors duration-300 cursor-pointer "
                        >
                            {link}
                        </a>
                    ))}
                </div>

                <Button
                    variant='primary'
                    onClick={handleApp}
                    type='button'
                >
                    Open App

                    <ArrowRight />
                </Button>
            </div>

        </motion.nav>
    );
});

export default LandingNav;