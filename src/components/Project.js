import { Redirect } from "react-router-dom";

function Project(props) {
	const { project } = props;
	if (!project) {
		return <Redirect to="/" />;
	}
	return (
		<div className="view-project-container">
			<div className="left-view">
				<div className="view-project-title">
					<p>{project.title}</p>
				</div>
				<div className="view-project-desc">
					<p className="about">About this Project</p>
					<p className="full-desc">{project.description}</p>
				</div>
			</div>
			<div className="right-view">
				{project.images?.map((image, index) => {
					if (image.length === 0) return null;
					return (
						<img
							className="details-img"
							src={image}
							key={index}
							height={170}
							alt="project"
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Project;
