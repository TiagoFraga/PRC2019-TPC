var express = require('express');
var router = express.Router();
var Cinema = require('../controllers/cinema')


//--------------------------- FILMES --------------------------

router.get('/filmes', async function(req, res, next) {
    var dados = await Cinema.listarFilmes()
    var result = []
    for(d in dados){
        temp = {"ano":dados[d].ano.value,"titulo":dados[d].titulo.value,"filme":dados[d].filme.value.split("#")[1]}
        result.push(temp)
    }
    res.jsonp(result) 
});

router.get('/filmes/:id', async function(req, res, next) {
    var dados = await Cinema.infoFilmes(req.params.id);
    var result = []
    for(d in dados){
        temp = {"ano":dados[d].ano.value,"titulo":dados[d].tit.value}
        result.push(temp)
    }
    res.jsonp(result)
});

router.get('/filmes/:id/anos', async function(req, res, next) {
    var dados = await Cinema.filmeAnos(req.params.id);
    var result = []
    for(d in dados){
        temp = {"ano":dados[d].ano.value}
        result.push(temp)
    }
    res.jsonp(result) 
});

router.get('/filmes/:id/atores', async function(req, res, next) {
    var dados = await Cinema.filmeAtores(req.params.id);
    var result = []
    for(d in dados){
        temp = {"ator":dados[d].nomeAtor.value}
        result.push(temp)
    } 
    res.jsonp(result) 
});

router.get('/filmes/:id/generos', async function(req, res, next) {
    var dados = await Cinema.filmeGeneros(req.params.id);
    var result = []
    for(d in dados){
        temp = {"genero":dados[d].g.value}
        result.push(temp)
    }  
    res.jsonp(dados) 
});

//--------------------------- ATORES --------------------------

router.get('/atores', async function(req, res, next) {
    var dados = await Cinema.listarAtores();
    var result = []
    for(d in dados){
        temp = {"nome":dados[d].nome.value,"s":dados[d].s.value.split("#")[1]}
        result.push(temp)
    }
    res.jsonp(result) 
});

router.get('/atores/:id', async function(req, res, next) {
    var dados = await Cinema.infoAtor(req.params.id);
    var result = []
    for(d in dados){
        temp = {"nome":dados[d].nome.value}
        result.push(temp)
    }
    res.jsonp(result) 
});

router.get('/atores/:id/filmes', async function(req, res, next) {
    var dados = await Cinema.atorFilmes(req.params.id);
    var result = []
    for(d in dados){
        temp = {"filme":dados[d].ftit.value}
        result.push(temp)
    }
    res.jsonp(result) 
});


//--------------------------- GENEROS --------------------------

router.get('/generos', async function(req, res, next) {
    var dados = await Cinema.listarGeneros();
    var result = []
    for(d in dados){
        temp = {"id":dados[d].s.value.split("#")[1]}
        result.push(temp)
    }
    res.jsonp(result) 
});

router.get('/generos/:id/filmes', async function(req, res, next) {
    var dados = await Cinema.generoFilmes(req.params.id);
    var result = []
    for(d in dados){
        temp = {"filme":dados[d].ftit.value}
        result.push(temp)
    }
    res.jsonp(result) 
});


module.exports = router;
