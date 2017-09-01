(function () {
    'use strict';
    var Heroes = require('./../heroes/heroes.model');

    module.exports = {

        /*Get all users from db*/
        getHeroes: function (req, res) {
            console.log('getting all');
            Heroes.find({}, function (error, heroes) {

                if (error) {
                    res.json({
                        err: 'Erro ao obter os dados'
                    })
                }
                res.json({
                    data: heroes
                })

            })
        },//End of getAll
        
         deleteHero: function (req, res) {
            console.log('deleting a hero', req.params);
            Heroes.remove({id:req.params.id}, function (error, heroes) {

                if (error) {
                    res.json({
                        err: 'Erro ao obter os dados'
                    })
                }
                res.json({
                    data: heroes
                })
            })
        }//End of deleteHero


    }

})();