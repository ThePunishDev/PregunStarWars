let index_pregunta = 0;
let puntaje = 0;

cargarPregunta(index_pregunta);  

function cargarPregunta(index) {
  objetoPregunta = baseDePreguntas[index];

  opciones = [...objetoPregunta.incorrectas];
  opciones.push(objetoPregunta.respuesta);
  for (let i = 0; i < 4; i++) {
    opciones.sort(() => Math.random() - 0.5);
  }

  document.getElementById("pregunta").innerHTML = objetoPregunta.pregunta;  

  document.getElementById("opcion-1").innerHTML = opciones[0];
  document.getElementById("opcion-2").innerHTML = opciones[1];
  document.getElementById("opcion-3").innerHTML = opciones[2];
  document.getElementById("opcion-4").innerHTML = opciones[3];  
} 

async function seleccionarOpcion(index) {
  
  let validezRespuesta = opciones[index] == objetoPregunta.respuesta;
  if (validezRespuesta) {
    await Swal.fire({
      title: "Respuesta correcta",
      text: "La respuesta ha sido correcta",
      icon: "success",
    });
    puntaje++;
  } else {
    await Swal.fire({
      title: "Respuesta Incorrecta",
      html: `La respuesta correcta es ${objetoPregunta.respuesta}`,
      icon: "error",
    });
  }
  index_pregunta++;
  if (index_pregunta >= baseDePreguntas.length) {
    await Swal.fire({
      title: "Juego terminado",
      text: `Tu puntaje fue: ${puntaje}/${baseDePreguntas.length}`,
    });
    index_pregunta = 0;
    puntaje = 0;
  }
  cargarPregunta(index_pregunta);
}


/*** DARK MODE ***/

const botonColorMode = document.querySelector('#colorMode');
const body = document.body;

let = darkMode = localStorage.getItem('dark-mode');

function activarDarkMode() {
  body.classList.add('dark-mode');
  localStorage.setItem('dark-mode', 'activado');
}

function desactivarDarkMode() {
  body.classList.remove('dark-mode');
  localStorage.setItem('dark-mode', 'desactivado');
}

/*operador ternario*/ 
darkMode === 'activado' ? activarDarkMode() : desactivarDarkMode()

botonColorMode.addEventListener('click', () => {
  darkMode = localStorage.getItem('dark-mode');

  darkMode === 'activado' ? desactivarDarkMode() : activarDarkMode()
})

/*** API DATA ***/

//const input = document.querySelector('input');
const boton = document.getElementById('todos');
const lista = document.getElementById('lista');

boton.onclick = () => {

  fetch('/info.json')
  .then(res => res.json())
  .then((respuesta) => {    
    const personajes = respuesta
    personajes.forEach(personaje => {

      const li = document.createElement('li')
      li.innerHTML = `

      <h3 class="personaje">${personaje.name}</h3>
      <img class"cards" src=${personaje.image}>
      <p class="descripcion">${personaje.gender} ${personaje.homeworld}</p>   
      
      `
      lista.append(li)
      
    });

  })

  .catch((error) => console.log(error))
}