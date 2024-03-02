import './SocialMedias.css';
import React from 'react';

const SocialMedias = ({socialMediasList}) => {
  return (
    <ul>
      {socialMediasList.map( contact => (
        <li key={contact.id}>
          <a href={`https://${contact.url}`} target="_blank" rel="noopener noreferrer">
            <img src={process.env.PUBLIC_URL + contact.src} alt={contact.id} style={{height: 40 + "px"}}/>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialMedias;