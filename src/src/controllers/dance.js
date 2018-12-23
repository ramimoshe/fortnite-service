'use strict';

const Joi        = require('joi');
const repository = require('../services/repository');


exports.get = (ctx) => {
    const dance = repository.get(ctx.params.id);

    if (!dance) {
        ctx.status = 404;
    } else {
        ctx.status = 200;
        ctx.body   = dance;
    }
};

exports.schemas = {
    unmatchedResponse: Joi.object({
        kind: Joi.string().required(),
    }).required()
};