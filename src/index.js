'use strict';

const koa        = require('koa');
const bodyParser = require('koa-bodyparser');
const pjson      = require('../package.json');
const router     = require('./router');

const port = 80;

async function start() {
    const app = new koa();
    app.name  = pjson.name;

    app.use(bodyParser());
    const routeTable = router.getRouteTable();
    app.use(routeTable.routes());
    app.use(routeTable.allowedMethods());

    app.listen(port);
}

start()
    .then(() => console.log(`API running on port ${port}...`));