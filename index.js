const Joi = require('@hapi/joi');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);



//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening por ${port} .....`);
});







