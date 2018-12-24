'use strict';

const Joi        = require('joi');
const repository = require('../services/repository');


exports.get = (ctx) => {
    const weapon = repository.get(ctx.params.id);
    if (!weapon) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body   = weapon;
};

exports.add = (ctx) => {
    ctx.body   = {
        id: repository.add(ctx.request.body)
    };
    ctx.status = 200;
};

exports.schemas = {
    getParams: Joi.object({
        id: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
    addBody  : Joi.object({
        name   : Joi.string().valid('MACHINE_GUN', 'PISTOL').required(),
        bullets: Joi.number().min(0).max(10).required(),
        info   : Joi.string().min(1).max(1000).optional()
    }).unknown()
};