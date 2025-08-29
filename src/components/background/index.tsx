import { type FC, useEffect, useState } from "react"

import s from "./styles.module.css"

type BackgroundProps = {}
const Background: FC<BackgroundProps> = ({}) => {
	const [stars, setStars] = useState<Record<string, number>[]>([])
	const [meteors, setMeteors] = useState<Record<string, number>[]>([])

	useEffect(() => {
		generateStars()
		generateMeteors()
	}, [])

	const generateStars = () => {
		const numberOfStars = Math.floor(
			(window.innerWidth * window.innerHeight) / 10000
		)
		const newStars = []

		for (let i = 0; i < numberOfStars; i++) {
			newStars.push({
				id: i,
				x: Math.random() * 100,
				y: Math.random() * 100,
				opacity: Math.random() * 0.5 + 0.5,
				size: Math.random() * 3 + 1,
				animationDuration: Math.random() * 4 + 2
			})
		}
		setStars(newStars)
	}

	const generateMeteors = () => {
		const numberOfMeteors = 5
		const newMeteors = []

		for (let i = 0; i < numberOfMeteors; i++) {
			newMeteors.push({
				id: i,
				x: Math.random() * 50,
				y: Math.random() * 70,
				opacity: Math.random() * 0.5 + 0.5,
				size: Math.random() * 2 + 1,
				animationDuration: Math.random() * 3 + 3
			})
		}
		setMeteors(newMeteors)
	}

	return (
		<div className={s.background} style={{ height: window.innerHeight }}>
			{stars.map(el => (
				<div
					key={el.id}
					style={{
                        width: `${el.size}px`,
                        height: `${el.size}px`,
						left: `${el.x}%`,
						top: `${el.y}%`,
						opacity: el.opacity,
						animationDuration: `${el.animationDuration}s`
					}}
					className={s.star}
				/>
			))}
			{meteors.map(el => (
				<div
					key={el.id}
					style={{
                        width: `${el.size * 40}px`,
                        height: `${el.size * 1.3}px`,
						left: `${el.x}%`,
						top: `${el.y}%`,
						opacity: el.opacity,
						animationDuration: `${el.animationDuration}s`
					}}
					className={s.meteor}
				/>
			))}
		</div>
	)
}

export default Background
