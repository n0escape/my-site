import './App.css';

import companyLogo from './assets/header/logo-template.png'
import pageUp from './assets/pageUp.png'
import lightThemeIcon from "./assets/header/configs/light.png"
import languageIcon from "./assets/header/configs/language.png"

import facebookIcon from "./assets/socialMedias/facebook.png"
import instagramIcon from "./assets/socialMedias/instagram.png"
import telegramIcon from "./assets/socialMedias/telegram.png"
import googleIcon from "./assets/socialMedias/google.png"

import MapFrame from './importedComponents/Map/Map.jsx';
import './utils/pageUpTrick'
import ContactForm from './components/ContactForm/ContactForm.jsx';

const App = () => {
  return (
    <div className="generalOutput">
      <div class="pageUp">
        <a href="#.">
          <img src={pageUp} alt="Page Up" width="50px" />
        </a>
      </div>

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
                    <a href="#anchorAboutUs">Про нас</a>
                  </li>
                  <li>
                    <a href="#anchorServices">Прайс</a>
                  </li>
                  <li>
                    <a href="#anchorOurWorks">Наші роботи</a>
                  </li>
                  <li>
                    <a href="#anchorContacts">Контакти</a>
                  </li>
                  <li>
                    <a href="#anchorContactUs">Форма для зв'язку</a>
                  </li>
                </ul>
              </div>
              <div class="configs">
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
              </div>
          </div>
      </header>

      <div id="anchorAboutUs"></div>
      <section id="aboutUs">
          <div class="container">
            <div class="details">
              <h1>Блок інформації про компанію</h1>
            </div>
            <div class="features">

              <div class="item1">
                <div><img src="" alt="" /></div>
                <div>
                  <h4>1</h4>
                  <span>Перевага 1...</span>
                </div>
              </div>

              <div class="item1">
                <div><img src="" alt="" /></div>
                <div>
                  <h4>2</h4>
                  <span>Перевага 2...</span>
                </div>
              </div>

              <div class="item1">
                <div><img src="" alt="" /></div>
                <div>
                  <h4>3</h4>
                  <span>Перевага 3...</span>
                </div>
              </div>

              <div class="item1">
                <div><img src="" alt="" /></div>
                <div>
                  <h4>4</h4>
                  <span>Перевага 4...</span>
                </div>
              </div>

              <div class="item1">
                <div><img src="" alt="" /></div>
                <div>
                  <h4>5</h4>
                  <span>Перевага 5...</span>
                </div>
              </div>

              <div class="item1">
                <div><img src="" alt="" /></div>
                <div>
                  <h4>6</h4>
                  <span>Перевага 6...</span>
                </div>
              </div>

            </div>
          </div>
      </section>

      <div id="anchorServices"></div>
      <section id="services">
        <div class="container">
          <div>
            <h1>
              Послуга
            </h1>
            <button>Детальніше</button>
          </div>
          <div>
            <h1>
              Послуга
            </h1>
            <button>Детальніше</button>
          </div>
          <div>
            <h1>
              Послуга
            </h1>
            <button>Детальніше</button>
          </div>
          <div>
            <h1>
              Послуга
            </h1>
            <button>Детальніше</button>
          </div>
          <div>
            <h1>
              Послуга
            </h1>
            <button>Детальніше</button>
          </div>
        </div>
      </section>

      <div id="anchorOurWorks"></div>
      <section id="ourWorks">
        <div class="container">
          <div class="description">
            <h1>Блоки з результатами роботи + можливо карта з точками виконання</h1>
            <MapFrame />
          </div>
        </div>
      </section>

      <div id="anchorContacts"></div>
      <section id="contacts">
        <div class="container">
          <div class="description">
            <h1>
              Усі контактні дані (телефон, соц мережі) + карта з адресою
            </h1>
          </div>
        </div>
      </section>

      <div id="anchorContactUs"></div>
      <section id="contactUs">
        <div class="container">
          <ContactForm />

          {/* <form>
            <label>Ім'я</label>
            <input type="text" placeholder="Ім'я" />
            <label>Телефон</label>
            <input type="tel" placeholder="+380-xxx-xx-xx"/>
            <label>Пошта</label>
            <input type="email" placeholder="example@gmail.com"/>
            <label>Текст повідомлення</label>
            <textarea name="message" id="message" cols="30" rows="10"></textarea>
            <input type="submit" value="Відправити"/>
          </form> */}

        </div>
      </section>

      <footer id="pageFooter">
          <div class="container">
            <div class="logo">
                <img class="logoIcon" 
                  src={companyLogo} 
                  alt="Company logo" width="150px" />
                <p class="adress">
                  Україна м. Харків вул. Полтавський шлях 10, офіс 302
                </p>
            </div>
            <div class="services">
              <h2>Наші посуги</h2>
              <ul class="servicesList">
                <li>
                  <a href="#.">
                    Послуга
                  </a>
                </li>
                <li>
                  <a href="#.">
                    Послуга
                  </a>
                </li>
                <li>
                  <a href="#.">
                    Послуга
                  </a>
                </li>
                <li>
                  <a href="#.">
                    Послуга
                  </a>
                </li>
                <li>
                  <a href="#.">
                    Послуга
                  </a>
                </li>
                <li>
                  <a href="#.">
                    Послуга
                  </a>
                </li>
                <li>
                  <a href="#.">
                    Послуга
                  </a>
                </li>
                <li>
                  <a href="#.">
                    Послуга
                  </a>
                </li>
                <li>
                  <a href="#.">
                    Послуга
                  </a>
                </li>
                <li>
                  <a href="#.">
                    Послуга
                  </a>
                </li>
              </ul>
            </div>
            <div class="ourContacts">
              <h2>Наші контакти</h2>
              <ul class="phones">
                <li>
                  <a href="#.">
                    +380-xxx-xx-xx
                  </a>
                </li>
                <li>
                  <a href="#.">
                    +380-xxx-xx-xx
                  </a>
                </li>
                <li>
                  <a href="#.">
                    +380-xxx-xx-xx
                  </a>
                </li>
              </ul>
              <ul class="socialMedias">
                <li>
                  <a href="#.">
                    <img src={facebookIcon} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#.">
                    <img src={instagramIcon} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#.">
                    <img src={telegramIcon} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#.">
                    <img src={googleIcon} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#.">
                    <img src={lightThemeIcon} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#.">
                    <img src={lightThemeIcon} alt="" />
                  </a>
                </li>
              </ul>
            </div>
            <div class=""></div>
          </div>
      </footer>
    </div>
  );
}

export default App;
