const planner = document.getElementById("planner");
const toast = document.getElementById("toast");

const hours = [
  "8 AM", "9 AM", "10 AM", "11 AM", "12 PM",
  "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"
];

// Simulate file in localStorage
const FILE_NAME = "daily_plan_file";

// Load saved tasks
function loadTasks() {
  return JSON.parse(localStorage.getItem(FILE_NAME)) || {};
}

// Save task
function saveTask(hour, task) {
  const tasks = loadTasks();
  tasks[hour] = task;
  localStorage.setItem(FILE_NAME, JSON.stringify(tasks));
  showToast("✅ Task saved at " + hour);
}

// Show toast
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// 🌙 Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});


// Create planner
function createPlanner() {
  const savedTasks = loadTasks();

  hours.forEach(hour => {
    const block = document.createElement("div");
    block.className = "time-block";

    const hourDiv = document.createElement("div");
    hourDiv.className = "hour";
    hourDiv.textContent = hour;

    const input = document.createElement("input");
    input.className = "task";
    input.type = "text";
    input.placeholder = "Add a task...";
    input.value = savedTasks[hour] || "";

    const saveBtn = document.createElement("button");
    saveBtn.className = "saveBtn";
    saveBtn.textContent = "Save";

    saveBtn.addEventListener("click", () => {
      saveTask(hour, input.value);
      saveBtn.textContent = "Saved!";
      setTimeout(() => (saveBtn.textContent = "Save"), 1000);
      setTimeout(() => (input.value = ""), 500);
    });

    block.appendChild(hourDiv);
    block.appendChild(input);
    block.appendChild(saveBtn);
    planner.appendChild(block);
  });
}

createPlanner();
