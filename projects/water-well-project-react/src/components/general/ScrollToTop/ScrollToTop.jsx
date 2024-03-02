import './ScrollToTop.css';
import React from 'react';
import { Link } from 'react-router-dom';

// import pageUp from './../../assets/general/pageUp.png';

function scrollToTopHandler() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const ScrollToTop = ({toTopIcon}) => {
  return (
    <div className='pageUp'>
        <Link to="#" onClick={scrollToTopHandler}>
            <img src={process.env.PUBLIC_URL + toTopIcon} alt="Page Up" width="50px" />
        </Link>
    </div>
  );
}

export default ScrollToTop;