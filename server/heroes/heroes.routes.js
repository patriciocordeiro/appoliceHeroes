(function () {

    'use strict';

    module.exports = function (app, express, heroesApi) {

        //get a router instance
        var router = express.Router();

        //Get all heroes
        router.get('/api/heroes', heroesApi.getHeroes);
        router.delete('/api/heroes/:id', heroesApi.deleteHero);

        //config app to use router
        app.use('/', router);


    }

})();