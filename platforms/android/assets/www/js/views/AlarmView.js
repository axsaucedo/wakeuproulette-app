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
            "change .alarm-time" : "alarm_change"
        },

        alarm_change : function(event) {
            // console.log(event);
            var hour = parseInt($(".alarm-time").val().split(":")[0]);
            var time = (hour < 10 ? "0" : "") + hour + ":00:00";
            $(".alarm-time").val(time);
        }

    });

});