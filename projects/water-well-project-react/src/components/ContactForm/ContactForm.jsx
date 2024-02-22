import React, { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { basePathData } from '../../App';

const ContactForm = ({selectedService = null}) => {
  const [state, handleSubmit] = useForm(process.env.REACT_APP_FORMSPREE_ID);
  const [servicesList, setServicesList] = useState(null);
  const [loading, setLoading] = useState(true);

  let defaultSelectedValue = 'contactMe';
  if (selectedService !== null) defaultSelectedValue = selectedService

  const getServicesList = (services) => {
    let servicesList = [];
    services.map(service => (
      servicesList.push({serviceId: service.id, serviceName: service.title})
    ))
    return servicesList
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(basePathData + '/data.json');
        const data = await response.json();
        setServicesList(getServicesList(data.services));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  if (state.succeeded) {
    alert("Відправлено")
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label htmlFor="order" title="Choose '----' if you want just ask a question or parse your contacts for contact back">
        Chose your order...
      </label>
      <select id="topic" name="topic" defaultValue={defaultSelectedValue}>
        <option value="contactMe">Зв'яжіться зі мною будь-ласка</option>
        <option value="question">Питання</option>
        {
          servicesList.map(service => ( 
            <option key={service.serviceId} value={service.serviceId}>{service.serviceName}</option>
          ))
        }
      </select>
      <label htmlFor="message">
        Your message
      </label>
      <textarea
        id="message"
        name="message"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}


export default ContactForm;


