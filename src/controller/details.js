'use strict';

var _ = require('underscore');
var view = require('../resources/views/main/details.hbs');

module.exports = function Details(id) {

    // find a sample item or redirect to 404 in case it wasnt not found
    var item = _.findWhere(require('../service/sampleItems'), {id: id * 1});
    if (item == undefined) {
        require('./404').redirect.apply(this);
        return;
    }

    this.app.render(view, {
        platform: this.app.router.isServer ? 'server' : 'client',
        item: item
    });
};
