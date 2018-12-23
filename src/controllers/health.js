'use strict';


exports.getStatus = async (ctx) => {
    ctx.body   = {
        message: 'up',
        commit : process.env.GIT_COMMIT,
        branch : process.env.NODE_ENV
    };
    ctx.status = 200;
};
