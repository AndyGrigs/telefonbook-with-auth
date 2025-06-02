import { configureStore } from "@reduxjs/toolkit";
import {contactsReducer} from './contactsSlice';
import {filtersReducer} from './filterSlice';   
import { authReducer } from "./auth/authSlice";


export const store = configureStore({
  reducer:{
    auth: authReducer,
    contacts: contactsReducer,
    filters: filtersReducer,
  },
})
