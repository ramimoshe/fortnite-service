'use strict';

const config     = require('config');
const koa        = require('koa');
const bodyParser = require('koa-bodyparser');
const KoaRouter  = require('koa-router');
const pjson      = require('../package.json');
const router     = require('./router');


async function start() {
    const app = new koa();
    app.name  = pjson.name;

    app.use(bodyParser());
    const routeTable = router.getRouteTable();
    app.use(routeTable.routes());
    app.use(routeTable.allowedMethods());

    app.listen(config.server.port);
}

start()
    .then(() => console.log(`API running on port ${config.server.port}...`));