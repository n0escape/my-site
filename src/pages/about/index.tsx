import type { FC } from 'react'
import s from "./styles.module.css"

type AboutPageProps = {}
const AboutPage: FC<AboutPageProps> = ({}) => {
    return (
        <section className={s.aboutPage}>
			<div className={s.header}>
				<h1>Who’s Behind the Screen?</h1>
			</div>
            <div className={s.content}>
                <p>I am a Frontend developer with experience in creating websites and web applications on React. I specialize in responsive layout, animations, and integrating interfaces with the backend.</p>
                <p>In 2023, I graduated from university and received a Master's degree in Computer Science, which influenced my choice of development direction and developed my hard and soft skills.</p>
                <p>Having worked in several teams and companies, I realized that I easily adapt to new tools and in my work I value clean code, user friendliness, and productive interaction in a team.</p>
                <p>During my studies and work, I learned to find a balance between work and rest. Thus, in my free time, I enjoy my hobbies: educational videos (on the topic of development), books (educational, novels, manga / manhwa), anime, music, and computer games.</p>
                <p><i>Thanks for visiting my portfolio.</i></p>
                <p><i>Open to new opportunities and cooperation.</i></p>
            </div>
        </section>
    )
};

export default AboutPage;
