import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ServicePage.css'

const ServicePage = () => {
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const { idFromUrl } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/data.json');
          const data = await response.json();
          const serviceData = data.services.find(item => item.id === idFromUrl);
          setService(serviceData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [idFromUrl]);
  
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            {service && (
                <div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul>
                    {service.whatYouWillGet.map((point, index) => (
                    <li key={index}>{point}</li>
                    ))}
                </ul>
                <div>
                    {service.photos.map((photoUrl, index) => (
                    <img key={index} src={photoUrl} alt={`Description ${index + 1}`} />
                    ))}
                </div>
                </div>
            )}
        </div>
        
    )
}

export default ServicePage;