const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./route/route');


app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes.routes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});