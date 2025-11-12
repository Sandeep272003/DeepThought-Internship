const profiles = [
  { name: "Sandeep Pittala", role: "Frontend Developer", image: "https://via.placeholder.com/60" },
  { name: "DeepTech Mentor", role: "Tech Lead", image: "https://via.placeholder.com/60" }
];

const tasks = [
  { title: "Task 1: Webpage Creation", desc: "Create the webpage based on the given Figma design using HTML and CSS." },
  { title: "Task 2: Dynamic Elements", desc: "Use JSON objects to render content dynamically and implement functionality as described." }
];

function renderProfiles() {
  const container = document.getElementById("profile-container");
  profiles.forEach(profile => {
    const div = document.createElement("div");
    div.className = "profile-card";
    div.innerHTML = `<img src="${profile.image}" alt="${profile.name}">
      <div><h3>${profile.name}</h3><p>${profile.role}</p></div>`;
    container.appendChild(div);
  });
}

function renderTasks() {
  const container = document.getElementById("task-details");
  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-box";
    div.innerHTML = `<h3>${task.title}</h3><p>${task.desc}</p>`;
    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProfiles();
  renderTasks();
});