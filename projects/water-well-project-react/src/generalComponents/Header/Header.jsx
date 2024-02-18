import './Header.css'
import companyLogo from './../../assets/general/logo-template.png'

// import lightThemeIcon from "./../../assets/header/configs/light.png"
// import languageIcon from "./../../assets/header/configs/language.png"

const Header = () => {
    return (
        <header id="pageHeader">
          <div class="container">
              <div class="logo">
                <a href="#.">
                  <img src={companyLogo} alt="Company logo" />
                </a>
              </div>
              <div class="hiddenMenu" onclick="toggleMenu()">Меню</div>
              <div class="links">
                <ul>
                  <li>
                    <a href="/#anchorAboutUs">Про нас</a>
                  </li>
                  <li>
                    <a href="/#anchorServices">Прайс</a>
                  </li>
                  <li>
                    <a href="/#anchorOurWorks">Наші роботи</a>
                  </li>
                  <li>
                    <a href="/#anchorContacts">Контакти</a>
                  </li>
                  <li>
                    <a href="/#anchorContactUs">Форма для зв'язку</a>
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