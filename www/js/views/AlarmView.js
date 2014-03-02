define(function (require) {

    "use strict";

    var $               = require('jquery'),
        Handlebars      = require('handlebars'),
        Backbone        = require('backbone'),
        models          = require('app/models/wur-api'),
        tplText         = require('text!tpl/Alarm.html'),
        template = Handlebars.compile(tplText);


    return Backbone.View.extend({

        initialize: function () {
            this.render();
            console.log("bal");
        },

        render: function () {
            this.$el.html(template());
            return this;
        },

        events: {
            "click .alarm-arrow-up" : "alarm_up",
            "click .alarm-arrow-down" : "alarm_down",
            "click .repeat-checkbox" : "repeat_toggle"
        },

        alarm_up : function(event) {
            var hour = (parseInt($(".alarm-time").val().split(":")[0]) + 25) % 24;
            var time = (hour < 10 ? "0" : "") + hour + ":00";
            $(".alarm-time").val(time);
        },

        alarm_down : function(event) {
            var hour = (parseInt($(".alarm-time").val().split(":")[0]) + 23) % 24;
            var time = (hour < 10 ? "0" : "") + hour + ":00";
            $(".alarm-time").val(time);
        },

        repeat_toggle : function(event) {
            console.log(event.target);
            var check = $('.check');
            check.prop('checked', !check.prop('checked'));
        }

    });

});