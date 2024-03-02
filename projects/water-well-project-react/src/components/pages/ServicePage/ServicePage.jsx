import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ServicePage.css'
import Gallery from '../../general/Gallery/Gallery';

const ServicePage = ({services}) => {

  const { idFromUrl } = useParams();
  const [serviceData, setServiceData] = useState(null);
  useEffect(() => {
    setServiceData( services.find(item => item.id === idFromUrl) )
  }, [services, idFromUrl]);

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
              <Link to={`/order/${serviceData.id}`}>
                Замовити послугу
              </Link>
            </div>
            <Gallery photosList={serviceData.photos} />
          </div>
        </div>
      )}
    </>
  )               
}

export default ServicePage;