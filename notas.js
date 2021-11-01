const formulario = document.getElementById('Formulario');
const LTareas = document.getElementById('LTareas');
const input = document.getElementById("input");
const template = document.getElementById('Template').content; //Accede a su contenido
const fragment = document.createDocumentFragment();
let tareas = {}; 


document.addEventListener('DOMContentLoaded', () =>{
    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    Ptareas()  //muestras las notas ya argadas
})


LTareas.addEventListener('click', (e) => {btnAccion(e)
})

formulario.addEventListener('submit', e => {
    e.preventDefault()  //buscar
    setTarea(e)
})

const setTarea = e => {
    const texto = e.target.querySelector('input').value

    if (texto.trim() === '') {
        console.log('Esta vacio')
        return
    }

  const tarea = {
      id: Date.now(), //genera un numero con la  fecha del dia
      texto: texto,
      estado: false
  }

   tareas[tarea.id] = tarea;
   Ptareas();

   formulario.reset();  //me borra el texto 
   input.focus();  //pone el foco en el texto
}

const Ptareas = () => {

    localStorage.setItem('tareas', JSON.stringify(tareas)) //para gurdar y no perder las tareas

    if (Object.values(tareas).length == 0) {
        LTareas.innerHTML = `<div class ="alert alert-dark text-center"> no hay tareas </div>`
        return
    }


    LTareas.innerHTML = '' //limpia para que se dupliquen las tareas
    Object.values(tareas).forEach(tarea => {  //recorro todo los elementos
        const clone = template.cloneNode(true) //clono todo lo que esta en el template
        clone.querySelector('p').textContent = tarea.texto

        if  (tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary') 
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('p').style.textDecoration = 'line-through' //tacha la palabra
        } //remplaza una clase por otra - aceptar por retry

        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone);    //almacena la cadena de elementos
    })
    LTareas.appendChild(fragment);
}

const btnAccion = e => {
    if (e.target.classList.contains('fa-check-circle')) {
        tareas[e.target.dataset.id].estado = true
        Ptareas()
    }

    if (e.target.classList.contains('fa-minus-circle')) {
       delete tareas[e.target.dataset.id]
       Ptareas()
    }

    //cambia el boton true - retry
    if (e.target.classList.contains('fa-undo-alt') ) {
        tareas[e.target.dataset.id].estado = false
        Ptareas()
    }
    
    e.stopPropagation()
}