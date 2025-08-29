import { gsap } from "gsap"
import { type FC, useLayoutEffect, useRef } from "react"

import cssIcon from "@/assets/images/tech-stack/css-logo.svg"
import figmaIcon from "@/assets/images/tech-stack/figma-logo.svg"
import gitIcon from "@/assets/images/tech-stack/git-logo.svg"
import htmlIcon from "@/assets/images/tech-stack/html-logo.svg"
import jQueryIcon from "@/assets/images/tech-stack/jquery-logo.svg"
import jsIcon from "@/assets/images/tech-stack/js-logo.svg"
import reactIcon from "@/assets/images/tech-stack/react-logo.svg"
import reduxIcon from "@/assets/images/tech-stack/redux-logo.svg"
import sassIcon from "@/assets/images/tech-stack/sass-logo.svg"
import tsIcon from "@/assets/images/tech-stack/ts-logo.svg"

import s from "./styles.module.css"

const toolset = [
	{ title: "HTML", src: htmlIcon, alt: "Logo HTML" },
	{ title: "CSS", src: cssIcon, alt: "Logo CSS" },
	{ title: "JavaScript", src: jsIcon, alt: "Logo JavaScript" },
	{ title: "TypeScript", src: tsIcon, alt: "Logo TypeScript" },
	{ title: "React", src: reactIcon, alt: "Logo React" },
	{ title: "Redux Toolkit", src: reduxIcon, alt: "Redux Toolkit React" },
	{ title: "jQuery", src: jQueryIcon, alt: "Logo jQuery" },
	{ title: "SCSS/SASS", src: sassIcon, alt: "Logo SCSS/SASS" },
	{ title: "Figma", src: figmaIcon, alt: "Logo Figma" },
	{ title: "Git", src: gitIcon, alt: "Logo Git" }
]

type TechStackProps = {}
const TechStack: FC<TechStackProps> = ({}) => {
	const wrapperRefLeft = useRef<HTMLDivElement | null>(null)
	const wrapperRefRight = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		const wrapperLeft = wrapperRefLeft.current
		const wrapperRight = wrapperRefRight.current
		if (!wrapperLeft || !wrapperRight) return

		const totalWidth = wrapperLeft.scrollWidth / 2 // ширина половины контента
		const speed = 30;

		// Левая лента — едет влево
		gsap.to(wrapperLeft, {
			x: -totalWidth,
			duration: speed,
			ease: "linear",
			repeat: -1,
			modifiers: {
				x: x => {
					const num = parseFloat(x) || 0
					return (num % totalWidth) + "px"
				}
			}
		})

		// Правая лента — едет вправо
		gsap.fromTo(
			wrapperRight,
			{ x: -totalWidth }, // начальная позиция
			{
				x: 0,
				duration: speed,
				ease: "linear",
				repeat: -1,
				modifiers: {
					x: x => {
						const num = parseFloat(x) || 0
						return (num % totalWidth) + "px"
					}
				}
			}
		)
	}, [])

	return (
		<section id="toolbox" className={`${s.toolbox} autoblur`}>
			<div className={s.header}>
				<h2>Tech stack</h2>
				<p>
					Discover the technologies and tools I use to create
					exceptional websites and applications
				</p>
			</div>
			<div className={s.content}>
				<div className={s.toolset} ref={wrapperRefLeft}>
					{[...toolset, ...toolset].map((el, idx) => (
						<div key={el.title + idx} className={s.toolsetItem}>
							<img src={el.src} alt={el.alt} />
							<span>{el.title}</span>
						</div>
					))}
				</div>

				<div className={s.toolset} ref={wrapperRefRight}>
					{[...toolset, ...toolset].map((el, idx) => (
						<div key={el.title + idx} className={s.toolsetItem}>
							<img src={el.src} alt={el.alt} />
							<span>{el.title}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default TechStack
