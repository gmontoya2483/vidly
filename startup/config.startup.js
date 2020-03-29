const config = require('config');

module.exports = function (){
    //Verify if the jwtPrivateKey envVariable exists
    if (!config.get('jwtPrivateKey')){
        throw new Error('jwtPrivateKey is not defined.');
    }
};
