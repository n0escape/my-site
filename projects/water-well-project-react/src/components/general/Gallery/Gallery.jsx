import React, { useState } from 'react';
import './Gallery.css'

const Gallery = ({photosList}) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const goToNext = () => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex === photosList.length - 1 ? 0 : prevIndex + 1));
    };
  
    const goToPrevious = () => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex === 0 ? photosList.length - 1 : prevIndex - 1));
    };
    return (
        <div className='containerGallery'>
            <div className='galleryImage'>
                <button className='btnPrev' onClick={goToPrevious}>{'<'}</button>
                <img src={process.env.PUBLIC_URL + photosList[currentPhotoIndex]} alt={`Description ${currentPhotoIndex + 1}`} />
                <button className='btnNext' onClick={goToNext}>{'>'}</button>
            </div>
            <div className='dotList'>
                {photosList.map((_, index) => (
                <span key={index} className={index === currentPhotoIndex ? 'dot active' : 'dot'}></span>
                ))}
            </div>
        </div>
    )
}

export default Gallery