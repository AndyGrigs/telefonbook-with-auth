import React from "react";
import { Phone, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/contactsSlice";

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
