const Joi = require('joi');

const schema = Joi.object({
    name       : Joi.string().min(1).required(),
    rarity     : Joi.string().valid('Epic', 'Legendary', 'Common', 'Uncommon', 'Rare').required(),
    damage     : Joi.number().min(1).max(200).required(),
    fireRate   : Joi.number().precision(2).min(0.1).max(10).required(),
});

const error = Joi.validate(weapon, schema).error;


