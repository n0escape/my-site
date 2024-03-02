import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/pages/NotFound/NotFound.jsx';
import MainPage from './components/pages/MainPage/MainPage.jsx';
import ServicePage from './components/pages/ServicePage/ServicePage.jsx';
import OrderPage from './components/pages/OrderPage/OrderPage.jsx';
import Header from './components/general/Header/Header.jsx';
import Footer from './components/general/Footer/Footer.jsx';
import './utils/pageUpTrick.js'

import ScrollToHash from './utils/scrollToHash.js';
import ScrollToTop from './components/general/ScrollToTop/ScrollToTop.jsx';
import { useEffect, useState } from 'react';

export const basePath = process.env.NODE_ENV === 'development' ? '/' : '/my-site/projects/water-well-project-react/build';
export const basePathData = process.env.NODE_ENV === 'development' ? process.env.PUBLIC_URL : '/my-site/projects/water-well-project-react/build';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
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

        setData(data);
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
      <Router basename={basePath}>
        <ScrollToHash />
        <ScrollToTop toTopIcon={data.generalIcons.toTopIcon} />
        <Header logo={data.generalIcons.logo} contacts={data.contacts}/>
        <Routes>
          <Route exact path="/" element={<MainPage aboutUs={data.aboutUs} services={data.services} ourWorks={data.ourWorks} contacts={data.contacts} servicesList={servicesList}/>} />
          <Route path="/service/:idFromUrl" element={<ServicePage services={data.services}/>} />
          <Route path="/order/:idService" element={<OrderPage servicesList={servicesList} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer logo={data.generalIcons.logo} contacts={data.contacts}/>
      </Router>
    </div>
  );
}

export default App;
