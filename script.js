//Model
let indexToEdit = -1
const todo_list = JSON.parse(localStorage.getItem("todo") || "[]");
render_todo()

// Creates TODO
function createTodo(name, date) {
const todo_actual = {
        name,
        date
    };
    todo_list.push(todo_actual);
    saveTodos();
};

// Deletes TODO
function removeTodo() {
document.querySelectorAll('.JS-delete-button').forEach((value, index) => {
        value.addEventListener('click', () => {
                todo_list.splice(index,1);
                saveTodos();
                render_todo();
                });
        });
};

function editTodo() {
document.querySelectorAll('.JS-edit-button').forEach((value, index) => {
        value.addEventListener('click', () => {
                if (indexToEdit===-1)
                {
                    indexToEdit = index
                }
                console.log(indexToEdit)
                saveTodos();
                render_todo();
                });
        });
};

function saveTodos() {
    localStorage.setItem('todo', JSON.stringify(todo_list));
  }

// View
function render_todo ()
{
    const message = document.querySelector('.JS-list')
    let html_todo = ' '
    
    todo_list.forEach((value, index) =>
    {
        let {name, date} = value;
        let new_date = new Date(date);
        let day = new_date.getDate();
        let month = new_date.getMonth()+1;
        if (month<10) {month = '0'+month};
        let year = new_date.getFullYear();
        let msg
        if (indexToEdit===index) {
            msg = `
            <p class="todo-message">
                <span class="index">${index+1}</span>
                <input class="JS-new-input-${indexToEdit} new-input" value="${name}"> 
                <input class="JS-new-date-${indexToEdit} date" value="${date}" type="date">
                <button class="JS-new-button update-button">update</button>
            </p>
        `;
        } else {
            msg = `
                <ol>
                    <li value=${index+1}>
                    <p class="todo-message">
                        <span class="todo-name">${name}</span>
                        <span class="time">${day}-${month}-${year}</span>
                        <button class="JS-delete-button delete-button">Delete</button>
                        <button class="JS-edit-button edit-button">edit</button>
                    </p>
                    </li>
                </ol>
        `;

        }
        html_todo += msg;
    })
    message.innerHTML = html_todo;
    removeTodo();
    updateTodo();
    editTodo();
}

// Control
function add_todo () 
{
    const todo = document.querySelector('.JS-input')
    const todo_date = document.querySelector('.JS-date')
    const name = todo.value
    const date = todo_date.value
    todo.value = ' ';
    createTodo(name, date)
    render_todo()
}

function updateTodo (){
    document.querySelectorAll('.JS-new-button').forEach((value) => {
        value.addEventListener('click', () => {
 
                const todo = document.querySelector(`.JS-new-input-${indexToEdit}`)
                const todo_date = document.querySelector(`.JS-new-date-${indexToEdit}`)
                let name = todo.value
                if (name === ''){
                    name = todo_list[indexToEdit].name
                }
                let date = todo_date.value
                if (date === ''){
                    date = todo_list[indexToEdit].date
                }
                todo.value = ' ';

                const new_actual = {
                    name,
                    date
                };
                todo_list.splice(indexToEdit,1, new_actual);
                indexToEdit=-1
                saveTodos();
                render_todo();
                });
        });
};
