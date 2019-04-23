const axios = require('axios');
const Cinema = module.exports;


async function execQuery (query){
    try{
        var enconded = encodeURIComponent(query)
        response = await axios.get("http://localhost:7200/repositories/filmes" + "?query=" + enconded);
        return(response.data.results.bindings)
    }
    catch(error){
        return("Erro: " + error)
    }
}

//--------------------------- FILMES --------------------------

Cinema.listarFilmes = () => {
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
                    select * where{
                        ?filme a :Filme.
                        ?filme :título ?titulo.
                        ?filme :ano ?ano.
                    }
                    order by desc(?ano) ?titulo`

    return execQuery(query)
};


Cinema.infoFilmes = (id) => {
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
                    select * where{
                        :${id} :título ?tit;
                               :ano ?ano.
                    }`

    return execQuery(query)
};

Cinema.filmeAnos = (id) => {
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
                    select ?ano where{
                        :${id} :ano ?ano.
                    }`

    return execQuery(query)
};

Cinema.filmeAtores = (id) => {
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
                    select ?a ?nomeAtor where{
                        :${id} :temAtor ?a.
                        ?a :nome ?nomeAtor.
                    }`

    return execQuery(query)
};

Cinema.filmeGeneros = (id) => {
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
                    select ?g ?nomeAtor where{
                        :${id} :temGénero ?g.
                    }`

    return execQuery(query)
};


//--------------------------- ATORES --------------------------

Cinema.listarAtores = () => {
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
                        select ?s ?nome where{
                            ?s a :Pessoa.
                            ?s :nome ?nome.
                        }
                        order by ?nome`

    return execQuery(query)
};


Cinema.infoAtor = (id) => {
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
                    select ?nome where{
                        :${id} :nome ?nome;
                    }`

    return execQuery(query)
};

Cinema.atorFilmes = (id) => {
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
                    select ?f ?ftit where{
                        :${id} :atuou ?f.
                        ?f :título ?ftit.
                    }`

    return execQuery(query)
};

//--------------------------- GENEROS --------------------------

Cinema.listarGeneros = () => {
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
                    select ?s where{
                        ?s a :Género.
                    }
                    order by ?s`

    return execQuery(query)
};

Cinema.generoFilmes = (id) => {
    const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
                    select ?f ?ftit where{
                        :${id} :éGéneroDe ?f.
                        ?f :título ?ftit.
                    }`

    return execQuery(query)
};