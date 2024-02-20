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

const App = () => {
  const basename = process.env.REACT_APP_BASE_URL || '/';
  return (
    <div>
      <Router basename={basename}>
        <ScrollToHash />
        <ScrollToTop />
        <Header />
        <Routes>
          <Route exact path={basename} element={<MainPage />} />
          <Route path={basename + "/service/:idFromUrl"} element={<ServicePage />} />
          <Route path={basename + "/order"} element={<OrderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
