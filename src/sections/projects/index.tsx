import { useEffect, type FC } from "react"
import { Link } from "react-router-dom"

import blomstivindenImg from "@/assets/images/projects/blomstivinden-landing.png"
import ExploreIcon from "@/assets/images/projects/explore.svg?react"
import hidigamProj from "@/assets/images/projects/hidigam-landing.png"
import newWaterImg from "@/assets/images/projects/newwater-landing.png"
import sifuImg from "@/assets/images/projects/sifu-landing.png"
import thoriaImg from "@/assets/images/projects/thoria-crm.png"

import s from "./styles.module.css"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type ProjectsProps = {}
const Projects: FC<ProjectsProps> = ({}) => {

	useEffect(() => {
		gsap.utils.toArray<HTMLElement>(".projectBlur").forEach(el => {
			const element = el as HTMLElement
			gsap.fromTo(
				element,
				{ x: -100, opacity: 0, filter: "blur(40px)" },
				{
					x: 0,
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
				{ x: 0, opacity: 1, filter: "blur(0)" },
				{
					x: -100,
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
		<section className={s.projects} id="projects">
			<div className={s.header}>
				<h2>Projects</h2>
				<p>Here you can explore some of the projects I’ve worked on.</p>
			</div>
			<ul className={s.container}>
				<li className={`${s.container__item} projectBlur`}>
					<div className={s.container__item__imageWrapper}>
						<img src={sifuImg} alt="Sifu game website" />
					</div>
					<div className={s.container__item__content}>
						<h3>Sifu game website</h3>
						<p>Сustomer: Venstop.pro</p>
						<p>
							This is a technical task from the company
							Venstop.pro, the main tasks were to create a site
							based on the layout using Swiper.js, PHPMailer, and
							any animation of your choice (simple mouse tracking
							animation)
						</p>
						<p>
							Technologies: HTML, CSS, JS, PHPMailer, Swiper,
							Figma
						</p>
						<Link
							to={"https://n0escape.github.io/tech-task-venstop/"}
							target="_blank"
						>
							<button className={s.exploreBtn}>
								Visit
								<ExploreIcon />
							</button>
						</Link>
					</div>
				</li>
				<li className={`${s.container__item} projectBlur`}>
					<div className={s.container__item__imageWrapper}>
						<img src={newWaterImg} alt="New Water website" />
					</div>
					<div className={s.container__item__content}>
						<h3>New Water website</h3>
						<p>Сustomer: New Water company</p>
						<p>
							This is an order from the company New Water, the
							main goal of the project is to demonstrate and
							promote the company's services, as well as provide
							ways to contact the client (contact information and
							form of communication). My tasks on the project
							were: frontend development, communication with the
							designer, communication with the customer
						</p>
						<p>Technologies: React, Formspree, Express.js</p>
						<Link
							to={"https://new-water.vercel.app/uk"}
							target="_blank"
						>
							<button className={s.exploreBtn}>
								Visit
								<ExploreIcon />
							</button>
						</Link>
					</div>
				</li>
				<li className={`${s.container__item} projectBlur`}>
					<div className={s.container__item__imageWrapper}>
						<img src={thoriaImg} alt="Thoria CRM" />
					</div>
					<div className={s.container__item__content}>
						<h3>Thoria CRM (WIP)</h3>
						<p>Сustomer: Topizda.to</p>
						<p>
							This is a CRM system, the main goal of which is to
							establish the process of providing juniors with real
							projects from stakeholders. My tasks on the project
							were: font-end development, command of the front-end
							team and communication with other groups (designers
							/ backend / team leader)
						</p>
						<p>
							Technologies: React, SCSS, ReduxToolkit, RTK Query,
							ReactHookForms, MaterialUi, Yup
						</p>
						<Link to={"https://thoria-crm.pp.ua"} target="_blank">
							<button className={s.exploreBtn}>
								Visit
								<ExploreIcon />
							</button>
						</Link>
					</div>
				</li>
				<li className={`${s.container__item} projectBlur`}>
					<div className={s.container__item__imageWrapper}>
						<img src={hidigamProj} alt="Hidigam website" />
					</div>
					<div className={s.container__item__content}>
						<h3>Hidigam website</h3>
						<p>Сustomer: NTU KHPI</p>
						<p>
							This is a lab work created during my studies at the
							university. The task during creation was to develop
							a website for a fictitious company. As a result, a
							website for an anti-cafe called Hidigam (Hidden in
							Games) was created.
						</p>
						<p>Technologies: HTML, CSS, JS</p>
						<Link
							to={
								"https://dmitriyzavadovskyi.github.io/links/index.html"
							}
							target="_blank"
						>
							<button className={s.exploreBtn}>
								Visit
								<ExploreIcon />
							</button>
						</Link>
					</div>
				</li>
				<li className={`${s.container__item} projectBlur`}>
					<div className={s.container__item__imageWrapper}>
						<img
							src={blomstivindenImg}
							alt="Blomst i Vinden website"
						/>
					</div>
					<div className={s.container__item__content}>
						<h3>Blomst i Vinden website</h3>
						<p>Сustomer: SmartReklama</p>
						<p>
							This is one of the projects I created while working
							at SmartReklama. My responsibilities while working
							for this company were low-code / no-code
							development. This particular site was created using
							AI (Bolt.new) and edited by me.
						</p>
						<p>Technologies: HTML, CSS, JS</p>
						<Link
							to={
								"https://n0escape.github.io/blomstivinden/"
							}
							target="_blank"
						>
							<button className={s.exploreBtn}>
								Visit
								<ExploreIcon />
							</button>
						</Link>
					</div>
				</li>
			</ul>
		</section>
	)
}

export default Projects
