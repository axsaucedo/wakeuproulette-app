define(function (require) {

    "use strict";

    var $ = require('jquery'),
        Backbone = require('backbone'),
        PageSlider = require('app/utils/pageslider'),

        HomeView = require('app/views/HomeView'),
        AlarmView = require('app/views/AlarmView'),
        WakeUpView = require('app/views/WakeUpView'),
        ProfileView = require('app/views/ProfileView'),

        slider = new PageSlider($('.app-content')),

        homeView = new HomeView(),
        alarmView = new AlarmView(),
        wakeUpView = new WakeUpView(),
        profileView = new ProfileView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "alarm": "alarm",
            "wakeup": "wakeup",
            "profile": "profile",
            "products/:id": "productDetails"
        },

        home: function() {
            console.log("here")
            slider.slidePage(homeView.$el, true);
        },

        alarm: function () {
            alarmView.delegateEvents();
            slider.slidePage(alarmView.$el);
        },

        wakeup: function () {
            wakeUpView.delegateEvents();
            slider.slidePage(wakeUpView.$el);
        },

        profile: function () {
            profileView.delegateEvents();
            slider.slidePage(profileView.$el);
        },

        productDetails: function (id) {
            require(["app/models/wur-api", "app/views/ProductView"], function (models, ProductView) {
                var product = new models.Product({id: id});
                product.fetch({
                    success: function (data) {
                        slider.slidePage(new ProductView({model: data}).$el);
                    }
                });
            });
        }

    });

});