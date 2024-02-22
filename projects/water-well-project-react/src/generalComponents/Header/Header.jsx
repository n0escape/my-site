import './Header.css'
import companyLogo from './../../assets/general/logo-template.png'
import { Link } from 'react-router-dom';

// import lightThemeIcon from "./../../assets/header/configs/light.png"
// import languageIcon from "./../../assets/header/configs/language.png"

const Header = () => {
  return (
      <header id="pageHeader">
        <div className="container">
            <div className="logo">
              <Link to="/"
              //link to the top
              >
                <img src={companyLogo} alt="Company logo" />
              </Link>
            </div>
            <div className="hiddenMenu" 
            //onClick={toggleMenu}
            >Меню</div>
            <div className="links">
              <ul>
                <li>
                  <Link to="/#anchorAboutUs">Про нас</Link>
                </li>
                <li>
                  <Link to="/#anchorServices">Прайс</Link>
                </li>
                <li>
                  <Link to="/#anchorOurWorks">Наші роботи</Link>
                </li>
                <li>
                  <Link to="/#anchorContacts">Контакти</Link>
                </li>
                <li>
                  <Link to="/#anchorContactUs">Форма для зв'язку</Link>
                </li>
              </ul>
            </div>

              {/* <div className="configs">
                <div className="theme">
                  <img id="themeIcon" 
                    src={lightThemeIcon} 
                    alt="Theme icon" onclick="toggleTheme()" />
                </div>
                <div className="language">
                  <img 
                    src={languageIcon} 
                    alt="Language icon" onclick="toggleLanguageBox()" />
                  <div className="hiddenLanguageBox">
                    <ul>
                      <li><span className="uaLanguage">
                        Ua
                      </span></li>
                      <li><span className="ruLanguage">
                        Ru
                      </span></li>
                    </ul>
                  </div>
                </div>
              </div> */}
          </div>
        </header>
    )
}

export default Header;