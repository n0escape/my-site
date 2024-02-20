import './Header.css'
import companyLogo from './../../assets/general/logo-template.png'
import { basePath } from '../../App';
import { Link } from 'react-router-dom';

// import lightThemeIcon from "./../../assets/header/configs/light.png"
// import languageIcon from "./../../assets/header/configs/language.png"

const Header = () => {
  return (
      <header id="pageHeader">
        <div className="container">
            <div className="logo">
              <Link to={basePath + "/"}>
                <img src={companyLogo} alt="Company logo" />
              </Link>
            </div>
            <div className="hiddenMenu" 
            //onClick={toggleMenu}
            >Меню</div>
            <div className="links">
              <ul>
                <li>
                  <Link to={basePath + "#anchorAboutUs"}>Про нас</Link>
                </li>
                <li>
                  <Link to={basePath + "#anchorServices"}>Прайс</Link>
                </li>
                <li>
                  <Link to={basePath + "#anchorOurWorks"}>Наші роботи</Link>
                </li>
                <li>
                  <Link to={basePath + "#anchorContacts"}>Контакти</Link>
                </li>
                <li>
                  <Link to={basePath + "#anchorContactUs"}>Форма для зв'язку</Link>
                </li>
              </ul>
            </div>

              {/* <div class="configs">
                <div class="theme">
                  <img id="themeIcon" 
                    src={lightThemeIcon} 
                    alt="Theme icon" onclick="toggleTheme()" />
                </div>
                <div class="language">
                  <img 
                    src={languageIcon} 
                    alt="Language icon" onclick="toggleLanguageBox()" />
                  <div class="hiddenLanguageBox">
                    <ul>
                      <li><span class="uaLanguage">
                        Ua
                      </span></li>
                      <li><span class="ruLanguage">
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