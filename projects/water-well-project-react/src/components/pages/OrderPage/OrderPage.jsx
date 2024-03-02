import { useParams } from 'react-router-dom';
import ContactForm from '../../imported/ContactForm/ContactForm';
import './OrderPage.css'

const OrderPage = ({servicesList}) => {
    const { idService } = useParams();
    
    return (
        <div className='orderPage container'>
            <ContactForm servicesList={servicesList} selectedService={idService} />
        </div>
    )
}

export default OrderPage;