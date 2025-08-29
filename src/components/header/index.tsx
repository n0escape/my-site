import { type FC, useEffect, useRef, useState } from "react"
import type { AnchorsList } from "@/common/types/general.types"
import s from "./styles.module.css"
import gsap from "gsap"

type HeaderProps = {
	anchorsList: AnchorsList
}

const Header: FC<HeaderProps> = ({ anchorsList }) => {
	const [isChecked, setIsChecked] = useState(false)
	const sideMenuRef = useRef<HTMLDivElement | null>(null)
	const menuAnimRef = useRef<gsap.core.Tween | null>(null)

	// Блокировка скролла
	useEffect(() => {
		if (isChecked) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = ""
		}

		return () => {
			document.body.style.overflow = ""
		}
	}, [isChecked])

	// Инициализация анимации
	useEffect(() => {
		if (sideMenuRef.current) {
			menuAnimRef.current = gsap.fromTo(
				sideMenuRef.current,
				{ x: "100%" },
				{
					x: "0%",
					duration: 0.5,
					ease: "power3.inOut",
					paused: true, // важно, чтобы сразу не запускалось
				}
			)
		}
	}, [])

	// Управление анимацией при изменении isChecked
	useEffect(() => {
		if (menuAnimRef.current) {
			if (isChecked) {
				menuAnimRef.current.play()
			} else {
				menuAnimRef.current.reverse()
			}
		}
	}, [isChecked])

	return (
		<>
			<header>
				<span className={s.nickname}>ZavaD (NoEscape)</span>
				<nav>
					<ul className={s.links}>
						{Object.keys(anchorsList).map((anchorName, index) => (
							<li key={index}>
								<a href={`/#${anchorName}`}>
									{anchorsList[anchorName]}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<label className={s.hamburger}>
					<input
						type="checkbox"
						id="hamburger"
						checked={isChecked}
						onChange={() => setIsChecked(!isChecked)}
					/>
					<svg viewBox="0 0 32 32">
						<path
							className={`${s.line} ${s.lineTopBottom}`}
							d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
						/>
						<path className={s.line} d="M7 16 27 16" />
					</svg>
				</label>
			</header>
			<div className={s.sideMenu} ref={sideMenuRef} id="sideMenu">
				<ul>
					{Object.keys(anchorsList).map((anchorName, index) => (
						<li key={index}>
							<a href={`/#${anchorName}`} onClick={() => setIsChecked(false)}>
								{anchorsList[anchorName]}
							</a>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default Header
