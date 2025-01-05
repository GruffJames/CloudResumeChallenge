import { expect } from 'chai';

import { ConnectToMongoose, DisconnectMongoose } from '../src/schema/mongoDb_conn.js';
import { GetMealsList } from '../src/controller/MealController.js'; // Ensure .js extension

before(async () => {
    await ConnectToMongoose(); // Connect before tests start
});

after(async () => {
    await DisconnectMongoose(); // Disconnect after tests finish
});

describe('GetMealsList', () => {
    it('should return an array of meals', async () => {
        const meals = await GetMealsList();
        expect(meals).to.be.an('array'); // Check if meals is an array
    });
});

describe('GetMealsList', () => {
    it('should return an array of meals', async () => {
        const meals = await GetMealsList();
        expect(meals).to.be.an('array'); // Check if meals is an array
    });
});

describe('GetMealsList', () => {
    it('should return an array of meals', async () => {
        const meals = await GetMealsList();
        expect(meals).to.be.an('array'); // Check if meals is an array
    });
});

