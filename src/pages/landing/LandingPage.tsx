import LandingNav from './LandingNav'
import LandingHero from './LandingHero'
import LandingFeatures from './LandingFeatures'
import LandingCTA from './LandingCTA'

const LandingPage = () => {
    return (
        <div
            className="max-w-4xl mx-auto min-h-screen bg-(--color-bg) text-(--color-text) "
        >
            <LandingNav />

            <div className='pt-32 min-h-screen px-4 border-l-[2px] border-r-[2px] border-dashed border-(--color-border-dashed) '>

                <LandingHero />

                <LandingFeatures />

                <LandingCTA />

            </div>
        </div>
    )
}

export default LandingPage