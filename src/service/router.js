var Director = require('director');
var isServer = require('process').browser == undefined;

module.exports = Router;

/**
 * Wrapper for Director router
 * Responsible for both client and server side routing
 *
 * @constructor
 */
function Router() {
    if (isServer) {
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
    this.director[isServer ? 'get' : 'on'](pattern, callback);
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
