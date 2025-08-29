import type { FC } from "react"

import s from "./styles.module.css"
import { Link } from "react-router-dom"

type ContactsProps = {}
const Contacts: FC<ContactsProps> = ({}) => {
	return (
		<section className={s.contacts} id="contacts">
            <div className={s.header}>
                <h2>Contacts</h2>
                <p>
                    Have a project in mind or a question? Drop me a message!
                </p>
                <p>
                    Feel free to reach out for collaboration, job opportunities, or
                    just to say hello.
                </p>
            </div>
            <div className={s.buttonMore}>
                <Link to={"/contacts"} download className={s.buttonMore__anchor}>
                    <span>Contact me {">"} </span>
                </Link>
            </div>
		</section>
	)
}

export default Contacts
