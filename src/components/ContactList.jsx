
import { useSelector} from "react-redux";
import Contact from "./Contact";
import { UserRound } from "lucide-react";
import { selectContacts } from "../redux/contactsSlice";
import { selectFilter } from '../redux/filterSlice';


const ContactList = () => {
 
  const filter = useSelector(selectFilter);

  const contacts = useSelector(selectContacts);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
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
