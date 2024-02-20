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

export const basePath = process.env.NODE_ENV === 'development' ? '/' : '/my-site/projects/water-well-project-react/build';

const App = () => {
  return (
    <div>
      <Router basename={basePath}>
        <ScrollToHash />
        <ScrollToTop />
        <Header />
        <Routes>
          <Route exact path={basePath} element={<MainPage />} />
          <Route path={basePath + "/service/:idFromUrl"} element={<ServicePage />} />
          <Route path={basePath + "/order"} element={<OrderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
