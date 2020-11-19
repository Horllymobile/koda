const Joi = require('joi');


module.exports = function(user) {

    const schema = Joi.object({
        name: Joi.string().required().max(50),
        email: Joi.string().required().min(5).max(100),
        password: Joi.string().required()
    });

    return schema.validate(user).error;
    
}