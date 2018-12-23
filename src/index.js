'use strict';

const config     = require('config');
const koa        = require('koa');
const bodyParser = require('koa-bodyparser');
const KoaRouter  = require('koa-router');
const cors       = require('@koa/cors');
const pjson      = require('../package.json');
const router     = require('./router');


async function start() {
    const app = new koa();
    app.name  = pjson.name;

    app.use(cors({ credentials: true }));
    app.use(bodyParser());
    app.use(new KoaRouter().allowedMethods());

    app.use(router.getRouteTable().routes());

    app.listen(config.server.port);
}

start()
    .then(() => console.log(`API running on port ${config.server.port}...`));