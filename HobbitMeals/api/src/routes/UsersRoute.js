import express from 'express';
import defaultModel from '../schema/UserModel.js';
import mealModel from '../schema/MealModel.js';

const router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res) {
  console.log("get a resource");
  res.send('get a resource');
});

router.post('/AuthUser', async function (req, res) {
  const foundUser = await defaultModel.findOne({
    username: { $eq: req.body.username },
    password: { $eq: req.body.password }
  });

  if (foundUser !== null) {
    return res.status(200).json(foundUser);
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/CreateUser', async function (req, res) {
  const { username, email, telephone, password, creationUser, userType } = req.body;

  const UserFoundCount = await defaultModel.countDocuments({
    key: { $eq: username }
  });

  if (UserFoundCount == 0) {
    const newUser = await defaultModel.create({
      username: username,
      password: password,
      email: email,
      telephone: telephone,
      creationUser: creationUser,
      userType: parseInt(userType),
    });
    res.status(200).json({ message: `User ${newUser.username} creation successful` });
  } else {
    res.status(401).json({ message: 'User creation failed, existing user found' });
  }
});

router.post('/SubmitScore', async function (req, res) {
  try {
    const { mealId, mealScore, authUserId } = req.body;
    let oldRatingValue;

    const user = await defaultModel.findById(authUserId);
    const oldRating = user.reviews.find((review) => review.mealId == mealId);
    if (oldRating) {
      oldRatingValue = oldRating.mealScore;
      user.reviews = user.reviews.filter((review) => review.mealId != mealId);
    }

    await user.reviews.push({ mealId, mealScore });
    await user.save();

    const meal = await mealModel.findById(mealId);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    if (typeof oldRatingValue !== 'undefined') {
      meal.rating.cumulativeRating -= oldRatingValue;
    } else {
      meal.rating.numberOfRatings += 1;
    }
    meal.rating.cumulativeRating += mealScore;
    meal.rating.averageRating = meal.rating.cumulativeRating / meal.rating.numberOfRatings;

    await meal.save();

    res.status(200).json({ message: `Meal score submitted : ` });
  } catch (error) {
    res.status(401).json({ message: `${error}` });
  }
});

router.post('/ResetScore', async function (req, res) {
  try {
    const { mealId, mealScore, authUserId } = req.body;

    const user = await defaultModel.findById(authUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const oldRating = user.reviews.find((review) => review.mealId == mealId);
    let oldScore = oldRating.mealScore;

    //delete the review
    user.reviews = user.reviews.filter((review) => review.mealId != mealId);
    await user.save();

    const meal = await mealModel.findById(mealId);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    meal.rating.cumulativeRating -= oldScore;
    meal.rating.numberOfRatings -= 1;

    if (meal.rating.numberOfRatings == 0 && meal.rating.cumulativeRating == 0) {
      meal.rating.averageRating = 0;
    } else {
      meal.rating.averageRating = meal.rating.cumulativeRating / meal.rating.numberOfRatings;
    }

    await meal.save();

    res.status(200).json({ message: `Meal score submitted : ` });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: `${error}` });
  }
});

export default router;
