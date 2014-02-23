define(function (require) {

    "use strict";

    var $               = require('jquery'),
        Handlebars      = require('handlebars'),
        Backbone        = require('backbone'),
        ProductListView = require('app/views/ProductListView'),
        models          = require('app/models/product'),
        tplText         = require('text!tpl/WakeUp.html'),
        template = Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.wakeUpList = new models.WakeUpCollection();
            this.render();
        },

        render: function () {
            this.wakeUpList.fetch({ data: { from: 0, to: 10 }});
            var wakeups = this.wakeUpList.toJSON();
            var nowHour = (new Date()).getHours()+1;
            wakeups.forEach(function(wakeup) {
                var hour = parseInt(wakeup.hour);
                wakeup.time = "" + ((nowHour+hour)%24) + ":00";
            })
            console.log(wakeups);
            this.$el.html(template(wakeups));
            return this;
        },

        events: {
            "keyup .search-key":    "search",
            "keypress .search-key": "onkeypress",
            "click .action-button": "other"
        },

        search: function (event) {
            console.log("here");
            var key = $('.search-key').val();
            this.productList.fetch({reset: true, data: {name: key}});

        },

        other: function (event) {
            console.log("works");
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        }

    });

});