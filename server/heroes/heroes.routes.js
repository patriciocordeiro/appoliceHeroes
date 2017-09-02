(function () {

    'use strict';

    module.exports = function (app, express, heroesApi) {

        //get a router instance
        var router = express.Router();

        //Get all heroes
        router.get('/api/heroes', heroesApi.getHeroes); 
        
        /*Get one hero*/
        router.get('/api/heroes/:id', heroesApi.getHeroe);
       
        /*Delete one hero*/
        router.delete('/api/heroes/:id', heroesApi.deleteHero);
       
        /*Update a hero*/
        router.put('/api/heroes/:id', heroesApi.updateHero);

        /*Create new hero*/
        router.post('/api/heroes', heroesApi.createHero);
       
        //config app to use router
        app.use('/', router);


    }

})();