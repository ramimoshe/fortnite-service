'use strict';

const KoaRouter         = require('koa-router');
const KoaRouteValidator = require('koa-route-validator');
const weapon            = require('./controllers/weapon');
const dance             = require('./controllers/dance');
const player            = require('./controllers/player');
const health            = require('./controllers/health');


exports.getRouteTable = () => {
    const koaRouter = new KoaRouter();

    koaRouter.get('/health', health.getStatus);

    const rv = new KoaRouteValidator();
    rv.on('warn', console.warn);

    koaRouter.get('/weapon/:id', rv.create({
        requestSchema: {
            params: weapon.schemas.getParams
        }
    }), weapon.get);
    koaRouter.post('/weapon', rv.create({
        requestSchema: {
            body: weapon.schemas.addBody
        }
    }), weapon.add);

    koaRouter.get('/dance/invalid-response', rv.create({
        responseSchema: {
            body: dance.schemas.unmatchedResponse
        }
    }), dance.get);

    koaRouter.post('/player', player.add);
    koaRouter.get('/player/:id', player.get);

    return koaRouter;
};

