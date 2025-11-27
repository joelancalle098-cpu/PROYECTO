const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];
cargarEventosListeners();

function cargarEventosListeners() {
  listaCursos.addEventListener("click", agregarCurso);

  // eliminar
  carrito.addEventListener("click", eliminarCurso);

  vaciarCarrito.addEventListener("click", vaciarTodo )
}

function eliminarCurso(e) {
  console.log(e.target);

  if (e.target.classList.contains("borrar-curso")) {
    //console.log("eliminando");
    console.log(e.target.getAttribute("data-id"));

    const cursoId = e.target.getAttribute("data-id");

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    console.log(articulosCarrito);

    carritoHTML();
  }
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    // Animación del botón
e.target.classList.add("btn-added");
setTimeout(() => {
    e.target.classList.remove("btn-added");
}, 600);

    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado); //16
  }
}

function leerDatosCurso(cursoSeleccionado) {
  console.log(cursoSeleccionado);

  const infoCurso = {
    imagen: cursoSeleccionado.querySelector("img").src,
    titulo: cursoSeleccionado.querySelector("h4").textContent,
    precio: cursoSeleccionado.querySelector(".precio span").textContent,
    id: cursoSeleccionado.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const index = articulosCarrito.findIndex((curso) => curso.id === infoCurso.id);

if (index !== -1) {
  articulosCarrito[index].cantidad++;
} else {
  articulosCarrito.push({ ...infoCurso, cantidad: 1 });
}

  console.log(infoCurso);

  console.log(articulosCarrito);

  carritoHTML();
}

function carritoHTML() {
  limpiarHTML();

  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr"); //table row
    row.innerHTML = ` 
    <td><img src="${imagen}" width="100"></td>
    <td>  ${titulo} </td>
    <td> ${precio} </td>
    <td> ${cantidad} </td>
    <td> <a href="#" class="borrar-curso" data-id="${id}">Borrar</a> </td>
    `;
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
}
function vaciarTodo() {
  articulosCarrito = []; 
  limpiarHTML();        
}
const formBuscador = document.querySelector("#busqueda");
const inputBuscador = document.querySelector("#buscador");
const botonBuscador = document.querySelector(".submit-buscador");

// Filtra al escribir
inputBuscador.addEventListener("input", () => {
    filtrarCursos(inputBuscador.value);
});

// Filtra al hacer click
botonBuscador.addEventListener("click", (e) => {
    e.preventDefault();
    filtrarCursos(inputBuscador.value);
});

// Filtra al presionar Enter
formBuscador.addEventListener("submit", (e) => {
    e.preventDefault();
    filtrarCursos(inputBuscador.value);
});

function filtrarCursos(textoBusqueda) {
    const texto = textoBusqueda.toLowerCase();  // 🔥 convierte a minúsculas

    const cursos = document.querySelectorAll("#lista-cursos .card");

    cursos.forEach(curso => {
        const titulo = curso.querySelector("h4").textContent.toLowerCase(); // 🔥 evita errores
        if (titulo.includes(texto)) {
            curso.style.display = "block"; // mostrar
        } else {
            curso.style.display = "none"; // ocultar
        }
    });
}


