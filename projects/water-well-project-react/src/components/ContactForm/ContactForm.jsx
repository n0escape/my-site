// import { useForm, ValidationError } from '@formspree/react';
import React, { useState } from 'react';

const ContactForm = ({servicesList, selectedService = null}) => {

  const defaultSelectedValue = 'contactMe';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    topic: selectedService !== null ? selectedService : defaultSelectedValue
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    // Простая проверка адреса электронной почты с помощью регулярного выражения
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    // Простая проверка номера телефона с помощью регулярного выражения
    return /^\+380\d{9}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Проверка обязательного поля "Name"
    if (!formData.name) {
      setErrors({ message: 'Please provide your name' });
      return;
    }

    // Проверка, что хотя бы одно из полей (email или phone) заполнено
    if (!formData.email && !formData.phone) {
      setErrors({ message: 'Please provide either email or phone number' });
      return;
    }

    // Валидация email
    if (formData.email && !validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    // Валидация номера телефона
    if (formData.phone && !validatePhone(formData.phone)) {
      setErrors({ phone: 'Please enter a valid phone number starting with +380' });
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/meqygzjy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Your message has been sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          topic: defaultSelectedValue
        });
        setErrors({});
      } else {
        alert('There was a problem sending your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was a problem sending your message. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label><br />
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /><br />

      <label htmlFor="email">Email:</label><br />
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /><br />

      <label htmlFor="phone">Phone:</label><br />
      <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} /><br />

      <label htmlFor="order" title="Choose '----' if you want just ask a question or parse your contacts for contact back">
         Chose your order...
       </label><br />
       <select id="topic" name="topic" value={formData.topic} onChange={handleChange}>
         <option value="contactMe">Зв'яжіться зі мною будь-ласка</option>
         <option value="question">Питання</option>
         {
           servicesList.map(service => ( 
             <option key={service.serviceId} value={service.serviceName}>{service.serviceName}</option>
           ))
         }
       </select><br />

      <label htmlFor="message">Message:</label><br />
      <textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea><br />

      {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}<br />

      <input type="submit" value="Submit" />
    </form>
  );
}

export default ContactForm;
