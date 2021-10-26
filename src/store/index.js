import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducer from "../reducers/index";

export function configureStore() {
	// create redux store which will have reducers and middlewares
	return createStore(reducer, applyMiddleware(thunk, logger));
}
