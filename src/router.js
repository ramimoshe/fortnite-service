'use strict';

const KoaRouter         = require('koa-router');
const KoaRouteValidator = require('koa-route-validator');
const weapon            = require('./controllers/weapon');
const player            = require('./controllers/player');
const health            = require('./controllers/health');


exports.getRouteTable = () => {
    const koaRouter = new KoaRouter();

    addHealthRoute(koaRouter);
    addPlayerRoutes(koaRouter);
    addWeaponRoutes(koaRouter);

    return koaRouter;
};

function addHealthRoute(koaRouter) {
    koaRouter.get('/management/health', health.getStatus);
}

function addPlayerRoutes(koaRouter) {
    koaRouter.post('/player', player.add);
    koaRouter.get('/player/:id', player.get);
}

function addWeaponRoutes(koaRouter) {
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
}
