'use strict';

var handlebars = require('handlebars');
var routes = require('../resources/config/routes');

module.exports = exports = App;

/**
 * App logic - here we tie things together
 *
 * @param router - service dependency
 * @param document - dom dependency
 * @param state - app state
 * @param containerId - id of the element where the App will be mounted on
 * @constructor
 */
function App(router, document, state, containerId) {
    console.log('App.constructor');

    this.document = document; // we might not need this - only the wrapper html .. tbc
    this.state = state || {}; // todo: state handling
    this.container = this.document.getElementById(containerId || 'container'); // cache the content element
    this.router = router;
    this.subscribers = {
        render: []
    };

    // lets make app accessible via "app"
    var app = this;

    loadRoutes();

    /**
     * parse routing table and attach handlers
     */
    function loadRoutes() {
        for (var pattern in routes) {
            // save "pattern" in a closure
            app.router.on(pattern, (function (pattern) {
                var context = {
                    app: app,
                };
                var callback = routes[pattern];

                return function match() {
                    console.log('App.match', pattern);

                    // add some server specific logic, todo: this probably should be removed/replaced by a more abstract solution
                    if (context.app.router.isServer) {
                        context.req = this.req;
                        context.res = this.res;
                    }

                    callback.apply(context, arguments);
                };
            })(pattern));
        }
    }
}

/**
 * Render component
 */
App.prototype.render = function (view, data) {
    console.log('App.render', data);

    this.setContent(
        // todo: sort out this - get rid of the condition
        this.router.isServer ? view(data) : handlebars.compile(view)(data)
    );

    this.fireEvent('render');
};

/**
 * Reset app
 */
App.prototype.reset = function () {
    console.log('App.reset');

    this.setContent('');
};

/**
 * Set the content
 *
 * @param content
 */
App.prototype.setContent = function (content) {
    console.log('App.setContent');

    this.container.innerHTML = content;
};

/**
 * Subscribe to an event
 *
 * @param event
 * @param fn
 */
App.prototype.on = function (event, fn) {
    this.subscribers[event].push(fn);
};

/**
 * Fire the given event
 *
 * @param event
 */
App.prototype.fireEvent = function (event) {
    for (var i in this.subscribers[event]) {
        this.subscribers[event][i]();
    }
};
