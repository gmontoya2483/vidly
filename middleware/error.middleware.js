
const logger = require('../logger');

module.exports = async function(err, req, res,next){
    logger.log('error', err.message, {metadata: err });
    res.status(500).send({message: "Internal Error"});
};
