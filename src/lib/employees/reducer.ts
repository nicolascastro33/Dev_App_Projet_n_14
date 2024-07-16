import { combineReducers } from "@reduxjs/toolkit";
import { employeeSlice } from "./slices/employee-info";

export const reducer = combineReducers({
    info: employeeSlice.reducer
})