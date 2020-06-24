import { projects, saveToLocalStorage, LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY } from "./localStorage.js";
import { projectsContainer, newProjectInput, newProjectForm, btnDeleteProject } from "./domSelectors.js";

export let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);

newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newProjectSubmit();
});

btnDeleteProject.addEventListener("click", (e) => {
  projects = projects.filter((project) => project.id !== selectedProjectId);
  selectedProjectId = null;
  saveAndRender();
  console.log("clicked");
});

projectsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedProjectId = e.target.dataset.projectId; //which id is selected
    saveAndRender();
  }
});

function createProject(projectName) {
  return { id: Date.now().toString(), title: projectName, tasks: [] };
}

function newProjectSubmit() {
  const projectName = newProjectInput.value;
  if (projectName == null || projectName === "") return; //check empty string
  const project = createProject(projectName);
  newProjectInput.value = null;
  projects.push(project);
  saveAndRender();
}

function clearElement(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

function saveAndRender() {
  saveToLocalStorage();
  render();
}

export function render() {
  clearElement(projectsContainer); //remove all content in project list
  projects.forEach((project) => {
    const projectElement = document.createElement("li");
    projectElement.dataset.projectId = project.id; //data-project-id=""
    projectElement.classList.add("project-name");
    projectElement.innerText = project.title;
    if (project.id == selectedProjectId) {
      projectElement.classList.add("active-project");
    }
    projectsContainer.appendChild(projectElement);
  });
}

//<li data-project-id="1593022393413" class="project-name">TEST</li>
