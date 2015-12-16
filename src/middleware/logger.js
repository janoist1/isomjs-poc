'use strict';

// export logger middleware
module.exports = function log(req, res, next) {
    console.log('>>>', req.originalUrl);
    next();
};
