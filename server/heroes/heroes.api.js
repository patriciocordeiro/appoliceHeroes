(function () {
    'use strict';
    var Heroes = require('./../heroes/heroes.model');
    var async = require('async');

    module.exports = {

        /*Get all heroes*/
        getHeroes: function (req, res) {
            console.log('getting all heroes');
            Heroes.find({}, function (error, heroes) {

                if (error) {
                    res.json({
                        err: 'db error'
                    })
                } else {
                    res.json({
                        data: heroes
                    });
                }
            });
        }, //End of getAll 

        /*Get one hero*/
        getHeroe: function (req, res) {
            console.log('getting one hero', req.params.id);
            Heroes.find({
                id: req.params.id
            }, function (error, hero) {
                if (error) {
                    res.json({
                        err: 'db error'
                    })
                } else {
                    res.json({
                        data: hero[0]
                    });
                }

            });
        }, //End of getOne

        /*Delete hero*/
        deleteHero: function (req, res) {
            console.log('deleting a hero', req.params);
            Heroes.remove({
                id: req.params.id
            }, function (error, heroes) {

                if (error) {
                    res.json({
                        err: 'db error'
                    })
                } else {
                    res.json({
                        data: heroes
                    });
                }

            })
        }, //End of deleteHero  

        /*Update hero*/
        updateHero: function (req, res) {
            console.log('updating a hero', req.body);
            Heroes.findOneAndUpdate({
                id: req.params.id
            }, {
                $set: {
                    name: req.body.name
                }
            }, {
                new: true
            }, function (error, hero) {

                if (error) {
                    res.json({
                        err: 'db error'
                    })
                } else {
                    res.json({
                        data: hero
                    });
                }

            })
        }, //End of updateHero   


        /*Create new hero*/
        createHero: function (req, res) {
            console.log('creating a hero', req.body);
            /*We need to set an id for the new hero (in real implementation we won't do this)
            The id will be automatically set*/

            async.waterfall([
              function (callback) {
                    /*1 - Find all Heroes*/
                    Heroes.find({}, function (error, heroes) {

                        if (error) {
                            return callback(error);
                        } else {
                            callback(null, heroes);
                        }
                    });
              },
                function (heroes, callback) {
                    //Get Max id
                    var heoroesIds = [];

                    heroes.forEach(function (hero) {
                        heoroesIds.push(hero.id)
                    })
                    //Easy here (the above may take some time to process)
                    process.nextTick(function () {
                        console.log(heoroesIds);
                        var maxId = Math.max.apply(null, heoroesIds);
                        console.log(maxId);
                        callback(null, maxId);
                    });
              },
                function (maxId, callback) {
                    //Create new Hero
                    if (maxId) {
                        //Set an id for the hero
                        req.body.id = maxId + 1;
                    }
                    var newHero = new Heroes(
                        req.body
                    )
                    newHero.save(function (error, hero) {
                        console.log(error);
                        if (error) {
                            res.json({
                                err: 'db error'
                            })
                        }
                        res.json({
                            data: hero
                        })
                    })
              }, ], function (err, results) {

                if (error) {
                    res.json({
                        err: 'some error'
                    })
                } else {
                    res.json({
                        data: hero
                    });
                }
            })
        } //End of create
    }

})();
