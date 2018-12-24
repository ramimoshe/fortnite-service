'use strict';

const Joi        = require('joi');
const repository = require('../services/repository');


exports.add = (ctx) => {
    const validationResult = Joi.validate(ctx.request.body, addPlayerSchema);
    if (validationResult.error) {
        ctx.status = 400;
        ctx.body   = validationResult.error.message;
        return;
    }

    ctx.body   = {
        id: repository.add(validationResult.value)
    };
    ctx.status = 200;
};

exports.get = (ctx) => {
    const player = repository.get(ctx.params.id);
    if (!player) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body   = player;
};

const addPlayerSchema = Joi.object({
    name : Joi.string().required(),
    age  : Joi.number().min(0).max(10).optional(),
    level: Joi.number().min(1).max(100).default(1),
    birth: Joi.string().isoDate().optional(),
    email: Joi.string().email().optional()
}).and('age', 'birth').unknown();