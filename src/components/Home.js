import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearState, deleteProject } from "../actions/projects";
function Home(props) {
	let { projects, dispatch } = props;

	useEffect(() => {
		dispatch(clearState());
	}, [dispatch]);

	function handleDelete(e, projectId) {
		e.preventDefault();
		dispatch(deleteProject(projectId));
	}

	let thumbnail = [];
	if (projects.length > 0) {
		for (let i = 0; i < projects.length; i++) {
			for (let j = 0; j < 3; j++) {
				if (projects[i] && projects[i].images[j].length > 0) {
					thumbnail.push(projects[i].images[j]);
					break;
				}
			}
		}
	}

	return (
		<div className="home">
			{projects.length === 0 && (
				<div className="empty-project-container">
					<p>Looks like you don't have any projects. Lets create your first project.</p>
				</div>
			)}

			{projects.length > 0 && (
				<div className="projects-container">
					{projects.map((project, index) => {
						return (
							<div className="project-item-card" key={index}>
								<div className="editndelete">
									<Link to={"edit/project/" + project.id} className="edit-link">
										Edit
									</Link>
									<button
										className="delete-btn"
										onClick={(e) => handleDelete(e, project.id)}
									>
										<img
											src="https://cdn-icons.flaticon.com/png/512/4441/premium/4441955.png?token=exp=1635382424~hmac=5e567d973983212f618e85d489c90567"
											width={32}
											height={32}
											alt="delete"
										/>
									</button>
								</div>
								<Link to={"/project/" + project.id} className="view-link">
									<div className="thumbnail-container">
										<img
											className="thumbnail"
											src={thumbnail[index]}
											height={190}
											alt="project"
										/>
									</div>

									<div className="project-details">
										<p className="title">{project.title}</p>
										<p className="description">
											{project.description.substring(0, 150)}
											{project.description.length > 150 && <span>...</span>}
										</p>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			)}

			<Link to="/add/project" className="create-link">
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
