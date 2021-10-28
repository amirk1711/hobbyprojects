import {
	ADD_PROJECT,
	CLEAR_STATE,
	DELETE_PROJECT,
	EDIT_PROJECT,
	FETCH_PROJECT,
} from "./actionTypes";

export function addProject(project) {
	return {
		type: ADD_PROJECT,
		project,
	};
}
export function editProject(project) {
	return {
		type: EDIT_PROJECT,
		project,
	};
}
export function deleteProject(projectId) {
	return {
		type: DELETE_PROJECT,
		projectId,
	};
}
export function fetchProject(projectId) {
	return {
		type: FETCH_PROJECT,
		projectId,
	};
}
export function clearState() {
	return {
		type: CLEAR_STATE,
	};
}
