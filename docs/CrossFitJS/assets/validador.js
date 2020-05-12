/* Otra seccion*/
let links = document.querySelectorAll("nav a");

// for (let i = 0; i < links.length; i++) {
// 	links[i].onclick = validarLink
// }

// links.forEach(asignarEvento)

// function asignarEvento(link){
// 	link.onclick = validarLink
// }
links.forEach(function (link) {
    link.onclick = validarLink
});


function validarLink(evento) {
    evento.preventDefault() //desactiva la accion por default del evento
    console.log(evento)
    let rta = confirm(`¿Esta seguro que desea ir al ${evento.target.innerText}?`);

    if (rta) {
        window.location.href = evento.target.href;
    }
}