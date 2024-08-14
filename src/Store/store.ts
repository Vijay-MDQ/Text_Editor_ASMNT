// src/store.ts
import { createStore, combineReducers } from "redux";
import textReducer from "./reducer";

const rootReducer = combineReducers({
  text: textReducer,
});

const store = createStore(rootReducer);

export default store;
