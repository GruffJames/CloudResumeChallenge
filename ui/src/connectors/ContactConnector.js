
import axios from 'axios';
import ContactConfig from '../APIEndPoints/ContactUsConfig';

export default class ContactConnector {
    
    async SendContactRequest(ContactParams){

        try {
            const response = await axios.post(`${ContactConfig}/items`, ContactParams);

            if (response.status === 200){
                return response;
            } else {
                console.error('Incorrect response status');
                return response;
            }
        } catch (error) {
            console.error('Error logging in:', error);
            return error;
        }
    }
}