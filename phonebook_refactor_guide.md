# Schritt-für-Schritt Anleitung: Phonebook Refactoring

## Schritt 1: Backend Setup (mockapi.io)

1. Gehe zu [mockapi.io](https://mockapi.io)
2. Registriere dich mit deinem GitHub Account
3. Erstelle ein neues Projekt
4. Erstelle eine neue Resource namens "contacts" mit folgenden Feldern:
   - `id` (auto-generated)
   - `name` (string)
   - `number` (string)
5. Notiere dir die Base URL (z.B. `https://mockapi.io/api/v1/YOUR_PROJECT_ID`)

## Schritt 2: contactsOps.js erstellen

Erstelle die Datei `src/redux/contactsOps.js`:

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Ersetze diese URL mit deiner mockapi.io URL
const BASE_URL = 'https://mockapi.io/api/v1/YOUR_PROJECT_ID/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL, contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
```

## Schritt 3: contactsSlice.js überarbeiten

Ersetze den Inhalt von `src/redux/contactsSlice.js`:

```javascript
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';
import { selectNameFilter } from './filtersSlice';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
      // fetchContacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // addContact
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deleteContact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;

// Selektoren
export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

// Memoized Selector
export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
);
```

## Schritt 4: filtersSlice.js überarbeiten

Umbenennen und aktualisieren von `src/redux/filterSlice.js` zu `src/redux/filtersSlice.js`:

```javascript
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    name: '',
  },
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

export const selectNameFilter = (state) => state.filters.name;
```

## Schritt 5: store.js aktualisieren

Ersetze den Inhalt von `src/redux/store.js`:

```javascript
import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filtersReducer } from './filtersSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});
```

## Schritt 6: main.jsx aktualisieren

Ersetze den Inhalt von `src/main.jsx`:

```javascript
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

## Schritt 7: App.jsx aktualisieren

Ersetze den Inhalt von `src/App.jsx`:

```javascript
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ContactForm from "./components/ContactForm";
import SearchBox from "./components/SearchBox";
import ContactList from "./components/ContactList";
import { BookOpen } from "lucide-react";
import { fetchContacts } from "./redux/contactsOps";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Phonebook</h1>
        </div>

        <ContactForm />
        <SearchBox />
        <ContactList />
      </div>
    </div>
  );
}

export default App;
```

## Schritt 8: ContactList.jsx aktualisieren

Ersetze den Inhalt von `src/components/ContactList.jsx`:

```javascript
import { useSelector } from "react-redux";
import Contact from "./Contact";
import { UserRound } from "lucide-react";
import { selectFilteredContacts } from "../redux/contactsSlice";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  if (filteredContacts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="flex justify-center">
          <UserRound className="h-12 w-12 text-gray-300" />
        </div>
        <p className="mt-2 text-gray-500">No contacts found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {filteredContacts.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
```

## Schritt 9: Contact.jsx aktualisieren

Ersetze den Inhalt von `src/components/Contact.jsx`:

```javascript
import React from "react";
import { Phone, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/contactsOps";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <li className="p-4 border-b border-gray-200 last:border-b-0 group hover:bg-gray-50 transition-colors duration-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-700 font-semibold text-lg">
              {contact.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-900">
              {contact.name}
            </h3>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Phone className="h-3.5 w-3.5 mr-1.5" />
              {contact.number}
            </div>
          </div>
        </div>
        <button
          onClick={() => dispatch(deleteContact(contact.id))}
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label={`Delete ${contact.name}`}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
};

export default Contact;
```

## Schritt 10: ContactForm.jsx aktualisieren

Ersetze den Inhalt von `src/components/ContactForm.jsx`:

```javascript
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/contactsOps";
import { selectContacts } from "../redux/contactsSlice";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .min(3, "Number must be at least 3 characters")
    .max(50, "Number must be less than 50 characters")
    .required("Number is required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Contact</h2>
      <Formik
        initialValues={{ name: "", number: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const isExisting = contacts.some(
            (contact) =>
              contact.name.toLowerCase() === values.name.toLowerCase()
          );

          if (isExisting) {
            alert(`${values.name} is already in contacts.`);
            return;
          }

          const newContact = {
            name: values.name.trim(),
            number: values.number.trim(),
          };

          dispatch(addContact(newContact));
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Number
              </label>
              <Field
                id="number"
                name="number"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter phone number"
              />
              <ErrorMessage
                name="number"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Add Contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
```

## Schritt 11: SearchBox.jsx aktualisieren

Ersetze den Inhalt von `src/components/SearchBox.jsx`:

```javascript
import React from "react";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={filter}
          onChange={(e) => dispatch(changeFilter(e.target.value))}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search contacts by name..."
        />
      </div>
    </div>
  );
};

export default SearchBox;
```

## Schritt 12: Axios installieren

Führe folgenden Befehl in deinem Terminal aus:

```bash
npm install axios
```

## Schritt 13: Dateien löschen

Lösche die alte Datei:
- `src/redux/filterSlice.js` (wurde zu `filtersSlice.js` umbenannt)

## Wichtige Punkte:

1. **Base URL**: Vergiss nicht, die `BASE_URL` in `contactsOps.js` mit deiner echten mockapi.io URL zu ersetzen
2. **Dateiumbenennung**: `filterSlice.js` → `filtersSlice.js`
3. **Redux Persist entfernt**: Keine lokale Speicherung mehr
4. **Backend Integration**: Alle CRUD-Operationen funktionieren jetzt mit dem Backend
5. **Memoized Selector**: Optimiert die Performance beim Filtern
6. **Loading States**: Hinzugefügt für bessere UX

Nach diesen Änderungen sollte deine Anwendung alle Anforderungen aus der Checkliste erfüllen!