// server.js code ....

import express from 'express';
import connection from './mong_conn.js' // Or what ever / wherever the above file is.

const router = express.Router();
// const uri = "mongodb://localhost:27017/Hobbit";
// mongoose.connect(
//     uri,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

// Define a schema
const MealSchema = new Mongoose.Schema({
    name: String,
    description: String,
    price: String,
    image: String,
});

// Create a model
const Meal = connection.model('meal', MealSchema);

// Insert a document

// const MealRecord = new Meal({
//     name: 'Butter beer',
//     description: 'Lager beer',
//     price: '£1.25',
//     image: 'image_xxx',
// });

// MealRecord.save()
//     .then(() => console.log('Meal saved'))
//     .catch((err) => console.error('Error:', err));


//Do query
const all = Meal.find();
console.log(all);

console.log("fin");

// const cursor = Meal.find().cursor();

// for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
//     // Use `doc`
//     console.log(doc);
// }
// console.log("After");

// mongoose.disconnect();