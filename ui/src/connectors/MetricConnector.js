
import axios from 'axios';
import ViewCounterConfig from '../APIEndPoints/ViewCounterConfig';

export default class MetricConnector {
    
    async GetViewCount(){
        try {
            const response =
                await axios.get(`${ViewCounterConfig}/items`);
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