import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/index";

export const makeStore = () => createStore(rootReducer);

export const wrapper = createWrapper(makeStore);
