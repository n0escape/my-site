import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './ServicePage.css'
import { basePathData } from '../../App';

const ServicePage = () => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { idFromUrl } = useParams();
  let { state } = useLocation();
  let { allServices } = state;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(basePathData + '/data.json');
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
    <>
      {service && (
        <div className='container'>
          <div>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <ul>
                {service.whatYouWillGet.map((point, index) => (
                <li key={index}>{point}</li>
                ))}
            </ul>
          </div>
          <div>
            <div className='toOrderBox'>
              <h1>Вартість</h1>
              <p>від {service.minPrice}</p>
              <Link 
                to='/order'
                state={{
                  selectedService: service.id,
                  servicesList: allServices
                }}>
                Замовити послугу
              </Link>
            </div>
            <div className='containerGallerey'>
              {service.photos.map((photoUrl, index) => (
              <img key={index} src={photoUrl} alt={`Description ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )               
}

export default ServicePage;