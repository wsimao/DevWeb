const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const modelShema = new mongoose.Schema({
    name: String,
    token: String
});

const modelName = 'List';

if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName];
} else {
    module.exports = mongoose.model(modelName, modelShema);
}