import { useLocation } from 'react-router-dom';
import ContactForm from '../../components/ContactForm/ContactForm';
import './OrderPage.css'

const OrderPage = () => {
    let { state } = useLocation();
    let { selectedServiceFromLink, servicesList } = state;
    
    return (
        <div className='orderPage container'>
            <ContactForm servicesList={servicesList} selectedService={selectedServiceFromLink} />
        </div>
    )
}

export default OrderPage;