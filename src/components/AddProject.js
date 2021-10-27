import { useState } from "react";
import { connect } from "react-redux";
import { addProject, editProject, fetchProject } from "../actions/projects";
import { Redirect } from "react-router-dom";

function AddProject(props) {
	const { projects, dispatch, editMode, toEditProject } = props;
	let editProjectId;
	if (editMode) {
		editProjectId = props.match.params.id;
	}

	const [title, setTitle] = useState(toEditProject !== {} ? toEditProject.title : "");
	const [description, setDescription] = useState(
		toEditProject !== {} ? toEditProject.description : ""
	);
	const [image1, setImage1] = useState(
		toEditProject !== {} ? (toEditProject.images ? toEditProject.images[0] : "") : ""
	);
	const [image2, setImage2] = useState(
		toEditProject !== {} ? (toEditProject.images ? toEditProject.images[1] : "") : ""
	);
	const [image3, setImage3] = useState(
		toEditProject !== {} ? (toEditProject.images ? toEditProject.images[2] : "") : ""
	);
	const [isFormCompleted, setIsFormCompleted] = useState(false);

	function handleCreate(e, isEditing) {
		e.preventDefault();
		if (title.length === 0) {
			alert("You cannot create project with empty title.");
			return;
		}
		if (description.length < 150) {
			alert("Project description should be minimum of 150 characters.");
			return;
		}
		let imgArray;
		if (image1.length === 0 && image2.length === 0 && image3.length === 0) {
			imgArray = [
				"https://analyticsindiamag.com/wp-content/uploads/2020/01/top-10-DS-projects.png",
				image2,
				image3,
			];
		} else {
			imgArray = [image1, image2, image3];
		}
		let project = {
			id: projects.length + 1,
			title,
			description,
			images: imgArray,
		};
        if(isEditing){
            project.id = editProjectId;
            dispatch(editProject(project));
        }else{
            dispatch(addProject(project));
        }
		setIsFormCompleted(true);
	}

	return (
		<div className="add-project-form">
			{isFormCompleted && <Redirect to="/" />}
			{editMode === true ? <p>Edit your project</p> : <p>Create a project</p>}
			<form>
				<div>
					<label htmlFor="title">
						Project Title:<span className="red-asterisk">*</span>{" "}
					</label>
					{editMode === true ? (
						<input
							type="text"
							id="title"
							name="title"
							value={title}
							onChange={(e) => {
								// value = e.target.value;
								setTitle(e.target.value);
							}}
							required
						/>
					) : (
						<input
							type="text"
							id="title"
							name="title"
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					)}
				</div>
				<div>
					<label htmlFor="description">
						Project Description:<span className="red-asterisk">*</span>{" "}
					</label>
					{editMode === true ? (
						<input
							type="text"
							id="description"
							name="description"
							value={description}
							placeholder="Minimum 150 characters"
							onChange={(e) => setDescription(e.target.value)}
						/>
					) : (
						<input
							type="text"
							id="description"
							name="description"
							placeholder="Minimum 150 characters"
							onChange={(e) => setDescription(e.target.value)}
						/>
					)}
				</div>
				<div>
					<label htmlFor="images1">Project Image URL1: </label>
					{editMode === true ? (
						<input
							type="url"
							id="images1"
							name="images1"
							value={image1}
							onChange={(e) => setImage1(e.target.value)}
						/>
					) : (
						<input
							type="url"
							id="images1"
							name="images1"
							onChange={(e) => setImage1(e.target.value)}
						/>
					)}
				</div>
				<div>
					<label htmlFor="images2">Project Image URL2: </label>
					{editMode === true ? (
						<input
							type="url"
							id="images2"
							name="images2"
							value={image2}
							onChange={(e) => setImage2(e.target.value)}
						/>
					) : (
						<input
							type="url"
							id="images2"
							name="images2"
							onChange={(e) => setImage2(e.target.value)}
						/>
					)}
				</div>
				<div>
					<label htmlFor="images3">Project Image URL3: </label>
					{editMode === true ? (
						<input
							type="url"
							id="images3"
							name="images3"
							value={image3}
							onChange={(e) => setImage3(e.target.value)}
						/>
					) : (
						<input
							type="url"
							id="images3"
							name="images3"
							onChange={(e) => setImage3(e.target.value)}
						/>
					)}
				</div>

				<div>
					{editMode === true ? (
						<button type="submit" onClick={(e) => handleCreate(e, true)}>
							Save
						</button>
					) : (
						<button type="submit" onClick={(e) => handleCreate(e, false)}>
							Create
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		projects: state.projects,
		toEditProject: state.toEditProject,
	};
}
export default connect(mapStateToProps)(AddProject);
