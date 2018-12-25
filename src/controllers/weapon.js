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
    get: {
        params: Joi.object({
            id: Joi.string().guid({ version: ['uuidv4'] }).required()
        })
    },
    add: {
        body: Joi.object({
            name       : Joi.string().min(1).max(100).required(),
            rarity     : Joi.string().valid('Epic', 'Legendary', 'Common', 'Uncommon', 'Rare').required(),
            damage     : Joi.number().min(1).max(200).required(),
            reloadSpeed: Joi.number().precision(1).min(0.1).max(10).required(),
            fireRate   : Joi.number().precision(2).min(0.1).max(10).required(),
            dps        : Joi.number().precision(1).min(0.1).max(200).required()
        })
    }
};