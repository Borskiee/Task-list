let addText = document.getElementById("add-text");
let addButton = document.querySelector(".add-button");
let taskList = document.getElementById("taskListJS");

// Add new task
addButton.onclick = function () {
  if (addText.value === "") return;

  taskList.innerHTML += `<div class="task-item">
    <div class="task">
      <label>
        <input type="checkbox" />
        <span class="checkmark"></span>
      </label>
      <span class="text">${addText.value}</span>
    </div>
    <div class="edit-delete-btn">
      <button class="edit"><i class="fa fa-pen"></i></button>
      <button class="delete"><i class="fa fa-trash"></i></button>
    </div>
  </div>`;

  addText.value = "";
  updateAndSaveHTML();
};

// Handle delete, checkbox, and edit
taskList.addEventListener("click", function (event) {
  let deletebtn = event.target.closest(".delete");
  if (deletebtn) {
    let task = deletebtn.closest(".task-item");
    task.remove();
    updateAndSaveHTML();
updateAndSaveHTML();
    return;
  }

  let editbtn = event.target.closest(".edit");
if (editbtn) {
  let taskItem = editbtn.closest(".task-item");
  let checkbox = taskItem.querySelector('input[type="checkbox"]');

  // Prevent editing if checkbox is checked
  if (checkbox.checked) {
    return;
  }

  let isEditing = editbtn.classList.contains("editing");

  if (!isEditing) {
    let taskText = taskItem.querySelector(".text");
    taskText.outerHTML = `<input type="text" class="inputText" value="${taskText.textContent}">`;

    let input = taskItem.querySelector(".inputText");
    input.focus();

    let icon = editbtn.querySelector("i");
    icon.classList.remove("fa-pen");
    icon.classList.add("fa-check");
    editbtn.classList.add("editing");

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        saveEdit(taskItem, editbtn);
      }
    });
  } else {
    saveEdit(taskItem, editbtn);
  }
  return;
}



  let checkbox = event.target.closest('input[type="checkbox"]');
  if (checkbox) {
    let taskItem = checkbox.closest(".task-item");
    let text = taskItem.querySelector(".text");

    // Toggle "completed" class
    if (checkbox.checked) {
      text.classList.add("completed");
    } else {
      text.classList.remove("completed");
    }

    // Save updated list
    updateAndSaveHTML();

  }
});


// Save edit input
function saveEdit(taskItem, editbtn) {
  let input = taskItem.querySelector(".inputText");
  if (!input) return;

  input.outerHTML = `<span class="text">${input.value}</span>`;

  let icon = editbtn.querySelector("i");
  icon.classList.remove("fa-check");
  icon.classList.add("fa-pen");
  editbtn.classList.remove("editing");

  updateAndSaveHTML();
}

// Load from localStorage
let saved = localStorage.getItem("taskList");
if (saved) {
  taskList.innerHTML = saved;

  // After setting innerHTML, reapply completed class to checked tasks
  document.querySelectorAll('#taskListJS input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.checked) {
      const text = checkbox.closest(".task-item").querySelector(".text");
      text.classList.add("completed");
    }
  });
}

function updateAndSaveHTML() {
  document.querySelectorAll('#taskListJS input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.checked) {
      checkbox.setAttribute("checked", "true");
    } else {
      checkbox.removeAttribute("checked");
    }
  });

  localStorage.setItem("taskList", taskList.innerHTML);
}

