define(function (require) {

    "use strict";

    var $               = require('jquery'),
        Handlebars      = require('handlebars'),
        Backbone        = require('backbone'),
        ProductListView = require('app/views/ProductListView'),
        models          = require('app/models/product'),
        tplText         = require('text!tpl/Home.html'),
        template = Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.productList = new models.ProductCollection();
            this.render();
        },

        render: function () {
            this.$el.html(template());
            this.listView = new ProductListView({collection: this.productList, el: $(".scroller", this.el)});
            return this;
        },

        events: {
            "keyup .search-key":    "search",
            "keypress .search-key": "onkeypress",
            "click #alarm-button": "alarm",
            "click #wakeup-button": "wakeup",
            "click #profile-button": "profile"
        },

        search: function (event) {
            var key = $('.search-key').val();
            this.productList.fetch({reset: true, data: {name: key}});
        },

        onkeypress: function (event) {
            if (event.keyCode === 13) { // enter key pressed
                event.preventDefault();
            }
        },

        wakeup: function (event) {
            var key = $('.search-key').val();
            this.productList.fetch({reset: true, data: {name: key}});
        },

        alarm: function (event) {
            var key = $('.search-key').val();
            this.productList.fetch({reset: true, data: {name: key}});
        },

        profile: function (event) {
            var key = $('.search-key').val();
            this.productList.fetch({reset: true, data: {name: key}});
        }

    });

});