'use strict';

var view = require('../resources/views/main/404.hbs');

module.exports = {
    /**
     * display a 404 page
     */
    display: function display404() {
        this.app.render(view, {});
    },

    /**
     * redirect to a 404 page
     */
    redirect: function redirect404() {
        if (this.isServer) {
            this.res.redirect('/404');
        } else {
            this.app.router.setRoute('/404');
        }
    }
};
