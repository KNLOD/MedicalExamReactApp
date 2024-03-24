import { combineReducers } from "redux";
import { examination } from "./examination";
import { patient } from "./patient";

export const reducers = combineReducers({
    examination, patient
})