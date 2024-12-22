
import axios from 'axios';
import APIEndpoint from './config';

export default class APIConnector {

    async GetMeal(id) {

        try {
            const response =
                await axios.get(`${APIEndpoint}/meals/${id}`);
            if (response.status === 200 && response.statusText === "OK"){
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

    async GetAllMeals(filter){

        try {
            let queryURL;

            if (filter){
                queryURL = `${APIEndpoint}/meals/query/${filter.name}`;
            } else {
                queryURL = `${APIEndpoint}/meals`;
            }
            const response = await axios.get(queryURL);
            if (response.status === 200 && response.statusText === "OK"){
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

    async SubmitScore(mealId, mealScore, authUserId) {
        try {
            const response =
                await axios.post(`${APIEndpoint}/Users/SubmitScore`,
                    { mealId, mealScore, authUserId });
            if (response.status === 200 && response.statusText === "OK"){
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

    async ResetScore(mealId, authUserId) {
        try {
            const response =
                await axios.post(`${APIEndpoint}/Users/ResetScore`,
                    { mealId, authUserId });
            if (response.status === 200 && response.statusText === "OK"){
                return true;
            } else {
                console.error('Incorrect response status');
                return false;
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }
    async DeleteMeal(id, authUserId) {
        try {
            const response =
                await axios.delete(`${APIEndpoint}/meals/${id}/${authUserId}`);
            if (response.status === 200 && response.statusText === "OK"){
                return response;
            } else {
                console.error('Incorrect response status');
                return response;
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    async CreateMeal(mealName, image, price, description, creationUser) {
        try {
            const response =
                await axios.post(`${APIEndpoint}/meals/CreateMeal`,
                    { mealName, image, price, description, creationUser });
            if (response.status === 200 && response.statusText === "OK"){
                return response;
            } else {
                console.error('Incorrect response status');
                return response;
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    async CreateUser(username, password, telephone, email, creationUser, userType) {  
        try {
            const response =
                await axios.post(`${APIEndpoint}/users/CreateUser`,
                    { username, password, telephone, email, creationUser, userType });
            if (response.status === 200 && response.statusText === "OK"){
                return response;
            } else {
                console.error('Incorrect response status');
                return response;
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }
    
    async AuthUser(username, password){

        try {
            const response = await axios.post(`${APIEndpoint}/users/AuthUser`,
                { username, password });
            if (response.status === 200 && response.statusText === "OK"){
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