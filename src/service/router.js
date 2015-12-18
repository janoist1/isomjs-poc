'use strict';

var Director = require('director');

module.exports = Router;

/**
 * Wrapper for Director router
 * Responsible for both client and server side routing
 *
 * @param isServer - flag that indicates if we are on a server or client platform
 * @constructor
 */
function Router(isServer) {
    this.isServer = isServer;

    // init Director
    if (this.isServer) {
        this.director = new Director.http.Router();
    } else {
        this.director = new Director.Router().configure({
            html5history: true
        }).init();
    }
}

/**
 * Attach an adhoc route
 *
 * @param pattern
 * @param callback
 */
Router.prototype.on = function (pattern, callback) {
    this.director[this.isServer ? 'get' : 'on'](pattern, callback);
};

/**
 * proxy method for Director's dispatch
 */
Router.prototype.dispatch = function () {
    this.director.dispatch.apply(this.director, arguments);
};

/**
 * proxy method for Director's setRoute
 */
Router.prototype.setRoute = function () {
    this.director.setRoute.apply(this.director, arguments);
};
