import './Footer.css'
import companyLogo from './../../assets/general/logo-template.png'

import facebookIcon from "./../../assets/socialMedias/facebook.png"
import instagramIcon from "./../../assets/socialMedias/instagram.png"
import telegramIcon from "./../../assets/socialMedias/telegram.png"
import googleIcon from "./../../assets/socialMedias/google.png"

const Footer = () => {
    return (
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
                    <img src={googleIcon} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#.">
                    <img src={googleIcon} alt="" />
                  </a>
                </li>
              </ul>
            </div>
            <div class=""></div>
          </div>
      </footer>
    )
}

export default Footer;