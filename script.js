// الثوابت الاساسية 
const form = document.querySelector(".add_tasks");
const input = document.getElementById ("To_do_input");
const list = document.getElementById ("todo-list");

// فنكشن بستلم النص وبمنع انه يكون فاضي وبنشئ مهمة ضمن القائمة 
function addTask(event) { 
    event.preventDefault();
    const taskText = input.value.trim();
    if (taskText === "") { return; }

    const li = document.createElement("li");
    li.textContent = taskText;

    li.innerHTML = `
    <span>${taskText}</span>
    <div class="task_btns">
        <input type="checkbox" class="task-check" />
        <button><i class="fa-solid fa-pen"></i></button>
        <button><i class="fa-solid fa-trash"></i></button>
    `;

    list.appendChild(li);
    input.value = "";
}

function attachEvents(li) {
    const checkbox = li.querySelector(".task-check");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");
    const taskSpan = li.querySelector("span");

    
}

form.addEventListener("submit", addTask);


