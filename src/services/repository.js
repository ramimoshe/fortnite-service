'use strict';
const _      = require('lodash/fp');
const uuidv4 = require('uuid/v4');


const repository = new Map();

exports.add = (item) => {
    const id = uuidv4();
    repository.set(id, item);
    return id;
};

exports.get = (id) => {
    return repository.get(id);
};