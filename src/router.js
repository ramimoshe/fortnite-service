'use strict';

const KoaRouter         = require('koa-router');
const KoaRouteValidator = require('koa-route-validator');
const weapon            = require('./controllers/weapon');
const dance             = require('./controllers/dance');
const player            = require('./controllers/player');
const world             = require('./controllers/world');
const health            = require('./controllers/health');


exports.getRouteTable = () => {
    const koaRouter = new KoaRouter();

    koaRouter.get('/management/health', health.getStatus);


    koaRouter.post('/world', world.add);
    koaRouter.get('/world/:id', world.get);

    koaRouter.post('/player', player.add);
    koaRouter.get('/player/:id', player.get);

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

    return koaRouter;
};

function addWorldRoutes(koaRouter) {

}

function addPlayerRoutes(koaRouter) {

}

function addWeaponRoutes(koaRouter) {

}

function addDanceRoutes(koaRouter) {

}

