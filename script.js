
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

const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");

let deleteAction = null;

let curTask = null;

const filterAllBtn = document.getElementById("filter-all");
const filterDoneBtn = document.getElementById("filter-done");
const filterTodoBtn = document.getElementById("filter-todo");

filterAllBtn.addEventListener("click", () => {
    document.querySelectorAll("#todo-list li").forEach(li => {
        li.style.display = "flex";
    });
});

filterDoneBtn.addEventListener("click", () => {
    document.querySelectorAll("#todo-list li").forEach(li => {
        li.style.display = li.classList.contains("completed")
            ? "flex"
            : "none";
    });
});

filterTodoBtn.addEventListener("click", () => {
    document.querySelectorAll("#todo-list li").forEach(li => {
        li.style.display = li.classList.contains("completed")
            ? "none"
            : "flex";
    });
});


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
    saveTasks();
}


function attachEvents(li) {
    const checkbox = li.querySelector(".task-check");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");
    const taskSpan = li.querySelector("span");

    checkbox.addEventListener("change", () => { li.classList.toggle("completed", checkbox.checked); saveTasks();});
    
    editBtn.addEventListener("click", () => {
        curTask = taskSpan;
        editInput.value = taskSpan.textContent;
        editModal.classList.add("active");
    });

    deleteBtn.addEventListener("click", () => {
    modalTitle.textContent = "Delete Task";
    modalMessage.textContent = "Are you sure you want to delete this task?";

    deleteAction = () => { li.remove(); };

    deleteModal.classList.add("active");
    });

}

saveBtn.addEventListener("click", () => {
    if (curTask && editInput.value.trim() !== "") {
        curTask.textContent = editInput.value.trim();
        editModal.classList.remove("active");
        curTask = null;
        saveTasks();
    }
});

cancelEditBtn.addEventListener("click", () => {
    editModal.classList.remove("active");
    curTask = null;
}); 

confirmDeleteBtn.addEventListener("click", () => {
   /* if (curTask) {
        curTask.remove();
        deleteModal.classList.remove("active");
        curTask = null;
    }*/
   if (typeof deleteAction === "function") {
        deleteAction();
        deleteAction = null;
        saveTasks();
    }
    deleteModal.classList.remove("active");
});

cancelDeleteBtn.addEventListener("click", () => {
    deleteModal.classList.remove("active");
    curTask = null;
});

document.getElementById("delete-all-tasks").addEventListener("click", () => {
    modalTitle.textContent = "Delete All Tasks";
    modalMessage.textContent = "Are you sure you want to delete all tasks?";

    deleteAction = () => {
        document.querySelectorAll("#todo-list li")
            .forEach(li => li.remove());
    };

    deleteModal.classList.add("active");
});


document.getElementById("delete-done-tasks").addEventListener("click", () => {
    modalTitle.textContent = "Delete Done Tasks";
    modalMessage.textContent = "Are you sure you want to delete done tasks?";

    deleteAction = () => {
        document.querySelectorAll("#todo-list li.completed")
            .forEach(li => li.remove());
    };

    deleteModal.classList.add("active");
});


function saveTasks() {
    const tasks = [];

    document.querySelectorAll("#todo-list li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}







