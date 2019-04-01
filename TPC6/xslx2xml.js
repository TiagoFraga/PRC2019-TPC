var exceltojson = require("xlsx-to-json-lc")
var xml2js = require('xml2js'); 
var fs = require('fs')
var jsonfile = require("jsonfile")

exceltojson({
    input: "freguesias-metadata.xlsx",
    output: "freguesias.json",
    lowerCaseHeaders:true //to convert all excel headers to lowr case in json
  }, async function(err, result) {
    if(err) {
      console.error(err);
    } else {
        var file = 'freguesias.json'
        var resultFile = 'freguesias.xml'

        var dados = fs.readFileSync(file)
        var data = new Array()

        await jsonfile.readFile(file,async(erro,dados)=>{
            for(var i in dados){
                 var d = dados[i]
                 console.log(dados[i])
                 await data.push({localidade:dados[i]})
            }
            var builder = new xml2js.Builder({
                rootName: 'freguesias'
            });
            var xml = builder.buildObject(data);
             await fs.appendFile(resultFile,xml,(error)=>{
                 if(!error){
                     console.log('Saved')            
                 }
                 else{
                     console.log('erro')
                 }
             })
         })
    }
  })





