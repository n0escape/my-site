import './SocialMedias.css';
import React from 'react';

const SocialMedias = ({SocialMediasList}) => {
  return (
    <ul className='listLinks'>
      {socialMediasList.map(contact => (
        <a key={contact.id} href={contact.href}>
          <img src={contact.src} alt={contact.id} width="50px" />
        </a>
      ))}
    </ul>
  );
}

export default SocialMedias;