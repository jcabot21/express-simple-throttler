const Promise = require('bluebird');
const random = require('lodash.random');

/**
 * Creates an express middleware function which adds a delay to all requests. The delay
 * is specified in milliseconds. Optionally, specify whether you want the delay amount to
 * be some random amount betwen 0 and the specified delay instead of constant. By default
 * the delay applied will be constant.
 * 
 * @param {number} delay - delay to apply to requests, specified in milliseconds
 * @param {boolean} [randomize] - defaults to false, if specified delay will be random instead of constant
 * 
 * @returns {Function} - express middleware which will apply delay
 */
module.exports = (delay, randomize = false) => 
    (request, response, next) => 
        Promise.delay(!randomize ? delay : random(0, delay))
            .then(() => next());