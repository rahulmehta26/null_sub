import { motion } from 'motion/react';
import { cardVariants } from '../animations/variants'

const PageHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => {
    return (
        <motion.div variants={cardVariants}>
            <h2
                className="text-2xl font-(--font-display) text-(--color-text) font-bold"
            >
                {title}
            </h2>
            <p className="text-sm mt-1 text-(--color-text-muted)">
                {subtitle && (<>{subtitle}</>)}
            </p>
        </motion.div>
    )
}

export default PageHeader