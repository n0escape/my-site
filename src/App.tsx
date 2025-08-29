import { useEffect } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import type { AnchorsList } from "@/common/types/general.types"

import "./App.css"
import Background from "./components/background"
import Footer from "./components/footer"
import Header from "./components/header"
import AboutPage from "./pages/about"
import ContactsPage from "./pages/contacts"
import HomePage from "./pages/home"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const anchorsList = {
	hero: "Hero",
	about: "About",
	projects: "Projects",
	contacts: "Contacts"
} as AnchorsList

function App() {
	useEffect(() => {
		gsap.fromTo(
			'#hero', // Селектор элемента
			{ y: -100, opacity: 0 }, // Начальное состояние
			{ y: 0, opacity: 1, duration: 1, delay: 0.5 } // Конечное состояние и настройки анимации
		);
		gsap.utils.toArray<HTMLElement>(".autoblur").forEach(el => {
			const element = el as HTMLElement
			gsap.fromTo(
				element,
				{ opacity: 0, filter: "blur(40px)" },
				{
					opacity: 1,
					filter: "blur(0px)",
					scrollTrigger: {
						trigger: element,
						start: "top bottom",
						end: "bottom bottom",
						scrub: true,
						toggleActions: "play none none none"
					}
				}
			)
			gsap.fromTo(
				element,
				{ opacity: 1, filter: "blur(0)" },
				{
					opacity: 0,
					filter: "blur(40px)",
					scrollTrigger: {
						trigger: element,
						start: "bottom top",
						end: "top top",
						scrub: true,
						toggleActions: "play none none none"
					}
				}
			)
		})
	}, [])

	return (
		<Router>
			<Header anchorsList={anchorsList} />
			<Background />
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/contacts" element={<ContactsPage />} />
			</Routes>
			<Footer />
		</Router>
	)
}

export default App
