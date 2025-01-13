
import axios from 'axios';
import ViewCounterConfig from '../APIEndPoints/UserControllerConfig';

export default class UserConnector {
    
    async AuthUser(username, password){

        try {
            const response = await axios.post(`${ViewCounterConfig}/items`, {
                username, password
            });

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