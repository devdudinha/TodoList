let taskCounter = 0;
let completedCounter = 0;

const form = document.querySelector("#task-form");
const input = form.querySelector("input");
const submitButton = form.querySelector("#submit-btn");
const taskList = document.querySelector("#task-list-container");
const createdTaskQuantity = document.querySelector("#created-tasks-quantity");
const completedTaskQuantity = document.querySelector("#completed-tasks-quantity");
const noTasks = document.querySelector("#no-tasks");

function handleSubmit(event) {
  event.preventDefault();

  const taskValue = input.value.trim();
  if (taskValue === "") return;

  taskCounter++;
  createdTaskQuantity.textContent = taskCounter;
  if (taskCounter === 1) {
    taskList.removeChild(noTasks);
  }

  const taskItem = createTaskElement(taskValue);
  taskList.appendChild(taskItem);
  input.value = "";
}

function createTaskElement(taskValue) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-card");
  
  const taskCheck = document.createElement("button");
  taskCheck.classList.add("task-check");
  taskCheck.addEventListener("click", () => toggleTaskCompletion(taskItem));

  const taskDescription = document.createElement("span");
  taskDescription.classList.add("task-description");
  taskDescription.textContent = taskValue;

  const taskDelete = document.createElement("button");
  taskDelete.classList.add("delete-btn");
  taskDelete.addEventListener("click", () => deleteTask(taskItem));
  taskDelete.innerHTML = `<img src="assets/TrashRegular.svg" alt="Excluir tarefa" />`;

  taskItem.appendChild(taskCheck);
  taskItem.appendChild(taskDescription);
  taskItem.appendChild(taskDelete);

  return taskItem;
}

function toggleTaskCompletion(taskItem) {
  const taskDescription = taskItem.querySelector(".task-description");
  const taskCheck = taskItem.querySelector(".task-check");
  
  if (taskDescription.classList.contains("task-description-checked")) {
    taskDescription.classList.remove("task-description-checked");
    taskCheck.classList.remove("task-check-checked");
    completedCounter--;
  } else {
    taskDescription.classList.add("task-description-checked");
    taskCheck.classList.add("task-check-checked");
    completedCounter++;
  }

  completedTaskQuantity.textContent = completedCounter;
}

function deleteTask(taskItem) {
  const isTaskCompleted = taskItem.querySelector(".task-description").classList.contains("task-description-checked");

  if (isTaskCompleted) {
    completedCounter--; // Decrementa se a tarefa estava concluída
  }
  
  taskList.removeChild(taskItem);
  taskCounter--;
  createdTaskQuantity.textContent = taskCounter;

  if (taskCounter === 0) {
    taskList.appendChild(noTasks);
  }

  completedTaskQuantity.textContent = completedCounter; // Atualiza o contador de tarefas concluídas
}

form.addEventListener("submit", handleSubmit);
