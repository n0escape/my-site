import './MainPage.css';

import MapFrame from '../../importedComponents/Map/Map.jsx';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { basePathData } from '../../App.js';

const MainPage = () => {
  
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [servicesList, setServicesList] = useState(null);
  const [socialMedia, setSocialMedia] = useState([]);

  const getServicesList = (services) => {
    let servicesList = [];
    services.map(service => (
      servicesList.push({serviceId: service.id, serviceName: service.title})
    ))
    return servicesList
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(basePathData + '/data.json');
        const data = await response.json();
        setServices(data.services); // Предполагается, что массив объектов services находится в поле services файла data.json
        setSocialMedia(data.socialMedia);
        setServicesList(getServicesList(data.services));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="generalOutput">

      <div id="anchorAboutUs"></div>
      <section id="aboutUs">
        <div className="container">
          <div className="details">
            <h1>Блок інформації про компанію</h1>
          </div>
          <div className="features">

            <div className="item1">
              <div><img src="" alt="" /></div>
              <div>
                <h4>1</h4>
                <span>Перевага 1...</span>
              </div>
            </div>

            <div className="item1">
              <div><img src="" alt="" /></div>
              <div>
                <h4>2</h4>
                <span>Перевага 2...</span>
              </div>
            </div>

            <div className="item1">
              <div><img src="" alt="" /></div>
              <div>
                <h4>3</h4>
                <span>Перевага 3...</span>
              </div>
            </div>

            <div className="item1">
              <div><img src="" alt="" /></div>
              <div>
                <h4>4</h4>
                <span>Перевага 4...</span>
              </div>
            </div>

            <div className="item1">
              <div><img src="" alt="" /></div>
              <div>
                <h4>5</h4>
                <span>Перевага 5...</span>
              </div>
            </div>

            <div className="item1">
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
        <div className="container">
          {services.map( service => (
            <div key={service.id}>
              <h1>{service.title}</h1>
              <Link 
                to={`service/${service.id}`} 
                state={{ 
                  allServices: servicesList
                }}> Детальніше </Link>
            </div>
          ))}          
        </div>
      </section>

      <div id="anchorOurWorks"></div>
      <section id="ourWorks">
        <div className="container">
          <div className="description">
            <h1>Блоки з результатами роботи + можливо карта з точками виконання</h1>
            <MapFrame content='works'/>
          </div>
        </div>
      </section>

      <div id="anchorContacts"></div>
      <section id="contacts">
        <div className="container">
          <div className="description">
            <h1>
              Усі контактні дані (телефон, соц мережі) + карта з адресою
            </h1>
            <MapFrame content='office'/>
            <ul>
              {socialMedia && socialMedia.map(contact => (
                <li key={contact.id}>
                  <a href={contact.url}>
                    <img src={contact.src} alt={contact.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div id="anchorContactUs"></div>
      <section id="contactUs">
        <div className="container">
          <ContactForm servicesList={servicesList}/>

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
      
    </div>
  );
}

export default MainPage;