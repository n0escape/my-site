import About from '@/sections/about';
import Contacts from '@/sections/contacts';
import Hero from '@/sections/hero';
import Projects from '@/sections/projects';
import TechStack from '@/sections/tech-stack';
import type { FC } from 'react'

type HomePageProps = {}
const HomePage: FC<HomePageProps> = ({}) => {
    return (
        <main>
            <Hero />
            <TechStack />
            <About />
            <Projects />
            <Contacts />
        </main>
    )
};

export default HomePage;
