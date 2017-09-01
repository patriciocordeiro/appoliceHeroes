(function () {

    'use strict';

    var mongoose = require('mongoose');

    var heroesSchema = mongoose.Schema({
        name: String,
        id:Number
    })

    module.exports = mongoose.model('Heroes', heroesSchema, 'heroes');

})();