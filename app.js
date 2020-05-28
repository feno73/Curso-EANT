const express = require("express")

const server = express()


const docs = express.static("docs")
server.use(docs)

server.get("/ofertas.html", function(request, response){
    response.end("docs/mercadotech.html")
})
server.get("/saludo", function(request, response){
    response.end("docs/mercadotech.html")
})

//server.post("Ruta", proceso)


server.listen(2000, function(){
    console.log("Server levantado")
})
