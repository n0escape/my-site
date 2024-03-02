import './PhoneNumbers.css';
import React from 'react';

const PhoneNumbers = ({phoneNumbersList}) => {

  function stylizePhoneNumber(phone) {
    // Удаление всех символов, кроме цифр
    const cleanedPhone = phone.replace(/\D/g, '');
    // Применение шаблона к номеру
    const formattedPhone = cleanedPhone.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5');
    return formattedPhone;
  }

  return (
    <ul>
      {phoneNumbersList.map( (phone, index) => (
        <li key={index}>
          <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer">
            {stylizePhoneNumber(phone)}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default PhoneNumbers;