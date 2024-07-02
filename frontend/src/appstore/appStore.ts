import { configureStore } from "@reduxjs/toolkit";
import stepperReducer from "./stepperSlice";
import themeReducer from "./themeSlice";


const store = configureStore({
    reducer : {
        stepper : stepperReducer,
        theme : themeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;