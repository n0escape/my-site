import './MainPage.css';

import MapFrame from '../../importedComponents/Map/Map.jsx';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

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
              <Link 
                to={`service/${service.id}`} 
                state={{
                  serviceData: services.find(item => item.id === service.id),
                  allServices: servicesList
                }}> Детальніше </Link>
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
                      <img src={work.imageSrc} alt={work.title} />
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
                {contacts.phoneNumbers.map( (phone, index) => (
                  <p key={index}>{phone}</p>
                ))}
              </div>
              <div>
                {contacts.mailAddresses.map( (mail, index) => (
                  <p key={index}>{mail}</p>
                ))}
              </div>
              <div>
                <p>{contacts.schedule}</p>
              </div>
              <ul>
                {contacts.socialMedias.map( contact => (
                  <li key={contact.id}>
                    <a href={contact.url}>
                      <img src={contact.src} alt={contact.id} />
                    </a>
                  </li>
                ))}
              </ul>
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