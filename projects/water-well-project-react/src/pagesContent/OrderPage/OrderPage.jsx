import { useLocation } from 'react-router-dom';
import ContactForm from '../../components/ContactForm/ContactForm';
import './OrderPage.css'

const OrderPage = () => {
    let { state } = useLocation();
    let selectedService
    if (state === null) {
        selectedService = null
    } else {
        selectedService = state.selectedService
    }
    return (
        <div className='container'>
            <ContactForm selectedService={selectedService} />
        </div>
    )
}

export default OrderPage;