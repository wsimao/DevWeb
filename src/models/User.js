const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelShema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    passwordHash: String,
    token: String
});

const modelName = 'User';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelShema);
}