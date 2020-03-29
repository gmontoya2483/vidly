const express = require('express');
const app = express();

const logger = require('./startup/logger.startup');
require('./startup/routes.startup')(app);
require('./startup/config.startup')();
require('./startup/db.startup')();
require('./startup/validation.startup')();

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    logger.info(`listening por ${port} .....`);
});







