import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { deleteProject } from "../actions/projects";
function Home(props) {
	const { projects, dispatch } = props;

	function handleDelete(e, projectId) {
		e.preventDefault();
		dispatch(deleteProject(projectId));
	}

	function handleEdit(e) {
		e.preventDefault();
	}
	return (
		<div>
			{projects.length === 0 && (
				<div>
					<p>You have not created any project yet. Lets create your first project.</p>
				</div>
			)}

			{projects.length > 0 && (
				<div>
					{projects.map((project) => {
						return (
							<div>
								<button onClick={(e) => handleDelete(e, project.id)}>Delete</button>
								<Link to={"edit/project/" + project.id}>Edit</Link>
								<p>{project.title}</p>
								<p>{project.description}</p>
								{project.images?.map((image) => {
									if (image.length === 0) return;
									return <img src={image} width={280} height={170} />;
								})}
							</div>
						);
					})}
				</div>
			)}

			<Link to="/add/project">
				<button>Create Project</button>
			</Link>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		projects: state.projects,
	};
}

export default connect(mapStateToProps)(Home);
