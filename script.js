
const form = document.querySelector(".add_tasks");
const input = document.getElementById ("To_do_input");
const list = document.getElementById ("todo-list");

const editInput = document.getElementById("edition");
const editModal = document.getElementById("edit");

const deleteModal = document.getElementById("delete");

const saveBtn = document.getElementById("save");

const cancelEditBtn = document.getElementById("ed-cancel");
const confirmDeleteBtn = document.getElementById("Confirm");
const cancelDeleteBtn = document.getElementById("del-Cancel")

let curTask = null;

form.addEventListener("submit", addTask);

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
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    `;

    list.appendChild(li);

    attachEvents(li);

    input.value = "";
}


function attachEvents(li) {
    const checkbox = li.querySelector(".task-check");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");
    const taskSpan = li.querySelector("span");

    checkbox.addEventListener("change", () => { li.classList.toggle("completed", checkbox.checked); });
    
    editBtn.addEventListener("click", () => {
        curTask = taskSpan;
        editInput.value = taskSpan.textContent;
        editModal.classList.add("active");
    });

    deleteBtn.addEventListener("click", () => { 
        curTask = li;
        deleteModal.classList.add("active");
    });
}

saveBtn.addEventListener("click", () => {
    if (curTask && editInput.value.trim() !== "") {
        curTask.textContent = editInput.value.trim();
        editModal.classList.remove("active");
        curTask = null;
    }
});

cancelEditBtn.addEventListener("click", () => {
    editModal.classList.remove("active");
    curTask = null;
}); 

confirmDeleteBtn.addEventListener("click", () => {
    if (curTask) {
        curTask.remove();
        deleteModal.classList.remove("active");
        curTask = null;
    }
});

cancelDeleteBtn.addEventListener("click", () => {
    deleteModal.classList.remove("active");
    curTask = null;
});



