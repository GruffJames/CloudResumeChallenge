import defaultModel from '../schema/MealModel.js';

export async function GetMealsList() {
    try {
        let query = await defaultModel.find();
        return query;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function GetMealById(id) {
    try {
        let query = await defaultModel.findById(id);
        return query;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
