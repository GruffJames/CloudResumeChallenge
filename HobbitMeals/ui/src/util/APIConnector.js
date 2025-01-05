
import axios from 'axios';
import APIEndpoint from './config';

export default class APIConnector {

    GetMeal(id) {
        console.log(`${APIEndpoint}/meals/${id}`);
        console.log("requesting meal/id")
        return axios.get(`${APIEndpoint}/meals/${id}`);
    }

    GetAllMeals(filter){

        if (filter){
            return axios.get(`${APIEndpoint}/meals/query/${filter.name}`);
        } else {
            console.log(`${APIEndpoint}/meals`);
            return axios.get(`${APIEndpoint}/meals`);
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

    async CreateUser(username, password, telephone, email, creationUser) {  
        try {
            const response =
                await axios.post(`${APIEndpoint}/users/CreateUser`,
                    { username, password, telephone, email, creationUser });
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

    GetUser(){
        return axios.get(`${APIEndpoint}/users/UserTest`);
    }

    async AuthUser(username, password){

        return {
            "_id": {
              "$oid": "67718497ade786199d975536"
            },
            "username": "gruff",
            "password": "password",
            "email": "gruff@gmail.com",
            "telephone": "07802819363",
            "creationUser": {
              "$oid": "676e02f9dac4ca730837f377"
            },
            "userType": 0,
            "__v": 40,
            "reviews": []
          };
          
        // try {
        //     const response = await axios.post(`${APIEndpoint}/users/AuthUser`,
        //         { username, password });
        //     if (response.status === 200 && response.statusText === "OK"){
        //         return response.data;
        //     } else {
        //         console.error('Incorrect response status');
        //         return false;
        //     }
        // } catch (error) {
        //     console.error('Error logging in:', error);
        // }

    }

}