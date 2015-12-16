'use strict';

module.exports = {
    '/': require('../../controller/index'),
    '/details/:id': require('../../controller/details'),
    '404': require('../../controller/404').display,
    '*': require('../../controller/404').redirect,
};
