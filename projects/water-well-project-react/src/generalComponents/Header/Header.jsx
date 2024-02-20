import './Header.css'
import companyLogo from './../../assets/general/logo-template.png'
import { basePath } from '../../App';

// import lightThemeIcon from "./../../assets/header/configs/light.png"
// import languageIcon from "./../../assets/header/configs/language.png"

const Header = () => {
    return (
        <header id="pageHeader">
          <div class="container">
              <div class="logo">
                <a href={basePath + "#"}>
                  <img src={companyLogo} alt="Company logo" />
                </a>
              </div>
              <div class="hiddenMenu" onclick="toggleMenu()">Меню</div>
              <div class="links">
                <ul>
                  <li>
                    <a href={basePath + "/#anchorAboutUs"}>Про нас</a>
                  </li>
                  <li>
                    <a href={basePath + "/#anchorServices"}>Прайс</a>
                  </li>
                  <li>
                    <a href={basePath + "/#anchorOurWorks"}>Наші роботи</a>
                  </li>
                  <li>
                    <a href={basePath + "/#anchorContacts"}>Контакти</a>
                  </li>
                  <li>
                    <a href={basePath + "/#anchorContactUs"}>Форма для зв'язку</a>
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