import { projects } from "./projectArray.js";
import { projectsContainer, newProjectInput, newProjectForm } from "./domSelectors.js";

newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  newProjectSubmit();
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
  render();
}

function clearElement(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

export function render() {
  clearElement(projectsContainer); //remove all content in project list
  projects.forEach((project) => {
    const projectElement = document.createElement("li");
    projectElement.dataset.projectId = project.id;
    projectElement.classList.add("project-name");
    projectElement.innerText = project.title;
    projectsContainer.appendChild(projectElement);
  });
}
