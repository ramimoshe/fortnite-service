'use strict';

const Joi    = require('joi');
const uuidv4 = require('uuid/v4');
const Keyv   = require('keyv');

const db = new Keyv();

exports.add = (ctx) => {
    const validationResult = Joi.validate(ctx.request.body, addPlayerSchema);
    if (validationResult.error) {
        ctx.status = 400;
        ctx.body   = validationResult.error.message;
        return;
    }

    const id = uuidv4();
    db.set(id, validationResult.value);

    ctx.body   = { id };
    ctx.status = 201;
};

exports.get = (ctx) => {
    const player = db.get(ctx.params.id);
    if (!player) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body   = player;
};

const addPlayerSchema = Joi.object({
    name  : Joi.string().required(),
    level : Joi.number().min(1).max(100).default(1),
    dances: Joi.array().items(Joi.string().valid(['Floss', 'Dance Moves', 'Electro Shuffle'])).default([])
}).and('level', 'dances').unknown();