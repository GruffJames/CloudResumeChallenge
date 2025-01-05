import MongooseConn from "./mongoDb_conn.js";

const MealSchema = new MongooseConn.Schema({
    name: String,
    image: String,
    price: String,
    description: String,
    creationUser: MongooseConn.Types.ObjectId,

    rating: {
        cumulativeRating: Number,
        numberOfRatings: Number,
        averageRating: Number
    }
});

const MealModel = MongooseConn.model('meal', MealSchema);

export default MealModel;
