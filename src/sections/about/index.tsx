import type { FC } from "react"
import s from "./styles.module.css"

import aboutImage from "@/assets/images/about.jpg"
import aboutWidthImage from "@/assets/images/about-width.jpg"
import AnimeIcon from "@/assets/images/interests/anime.svg?react"
import BooksIcon from "@/assets/images/interests/books.svg?react"
import GamesIcon from "@/assets/images/interests/games.svg?react"
import MusicIcon from "@/assets/images/interests/music.svg?react"
import fileCV from "@/assets/files/CV_Zavadovskyi_Dmytro.pdf"
import { Link } from "react-router-dom"

type AboutProps = {}
const About: FC<AboutProps> = ({}) => {
	return (
		<section className={`${s.about} autoblur`} id="about">
			<div className={s.imageWrapper}>
				<picture>
					<source
						srcSet={aboutWidthImage}
						media="(max-width: 1024px)"
					/>
					<img src={aboutImage} alt="Image about me" />
				</picture>
			</div>
			<div className={s.content}>
				<h2>About me</h2>
				<p>
					I'm a Front-end Developer specialized in React, with around
					2 years of experience working across agencies, startups, and
					small businesses.
				</p>
				<p>
					I’m passionate about creating 
					<strong> clean</strong>, 
					<strong> efficient</strong>, and
					<strong> user-friendly </strong> 
					interfaces, and I enjoy turning complex
					problems into simple, elegant solutions.
				</p>
				<p>
					Outside of coding, I'm finding my rest in pages of books,
					computer games, anime and music, which help me stay creative
					and energized. I believe that a balance between work and
					personal passions makes me a well-rounded and motivated
					professional.
				</p>
				<h3>Interests</h3>
				<ul className={s.interests}>
					<li className={s.interests__item}>
						<GamesIcon className={s.interests__icon} />
						Gaming
					</li>
					<li className={s.interests__item}>
						<BooksIcon className={s.interests__icon} />
						Books
					</li>
					<li className={s.interests__item}>
						<AnimeIcon className={s.interests__icon} />
						Anime
					</li>
					<li className={s.interests__item}>
						<MusicIcon className={s.interests__icon} />
						Music
					</li>
				</ul>
				<div className={s.buttonsWrapper}>
					<div className={s.buttonCV}>
						<a href={fileCV} download className={s.buttonCV__anchor}>
							<span>Download CV</span>
						</a>
					</div>
					<div className={s.buttonMore}>
						<Link to={"/about"} download className={s.buttonMore__anchor}>
							<span>More about me {">"} </span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
