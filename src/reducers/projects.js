import { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT, FETCH_PROJECT } from "../actions/actionTypes";

const initialProjectState = {
	projects: [],
	toEditProject: {},
};
export default function projects(state = initialProjectState, action) {
	switch (action.type) {
		case ADD_PROJECT:
			return {
				...state,
				projects: [action.project, ...state.projects],
			};
		case DELETE_PROJECT:
			const deleteProject = state.projects.filter(
				(project) => project.id !== action.projectId
			);
			return {
				...state,
				projects: deleteProject,
			};
		case EDIT_PROJECT:
			const editProject = state.projects.map((project) => {
				if (project.id == action.project.id) {
					return (project = action.project);
				}
				return project;
			});
			return {
				...state,
				projects: editProject,
			};
		case FETCH_PROJECT:
			let fetchProject;
			for (let i = 0; i < state.projects.length; i++) {
				if (action.projectId == state.projects[i].id) {
					fetchProject = state.projects[i];
					break;
				}
			}
			return {
				...state,
				toEditProject: fetchProject,
			};
		default:
			return state;
	}
}
