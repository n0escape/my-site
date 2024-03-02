import './Footer.css'
import SocialMedias from '../SocialMedias/SocialMedias'
import PhoneNumbers from '../PhoneNumbers/PhoneNumbers';

const Footer = ({logo, contacts}) => {
    return (
      <footer id="pageFooter">
        <div className="container">
          <div className="logo">
              <img className="logoIcon" 
                src={process.env.PUBLIC_URL + logo} 
                alt="Company logo" width="150px" />
              <p className="adress">
                Україна м. Харків вул. Полтавський шлях 10, офіс 302
              </p>
          </div>
          <div className="services">
            <h2>Наші посуги</h2>
            <ul className="servicesList">
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
          <div className="ourContacts">
            <h2>Наші контакти</h2>
            <PhoneNumbers phoneNumbersList={contacts.phoneNumbers} />
            <SocialMedias socialMediasList={contacts.socialMedias} />
          </div>
        </div>
    </footer>
  )
}

export default Footer;