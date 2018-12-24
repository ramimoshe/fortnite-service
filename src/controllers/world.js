'use strict';

const Joi        = require('joi');
const repository = require('../services/repository');


exports.add = (ctx) => {
    const validationResult = Joi.validate(ctx.request.body, addWorldSchema);
    if (validationResult.error) {
        ctx.status = 400;
        ctx.body   = validationResult.message;
        return;
    }

    ctx.body   = {
        id: repository.add(ctx.request.body)
    };
    ctx.status = 200;
};

exports.get = (ctx) => {
    const world = repository.get(ctx.params.id);
    if (!world) {
        ctx.status = 404;
    } else {
        ctx.status = 200;
        ctx.body   = world;
    }
    ctx.status = 200;
};

const addWorldSchema = Joi.object({
    name        : Joi.string().required(),
    playersCount: Joi.number().min(1).max(100).optional()
}).unknown();