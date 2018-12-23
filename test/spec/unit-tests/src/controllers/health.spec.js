'use strict';

const health = require('../../../../../src/controllers/health');


test('getStatus - return up', () => {
    const gitCommit        = '123';
    const nodeEnv          = 'test';
    process.env.GIT_COMMIT = gitCommit;
    process.env.NODE_ENV   = nodeEnv;

    const expectedResult = {
        body  : {
            message: 'up',
            commit : gitCommit,
            branch : nodeEnv
        },
        status: 200
    };

    let ctx = {};
    health.getStatus(ctx);

    expect(ctx).toEqual(expectedResult);
});