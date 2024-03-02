import './MainPage.css';

import MapFrame from '../../imported/Map/Map.jsx';
import ContactForm from '../../imported/ContactForm/ContactForm.jsx';
import { Link } from 'react-router-dom';
import SocialMedias from '../../general/SocialMedias/SocialMedias.jsx';
import PhoneNumbers from '../../general/PhoneNumbers/PhoneNumbers.jsx';
import MailAddresses from '../../general/MailAddresses/MailAddresses.jsx';

const MainPage = ({aboutUs, services, ourWorks, contacts, servicesList}) => {
  
  return (
    <div className="generalOutput">

      <div id="anchorAboutUs"></div>
      <section id="aboutUs">
        <div className="container">
          <div className="details">
            <h1>{aboutUs.companyName}</h1>
            <p>{aboutUs.companyDescription}</p>
          </div>
          <div className="featuresBlock">
            <h3>Обираючи нас ви отримаєте</h3>
            <div className='featuresContainer'>
              {
                aboutUs.advantages.map( avantage => (
                  <div key={avantage.title} className='feature'>
                    <h4>{avantage.title}</h4>
                    <p>{avantage.description}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      <div id="anchorServices"></div>
      <section id="services">
        <h1>Послуги</h1>
        <div className="container">
          {services.map( service => (
            <div key={service.id}>
              <h1>{service.title}</h1>
              <Link to={`service/${service.id}`}> Детальніше </Link>
            </div>
          ))}          
        </div>
      </section>

      <div id="anchorOurWorks"></div>
      <section id="ourWorks">
        <div className="container">
          <h1>Виконані замовлення</h1>
          <MapFrame content='works' markers={ourWorks}/>
          <div className='worksContainer'>
            {
              ourWorks.map( work => (
                <div key={work.title}>
                  <div className='workItem'>
                    <div>
                      <img src={process.env.PUBLIC_URL + work.imageSrc} alt={work.title} />
                    </div>
                    <div>
                      <h3>{work.title}</h3>
                      <b><p>{work.date !== null ? work.date : null}</p></b>
                      <p>{work.description}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            }
          </div>
        </div>
      </section>

      <div id="anchorContacts"></div>
      <section id="contacts">
        <div className="container">
          <h1>
            ...або зв'яжіться з нами за наступними контактами
          </h1>
          <div className='contactsBox'>
            <MapFrame content='office' markers={contacts.offices}/>
            <div className='contactsContainer'>
              <div>
                {contacts.offices.map( (office, index) => (
                  <p key={index}>{office.address}</p>
                ))}
              </div>
              <div>
                <PhoneNumbers phoneNumbersList={contacts.phoneNumbers}/>
              </div>
              <div>
                <MailAddresses mailAddressesList={contacts.mailAddresses}/>
              </div>
              <div>
                <p>{contacts.schedule}</p>
              </div>
              <SocialMedias socialMediasList={contacts.socialMedias}/>
            </div>
          </div>
        </div>
      </section>

      <div id="anchorContactUs"></div>
      <section id="contactUs">
        <div className="container">
          <ContactForm servicesList={servicesList}/>
        </div>
      </section>
      
    </div>
  );
}

export default MainPage;