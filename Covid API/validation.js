const Joi = require("@hapi/joi");
const { schema } = require("./models/Screening");

module.exports.loginValidation = (loginData) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .max(255)
            .required(),
        password: Joi.string()
            .min(8)
            .max(255)
            .required()
    }
    return Joi.object(schema).validate(loginData);
};

module.exports.registerValidation = (registerData) => {
    
    const schema = {
        _id: Joi.string()
            .length(13)
            .required(),
        name: Joi.string()
            .min(4)
            .max(255)
            .required(),
        userType: Joi.number()
            .min(1)
            .max(3)
            .required(),
        email: Joi.string()
            .min(6)
            .max(255)
            .required()
    }

    return Joi.object(schema).validate(registerData);
}

module.exports.screeningValidation = (screening) => {

    const schema = {
        clientID: Joi.string()
            .required(),
        screenerID: Joi.string()
            .min(13)
            .required(),
        client: Joi.string()
            .required(),
        screener: Joi.string()
            .required(),
        fever: Joi.boolean()
            .required(),
        cough: Joi.boolean()
            .required(),
        shortnessBreath: Joi.boolean()
            .required(),
        soreThroat: Joi.boolean()
            .required(),
        musclePain: Joi.boolean()
            .required(),
        lostTaseSmell: Joi.boolean()
            .required(),
        temperature: Joi.number().required(),
        questions: {
            attendedGathering: Joi.boolean().required(),
            attendedHealthCare: Joi.boolean().required(),
            interprovincialTravel: Joi.boolean().required(),
            possibleCovidContact: Joi.boolean().required()
        }
    }
    return Joi.object(schema).validate(screening);
}