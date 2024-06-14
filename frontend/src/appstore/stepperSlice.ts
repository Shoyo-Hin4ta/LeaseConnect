import { createSlice } from "@reduxjs/toolkit";

export interface StateType{
    currentStep : number;
    isCompleted : boolean;
}

const initialState : StateType = { currentStep : 1, isCompleted : false};

const stepperSlice = createSlice({
    name: "trackStep",
    initialState,
    reducers : {
        next : (state) => {
            state.currentStep = state.currentStep+1
        },
        prev : (state) => {
            state.currentStep = state.currentStep-1
        },
        setIsComplete : (state) => {
            state.isCompleted = true
        }
    },
});

export const {next, prev, setIsComplete} = stepperSlice.actions;

export default stepperSlice.reducer;