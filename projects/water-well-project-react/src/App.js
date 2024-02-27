import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './pagesContent/NotFound/NotFound.jsx';
import MainPage from './pagesContent/MainPage/MainPage';
import ServicePage from './pagesContent/ServicePage/ServicePage';
import OrderPage from './pagesContent/OrderPage/OrderPage';
import Header from './generalComponents/Header/Header';
import Footer from './generalComponents/Footer/Footer';
import './utils/pageUpTrick.js'

import ScrollToHash from './utils/scrollToHash.js';
import ScrollToTop from './generalComponents/ScrollToTop/ScrollToTop.jsx';
import { useEffect, useState } from 'react';

export const basePath = process.env.NODE_ENV === 'development' ? '/' : '/my-site/projects/water-well-project-react/build';
export const basePathData = process.env.NODE_ENV === 'development' ? process.env.PUBLIC_URL : '/my-site/projects/water-well-project-react/build';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [aboutUs, setAboutUs] = useState([]);
  const [services, setServices] = useState([]);
  const [ourWorks, setOurWorks] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [servicesList, setServicesList] = useState([]);

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

        setAboutUs(data.aboutUs);
        setServices(data.services);
        setOurWorks(data.ourWorks);
        setContacts(data.contacts);
        setServicesList(getServicesList(data.services))
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
    <div>
      <Router>
        <ScrollToHash />
        <ScrollToTop />
        <Header contacts={contacts}/>
        <Routes>
          <Route exact path="/" element={<MainPage aboutUs={aboutUs} services={services} ourWorks={ourWorks} contacts={contacts} servicesList={servicesList}/>} />
          <Route path="/service/:idFromUrl" element={<ServicePage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer contacts={contacts}/>
      </Router>
    </div>
  );
}

export default App;
