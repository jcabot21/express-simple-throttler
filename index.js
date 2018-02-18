const Promise = require('bluebird');
const random = require('lodash.random');

module.exports = (delay, randomize = false) => 
    (request, response, next) => 
        Promise.delay(!randomize ? delay : random(0, delay))
            .then(() => next());