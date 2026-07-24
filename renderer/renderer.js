let mytodoinput = document.getElementById("mytodo");
let mylist = document.getElementById("mylist");
// Get the element that displays the version
const versionTextEl =
  document.getElementById("vesiontext") ||
  document.getElementById("versionText");

// Fetch and display the app version from the preload API
window.versions.getVersion().then((ver) => {
  if (versionTextEl) {
    versionTextEl.innerText = `v ${ver}`;
  }
});

let todo = [];

document.getElementById("addtodoButton").addEventListener("click", addtodo);

function addtodo() {
  // save the todo in todo array list
  todo.push(mytodoinput.value.trim());
  mytodoinput.value = "";
  renderTodos();
}

function renderTodos() {
  mylist.innerHTML = "";

  todo.forEach((todos, i) => {
    const li = document.createElement("li");
    li.textContent = i + 1 + " " + todos;
    mylist.appendChild(li);
  });
}

renderTodos();
