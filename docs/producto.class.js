class Producto {
    constructor(n, s, p, i, m){
        this.nombre = n
        this.stock = s
        this.precio = p
        this.imagen = i
        this.marca = m
        this.estado = false
        this.vDOM = document.createElement("article")
    }

    /////////////////////////////////Metodos de instancia/////////////////////////////////////
    Mostrar(){ //<--Metodo de instancia. Se usan una vez instanciado el objeto producto
        this.vDOM.classList.add("col-4")
        this.vDOM.innerHTML = `<div class="card h-100">
                                    <a href="#">
                                        <img class="card-img-top img-fluid" src=${this.imagen} alt="">
                                    </a>
                                    <div class="card-body">
                                        <h4 class="card-title"><a href="#">${this.marca} ${this.nombre}</a> <span class="badge badge-pill badge-success float-right">$${parseFloat(this.precio).toFixed(2)}</span></h4>
                                        <p class="card-text">${this.stock} unid.</p>
                                        <button class="btn-editar btn btn-warning float-left ${ (auth2 && auth2.isSignedIn.get() == true) ? " " : "d-none"}">Editar</button>
                                        <button class="btn-comprar btn btn-primary float-right">Comprar</button>
                                    </div>
                                </div>`

        if(!this.estado){ //<-- Valida si el elemento esta en la interfaz
            document.querySelector("#productos-destacados").appendChild(this.vDOM)
            this.estado = true
        }
        

        this.vDOM.querySelector(".btn-editar").onclick = (evento) => {

            console.log(this)
            console.log(evento.target) //<-- Este comportamiento tiene el this cuando se usa function en lugar de "=>"
            
            if (auth2.isSignedIn.get()) {

                //Editar datos del producto
                this.marca = prompt("Ingrese nueva marca:", this.marca)
                this.nombre = prompt("Ingrese nuevo nombre:", this.nombre)
                this.stock = prompt("Ingrese un nuevo stock:", this.stock)
                this.precio = prompt("Ingrese un nuevo precio:", this.precio)
                this.imagen = prompt("Ingrese nueva imagen:", this.imagen)
    
                //Mostrar con los nuevos datos
                this.Mostrar()
    
                //aca voy a mandar los datos actualizados al servidor
                let formulario = new FormData()
                formulario.append("marca", this.marca)
                formulario.append("nombre", this.nombre)
                formulario.append("stock", this.stock)
                formulario.append("precio", this.precio)
                formulario.append("imagen", this.imagen)
    
                let config = {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/x-www-form-urlencoded"
                        // "Content-Type" : "application/multipart-form-data",
                        // "Content-Type" : "application/JSON",
                    },
                    body : formulario
                }
                fetch("https://webhook.site/930d0a32-6c2c-4d6b-92df-81489ed94d91", config)                
            }else{
                alert("Hay que logearse")
            }

        }

    }
    Descuento(cupon){ //<--Metodo de instancia. Se usan una vez instanciado el objeto producto
        if (cupon === "masbarato"){
            this.precio = this.precio * 0.85
        }
    }
    ///////////////////////Metodos de clase o estaticos///////////////////////////////////
    static ArmarCatalogo(objetos, rango){
        let productos = objetos.map( ({Nombre, Stock, Precio, Imagen, Marca}) => new Producto(Nombre, Stock, Precio, Imagen, Marca) ) 
        
        /////FORMA NO RECOMENDADA///////
        // if( rango ){
        //     let resultado = productos.filter(producto => producto.precio > rango.min && producto.precio < rango.max)
        // } else {
        //     let resultado = productos
        // }
        ///////OPERADOR TERNARIO///////
        let resultado = rango ? productos.filter(producto => producto.precio > rango.min && producto.precio < rango.max) : productos

        return resultado
    }
}