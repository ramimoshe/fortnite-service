'use strict';

const Joi        = require('joi');
const repository = require('../services/repository');


exports.add = (ctx) => {
    const validationResult = Joi.validate(ctx.request.body, addMapSchema);
    if (validationResult.error) {
        ctx.status = 400;
        ctx.body   = validationResult.error.message;
        return;
    }

    ctx.body   = {
        id: repository.add(ctx.request.body)
    };
    ctx.status = 200;
};

exports.get = (ctx) => {
    const map = repository.get(ctx.params.id);
    if (!map) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body   = map;
};

const addMapSchema = Joi.object({
    name        : Joi.string().required(),
    playersCount: Joi.number().min(1).max(100).required()
}).unknown();