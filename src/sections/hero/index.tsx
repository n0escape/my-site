import type { FC } from 'react'
import s from "./styles.module.css"

import heroImg from "@/assets/images/hero.png"
import { Link } from 'react-router-dom';

type HeroProps = {}
const Hero: FC<HeroProps> = ({}) => {
    return (
        <section className={s.hero} id="hero">
            <div className={s.text}>
                <p className={s.positon}>Front-end (React) Developer</p>
                <p>Hi👋, I am</p>
                <h1><span className={s.name}>Dmytro</span> Zavadovskyi</h1>
                <p>From Ukraine</p>

                <Link to={"/contacts"}>
                    <button className={s.callToAction}>
                        Contact me
                    </button>
                </Link>
            </div>
            <div className={s.imageWrapper}>
                <img src={heroImg} alt="Dmyrto Zavadovskyi" />
            </div>
        </section>
    )
};

export default Hero;
