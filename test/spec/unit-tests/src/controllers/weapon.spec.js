'use strict';

jest.mock('../../../../../src/services/repository');

const repositoryMock = require('../../../../../src/services/repository');
const weaponController  = require('../../../../../src/controllers/weapon');


test('get - existing weapon - return weapon', () => {
    const expectedResult = {
        id     : 1,
        name   : 'ASSAULT RIFLE (BURST)',
        bullets: 3
    };

    repositoryMock.get.mockReturnValue(expectedResult);
    const ctx = {
        params: {
            id: 1
        }
    };
    weaponController.get(ctx);

    expect(ctx.body).toEqual(expectedResult);
});