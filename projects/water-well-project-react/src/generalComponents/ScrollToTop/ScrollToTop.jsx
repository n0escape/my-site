import './ScrollToTop.css';
import React from 'react';
import { Link } from 'react-router-dom';

import pageUp from './../../assets/general/pageUp.png';

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const ScrollToTop = () => {
  return (
    <div className='pageUp'>
        <Link to="#" onClick={scrollToTop}>
            <img src={pageUp} alt="Page Up" width="50px" />
        </Link>
    </div>
  );
}

export default ScrollToTop;