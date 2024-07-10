import { configureStore } from "@reduxjs/toolkit";
import stepperReducer from "./stepperSlice";
import themeReducer from "./themeSlice";
import registerFormDataReducer from "./registerFormDataSlice";
import userReducer from "./userSlice";


const store = configureStore({
    reducer : {
        stepper : stepperReducer,
        theme : themeReducer,
        registerFormData: registerFormDataReducer,
        user : userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;