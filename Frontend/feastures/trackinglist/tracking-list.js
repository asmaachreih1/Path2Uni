const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const token = localStorage.getItem("token"); // from login


async function loadTasks() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/tasks`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const tasks = await res.json(); // parse JSON from the response
        console.log("Fetched tasks:", tasks); // check what's coming in

        listContainer.innerHTML = '';
        tasks.forEach(task => renderTask(task));
    } catch (err) {
        console.error("Error loading tasks:", err);
    }
}



function renderTask(task) {
    const li = document.createElement("li");
    li.innerHTML = task.text;
    if (task.checked) li.classList.add("checked");
    li.dataset.id = task._id;

    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);
}

async function addTask() {
    const inputBox = document.getElementById("input-box");
    if (!inputBox.value.trim()) return alert("You must write something..");
  
    const token = localStorage.getItem("token");  // Get token from localStorage or wherever you store it
  
    const res = await fetch(`${API_BASE_URL}/api/tasks`, {  // Check your backend URL here
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Pass token in the Authorization header
      },
      body: JSON.stringify({ text: inputBox.value })
    });
  
    if (!res.ok) {
      console.error("Failed to add task:", await res.text());
      return;
    }
  
    const task = await res.json();  // Get the task response from the backend
    renderTask(task);  // Render the task on the UI (make sure you have this function defined)
    inputBox.value = "";  // Clear the input box after adding the task
  }
  

listContainer.addEventListener("click", async (e) => {
    const li = e.target.closest("li");
    const id = li.dataset.id;
    if (e.target.tagName === "LI") {
        await fetch(`${API_BASE_URL}/toggle/${id}`, {

            method: "PUT",
            headers: { 'Authorization': `Bearer ${token}` }
        });
        li.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        await fetch(`${API_

            method: "DELETE",
            headers: { 'Authorization': `Bearer ${token}` }
        });
        li.remove();
    }
});

document.addEventListener("DOMContentLoaded", loadTasks);

