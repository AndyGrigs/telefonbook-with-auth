import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import {contactsReducer} from './contactsSlice'; // <-- Add this line
import {filtersReducer} from './filterSlice';   // <-- Add this line

const contactsStore = {
    key: 'contacts',
    storage,
    whitelist: ['items']
}

const persistedContactsReducer = persistReducer(contactsStore, contactsReducer);

export const store = configureStore({
  reducer: {
    contacts: persistedContactsReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);