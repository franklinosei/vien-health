const mongooose = require('mongoose');
require('dotenv').config();


//Connect to the database
const DATABASE_URI = process.env.DATABASE_URI;

//Connect to the database
exports.connect = () => {
    mongooose.connect(DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Database is connected'))
    .catch(err => console.log(err));
}