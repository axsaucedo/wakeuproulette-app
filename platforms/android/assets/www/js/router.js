define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Backbone = require('backbone'),
        PageSlider = require('app/utils/pageslider'),
        HomeView = require('app/views/HomeView'),

        slider = new PageSlider($('body')),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "products/:id": "productDetails",
            "alarm": "alarm",
            "wakeup": "wakeup",
            "profile": "profile"
        },

        home: function () {
            homeView.delegateEvents();
            $('body').append(homeView.$el);
            homeView.$el.attr("class", "page page-center");
        },

        productDetails: function (id) {
            require(["app/models/product", "app/views/ProductView"], function (models, ProductView) {
                var product = new models.Product({id: id});
                product.fetch({
                    success: function (data) {
                        slider.slidePage(new ProductView({model: data}).$el);
                    }
                });
            });
        },

        wakeup: function() {
            require(["app/models/product", "app/views/ProductView"], function (models, ProductView) {
                var product = new models.Product({id: 2});
                product.fetch({
                    success: function (data) {
                        slider.slidePage(new ProductView({model: data}).$el);
                    }
                });
            });  
        }, 

        profile: function() {

        }

    });

});