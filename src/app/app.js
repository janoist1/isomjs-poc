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
 * @param mountId - id of the element where the App will be mounted on
 * @constructor
 */
function App(router, document, state, mountId) {
    console.log('App.constructor');

    this.document = document; // we might not need this - only the wrapper html .. tbc
    this.state = state || {}; // todo: state handling
    this.mountId = mountId || 'container';
    this.router = router;
    this.subscribers = {
        render: []
    };

    loadRoutes.call(this);

    /**
     * parse routing table and attach handlers
     */
    function loadRoutes() {
        for (var pattern in routes) {
            var app = this;

            // save "pattern" in a closure
            this.router.on(pattern, (function (pattern) {
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
 * Start app on client side
 */
App.prototype.startClient = function () {
    console.log('App.startClient');

    loadDOMEvents.call(this);

    /**
     * Load DOM events (attach click event listeners for links)
     */
    function loadDOMEvents() {
        if (document === undefined) {
            console.log('error: document is undefined'); // todo: throw an exception instead
            return;
        }

        document.addEventListener('click', function (e) {
            var el = e.target;
            var dataset = el && el.dataset;

            if (el && el.nodeName === 'A' && (dataset.passThru == null || dataset.passThru === 'false')) {
                this.router.setRoute(el.attributes.href.value);
                e.preventDefault();
                return false;
            }
        }.bind(this), false);
    }
};

/**
 * Render component
 */
App.prototype.render = function (view, data) {
    console.log('App.render', data);

    this.document.getElementById(this.mountId).innerHTML =
        // todo: sort out this - get rid of the condition
        this.router.isServer ? view(data) : handlebars.compile(view)(data);

    this.fireEvent('render');
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
