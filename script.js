let tasks = [
  { id: 1, title: "Petite Paix-Dieux avec les copains", completed: false },
  { id: 2, title: "Aller au parc d'attractions", completed: false },
  { id: 3, title: "Regarder un film", completed: true },
  { id: 4, title: "Faire un pique-nique", completed: false },
  { id: 5, title: "Peindre un tableau", completed: true },
  { id: 6, title: "Faire une nuit blanche jeux de société", completed: false },
  { id: 7, title: "Construire un château de sable", completed: false },
];

let currentFilter = "all";

function toggleTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

function createTaskHTML(task) {
  return `
          <tr class="${task.completed ? "completed" : ""}">
              <td>${task.id}</td>
              <td>${task.title}</td>
              <td class="status-cell">
                  <label class="checkbox-label">
                      <input 
                          type="checkbox" 
                          ${task.completed ? "checked" : ""} 
                          onchange="toggleTask(${task.id})"
                      >
                      ${task.completed ? "terminée" : "en cours"}
                  </label>
              </td>
          </tr>
      `;
}

function renderTasks() {
  const container = document.getElementById("tasks-container");
  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "uncompleted") return !task.completed;
    return true;
  });

  container.innerHTML = filteredTasks
    .map((task) => createTaskHTML(task))
    .join("");
}

async function loadTasksFromApi() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?userId=1"
      //   "https://jsonplaceholder.typicode.com/todos"
    );
    const data = await response.json();
    tasks = data;
    renderTasks();
  } catch (error) {
    console.error("Erreur lors du chargement des tâches:", error);
  }
}

renderTasks();

loadTasksFromApi();
