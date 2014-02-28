define(function (require) {

    "use strict";

    var $               = require('jquery'),
        Handlebars      = require('handlebars'),
        Backbone        = require('backbone'),
        models          = require('app/models/wur-api'),
        tplText         = require('text!tpl/WakeUp.html'),
        template = Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.wakeUpList = new models.WakeUpCollection();
            this.render();
        },

        render: function () {
            var that = this;
            this.wakeUpList.fetch({ data: { from: 0, to: 10 },
                                    success : function() {
                                        var wakeups = that.wakeUpList.toJSON();
                                        var nowHour = (new Date()).getHours()+1;
                                        wakeups.forEach(function(wakeup) {
                                            var hour = parseInt(wakeup.hour);
                                            wakeup.time = "" + ((nowHour+hour)%24) + ":00";
                                        })
                                        console.log(wakeups);
                                        console.log("here as well");
                                        that.$el.html(template(wakeups));
                                    }});
            this.$el.html(template());
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