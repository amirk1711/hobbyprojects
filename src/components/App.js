import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import AddProject from "./AddProject";
import Home from "./Home";
import Project from "./Project";
import { fetchProject } from "../actions/projects";

function App(props) {
	const { toEditProject, dispatch } = props;
	function handleFetch(id) {
		dispatch(fetchProject(id));
	}

	return (
		<Router>
			<Switch>
				<Route
					exact
					path="/"
					render={(props) => {
						return <Home {...props} />;
					}}
				/>
				<Route exact path="/project/:id" component={Project} />
				<Route exact path="/add/project" component={AddProject} />
				<Route
					exact
					path="/edit/project/:id"
					render={(props) => {
						handleFetch(props.match.params.id);
						return (
							<AddProject {...props} editMode={true} toEditProject={toEditProject} />
						);
					}}
				/>
			</Switch>
		</Router>
	);
}

function mapStateToProps(state) {
	return {
		toEditProject: state.toEditProject,
	};
}

export default connect(mapStateToProps)(App);
