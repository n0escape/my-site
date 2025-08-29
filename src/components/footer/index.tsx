import type { FC } from 'react'
import s from "./styles.module.css"

type FooterProps = {}
const Footer: FC<FooterProps> = ({}) => {
    return (
        <footer>
            <p>© 2025 Dmytro Zavadovskyi. All rights reserved.</p>
        </footer>
    )
};

export default Footer;
