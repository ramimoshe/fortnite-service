'use strict';

const Joi        = require('joi');


exports.get = (ctx) => {
    const dance = { name: 'Disco Fever' };

    if (!dance) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
    ctx.body   = dance;
};

exports.schemas = {
    unmatchedResponse: Joi.object({
        kind: Joi.string().required(),
    }).required()
};