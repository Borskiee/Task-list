let addTask = document.getElementById("add-text");
let addButton = document.querySelector(".add-button");
let taskList = document.getElementById("taskListJS");
let deleteButtons  = document.querySelectorall(".delete");

taskList.addEventListener("click", function(event) {
  let deleteBTN = event.target.closest(".delete");
if (deleteBTN) {let taskItem = deleteBTN.closest(".task-item");
  taskItem.remove();
}
});

addButton.onclick = function() {
inputText = addTask.value.trim();
if (inputText === "") {return;}

taskList.innerHTML += `<div class="task-item">
  <label class="task">
    <input type="checkbox" />
    <span class="checkmark"></span>
    <span class="text">${inputText}</span>
  </label>

  <div class="edit-delete-btn">
    <button class="edit">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
</div>`

};


