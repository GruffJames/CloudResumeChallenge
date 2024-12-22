import express from 'express';
import defaultModel from '../schema/MealModel.js';
import userModel from '../schema/UserModel.js';
import { GetMealById, GetMealsList } from '../controller/MealController.js';

const router = express.Router();

/* GET meals listing. */
router.get('/', async function(req, res, next) {
  try {
    const query = await GetMealsList();
    res.status(200).json(query);
  } catch (error) {
    res.status(501).json({ message: 'GET /meals failed' });
  }
});

router.get('/query/:mealname', async function(req, res, next) {
  let query = await defaultModel.find({
    name: { $regex: `^${req.params.mealname}`, $options: 'i' } // Case-insensitive
  });

  res.json(query);
});

router.post('/CreateMeal', async function (req, res) {
  try {
    const { mealName, image, price, description, creationUser } = req.body;

    const newMeal = await defaultModel.create({
      name: mealName,
      image: image,
      price: price,
      description: description,
      creationUser: creationUser,
      rating: {
        cumulativeRating: 0,
        numberOfRatings: 0,
        averageRating: 0
      }
    });

    res.status(200).json({ newMeal });
  } catch (error) {
    res.status(401).json({ message: 'Meal creation failed' });
  }
});

router.delete('/:id/:deleteUserId', async function(req, res) {
  try {
    const authUser = await userModel.findOne({
      _id: { $eq: req.params.deleteUserId },
      userType: { $gt: 0 },
    });

    if (authUser) {
      const query = await defaultModel.deleteOne({
        _id: { $eq: req.params.id }
      });
    } else {
      res.status(401).json({ message: 'Meal deletion failed' });
    }
    res.status(200).json({ message: 'Meal deleted' });
  } catch (error) {
    res.status(401).json({ message: 'Meal deletion failed' });
  }
});

router.get('/:id', async function(req, res, next) {
 
  console.log(req.params.id);
  try {
    const query = await GetMealById(req.params.id);
    res.status(200).json(query);
  } catch (error) {
    res.status(501).json({ message: 'GET /meal/:id failed' });
  }
});

export default router;
