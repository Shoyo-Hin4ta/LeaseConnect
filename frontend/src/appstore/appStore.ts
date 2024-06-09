import { configureStore } from "@reduxjs/toolkit";
import stepperReducer from "./stepperSlice";


const store = configureStore({
    reducer : {
        stepper : stepperReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;