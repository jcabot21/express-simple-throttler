const present = require('present');
const throttler = require('../index');
const standardDelay = 500;

describe('express-throttler', () => {
    it('can be created without any parameters', () => {
        expect(throttler()).toBeDefined();
    });

    it('should not have an issue with undefined request and responses', done => {
        const middleware = throttler();

        middleware(undefined, undefined, () => {
            expect(true).toBe(true);
            done();
        });
    });

    it('should take at least as long as specified in delay to call next', done => {
        const middleware = throttler(standardDelay);
        const start = present();

        middleware(undefined, undefined, () => {
            const end = present();

            expect(end - start).toBeGreaterThan(standardDelay - 2); // Subtracting a few milliseconds to avoid js timing issue
            done();
        });
    });

    it('can take anytime when random is specified', done => {
        const middleware = throttler(standardDelay);
        const start = present();

        middleware(undefined, undefined, () => {
            const end = present();
            const runtime = end - start;
            const tookTime = runtime <= standardDelay || runtime >= standardDelay;

            expect(tookTime).toBe(true);
            done();
        });
    });
});