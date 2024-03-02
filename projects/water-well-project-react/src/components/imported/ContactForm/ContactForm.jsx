import React, { useState } from 'react';

// Функция для валидации адреса электронной почты
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Функция для валидации номера телефона
const validatePhone = (phone) => {
  return /^\+380\d{9}$/.test(phone);
};

const ContactForm = ({ servicesList, selectedService = null }) => {
  const defaultSelectedValue = 'contactMe';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    topic: selectedService || defaultSelectedValue
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;

    if (!formData.name) {
      setErrors(prevErrors => ({ ...prevErrors, name: 'Please provide your name' }));
      formValid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, name: '' }));
    }

    if (!formData.email && !formData.phone) {
      setErrors(prevErrors => ({ ...prevErrors, message: 'Please provide either email or phone number' }));
      formValid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, message: '' }));
    }

    if (formData.email && !validateEmail(formData.email)) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Please enter a valid email address' }));
      formValid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email: '' }));
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      setErrors(prevErrors => ({ ...prevErrors, phone: 'Please enter a valid phone number starting with +380' }));
      formValid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, phone: '' }));
    }

    if (formValid) {
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
            topic: selectedService || defaultSelectedValue
          });
          setErrors({});
        } else {
          alert('There was a problem sending your message. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was a problem sending your message. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /> 
      {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}

      <label htmlFor="email">Email:</label> 
      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} /> 
      {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>} 

      <label htmlFor="phone">Phone:</label> 
      <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} /> 
      {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>} 

      <label htmlFor="order">Choose your order...</label> 
      <select id="topic" name="topic" value={formData.topic} onChange={handleChange}>
        <option value="contactMe">Contact Me</option>
        <option value="question">Question</option>
        {servicesList.map(service => ( 
          <option key={service.serviceId} value={service.serviceId}>{service.serviceName}</option>
        ))}
      </select> 

      <label htmlFor="message">Message:</label> 
      <textarea id="message" name="message" value={formData.message} onChange={handleChange}></textarea> 
      {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>} 

      <input type="submit" value="Submit" />
    </form>
  );
}

export default ContactForm;