/* import { TodoList } from './classes/todo-list.class';
import { Todo } from './classes/todo.class'; */
import { Todo, TodoList } from './classes/';
import { crearTodoHtml } from './js/componentes';
import './styles.css';



export const todoList = new TodoList();

/* const newTodo = new Todo('Aprender JS');
todoList.nuevoTodo(newTodo) */

todoList.todos.forEach(crearTodoHtml);
console.log(todoList)
/* const tarea = new Todo('Aprender JS');
tarea.completado = true;

todoList.nuevoTodo(tarea);
console.log(todoList) 

crearTodoHtml(tarea); */

