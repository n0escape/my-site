import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './ServicePage.css'
import { basePathData } from '../../App';

const ServicePage = () => {
  // const [service, setService] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const { idFromUrl } = useParams();
  let { state } = useLocation();
  let { serviceData, allServices } = state;


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(basePathData + '/data.json');
  //       const data = await response.json();
  //       const serviceData = data.services.find(item => item.id === idFromUrl);
  //       setService(serviceData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [idFromUrl]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {serviceData && (
        <div className='servicePage container'>
          <div>
            <h2>{serviceData.title}</h2>
            <p>{serviceData.description}</p>
            <ul>
                {serviceData.whatYouWillGet.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
            </ul>
          </div>
          <div>
            <div className='toOrderBox'>
              <h1>Вартість</h1>
              <p>від {serviceData.minPrice}</p>
              <Link 
                to='/order'
                state={{
                  selectedServiceFromLink: serviceData.id,
                  servicesList: allServices
                }}>
                Замовити послугу
              </Link>
            </div>
            <div className='containerGallerey'>
              {serviceData.photos.map((photoUrl, index) => (
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