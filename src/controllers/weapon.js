'use strict';

const Joi    = require('joi');
const uuidv4 = require('uuid/v4');
const Keyv   = require('keyv');

const db = new Keyv();

exports.add = (ctx) => {
    const id = uuidv4();
    db.set(id, ctx.request.body);

    ctx.body   = { id };
    ctx.status = 201;
};

exports.get = (ctx) => {
    const weapon = db.get(ctx.params.id);
    if (!weapon) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body   = weapon;
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