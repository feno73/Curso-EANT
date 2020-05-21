class Producto {
    constructor(n, s, p, i, m){
        this.nombre = n
        this.stock = s
        this.precio = p
        this.imagen = i
        this.marca = m
    }

    /////////////////////////////////Metodos de instancia/////////////////////////////////////
    Mostrar(){ //<--Metodo de instancia. Se usan una vez instanciado el objeto producto
        const ficha = document.createElement("article")
        ficha.classList.add("col-4")
        ficha.innerHTML = `<div class="card h-100">
                                    <a href="#">
                                        <img class="card-img-top img-fluid" src=${this.imagen} alt="">
                                    </a>
                                    <div class="card-body">
                                        <h4 class="card-title"><a href="#">${this.marca} ${this.nombre}</a> <span class="badge badge-pill badge-success float-right">$${this.precio}</span></h4>
                                        <p class="card-text">${this.stock} unid.</p>
                                        <button class="btn btn-primary float-right">Comprar</button>
                                    </div>
                                </div>`
        document.querySelector("#productos-destacados").appendChild(ficha)
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