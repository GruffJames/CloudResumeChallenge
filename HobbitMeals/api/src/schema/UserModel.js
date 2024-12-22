import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    telephone: String,
    creationUser: mongoose.Types.ObjectId,
    userType: Number,
    reviews: [{ 
        mealId: mongoose.Types.ObjectId, 
        mealScore: Number
    }]
});

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;
