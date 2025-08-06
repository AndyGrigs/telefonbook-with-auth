
// src/pages/ContactsPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../components/ContactForm";
import SearchBox from "../components/SearchBox";
import ContactList from "../components/ContactList";
import { fetchContacts } from "../redux/contactsOps";
import { selectError, selectLoading } from "../redux/contactsSlice";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="max-w-md mx-auto px-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <ContactForm />
      <SearchBox />
      
      {isLoading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      <ContactList />
    </div>
  );
};

export default ContactsPage;
