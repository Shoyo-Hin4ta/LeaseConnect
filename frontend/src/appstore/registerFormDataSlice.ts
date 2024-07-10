import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  age: string;
  gender: string ;
  phone: string;
}



const initialState: RegisterFormData = {
  name: '',
  email: '',
  password: '',
  age: '',
  gender: '',
  phone: '',
};

const registerFormDataSlice = createSlice({
  name: 'registerFormData',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<Partial<RegisterFormData>>) => {
      return { ...state, ...action.payload };
    },
    updateAddress: (state, action: PayloadAction<Partial<RegisterFormData>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updatePersonalInfo, updateAddress } = registerFormDataSlice.actions;
export default registerFormDataSlice.reducer;