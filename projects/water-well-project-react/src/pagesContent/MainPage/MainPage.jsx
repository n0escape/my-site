import './MainPage.css';

import MapFrame from '../../importedComponents/Map/Map.jsx';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';

const MainPage = () => {
  return (
    <div className="generalOutput">

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
      
    </div>
  );
}

export default MainPage;