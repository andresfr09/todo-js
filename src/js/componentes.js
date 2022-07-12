import { Todo } from '../classes';
import '../css/componentes.css';
import { todoList } from '../index';
// import webpacklogo from '../assets/img/webpack-logo.png';


/* export const saludar = ( nombre = 'sin nombre' ) => {
    console.log('Creando etiqueta h1');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola ${ nombre }`;

    document.body.append( h1 );

    
    // Img
    // const img = document.createElement('img');
    // img.src = webpacklogo;
    // document.body.append( img );
} */

//Referencias al html
const divTodoList = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo');
const borrarCompletados = document.querySelector('.clear-completed');
const filtros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) =>{
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed':''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked':''}  >
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div;
}

//Eventos
txtInput.addEventListener('keyup',(e)=>{
    if(e.keyCode === 13 && txtInput.value.length >0){
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo)
        txtInput.value ='';
    }
});

divTodoList.addEventListener('click',(e)=>{
    const nombreElemento = (e.target.localName)
    const todoElemento = e.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id')
    if(nombreElemento.includes('input')){ //Click en el check
        todoList.marcarCompletado(todoId)
        //todoElemento.classList.contains('completed') ? todoElemento.classList.remove('completed') :  todoElemento.classList.add('completed')
        todoElemento.classList.toggle('completed') ;
    }
    if(nombreElemento.includes('button')){ //Click en el button
        todoList.eliminarTodo(todoId)
        divTodoList.removeChild(todoElemento)

    }
})


borrarCompletados.addEventListener('click',(e)=>{
    console.log('CLick')
    console.log(e)
    todoList.eliminarCompletados();
    console.log(divTodoList.children.length)

    for (let i=divTodoList.children.length-1;i>=0;i--){
        const elemento = divTodoList.children[i];
        console.log(elemento)
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
})

filtros.addEventListener('click',(e)=>{
    const text = (e.target.text);
    if(!text) return;

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    e.target.classList.add('selected');
    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (text) {
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden')
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden')
                }
            default:
                break;
        }
    }
})




