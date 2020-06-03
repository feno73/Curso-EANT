const express = require("express")

const server = express()

const port = process.env.PORT || 2000

const docs = express.static("docs")
server.use(docs)

server.get("/ofertas.html", function(request, response){
    response.end("docs/mercadotech.html")
})
server.get("/saludo", function(request, response){
    response.end("docs/mercadotech.html")
})

//server.post("Ruta", proceso)


server.listen(port, function(){
    console.log("Server levantado")
})
