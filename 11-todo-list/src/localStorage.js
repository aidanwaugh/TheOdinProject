import { selectedProjectId } from "./eventHandlers.js";

const LOCAL_STORAGE_PROJECT_KEY = "odin.projects";
export const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = "odin.selectedProjectId";

export let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
// export let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);

export function saveToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
  //remember which project is selected
  localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId);
}
