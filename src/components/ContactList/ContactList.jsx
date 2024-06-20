import React from "react";
import ContactListItem from "../ContactListItem/ContactListItem";
import PropTypes from "prop-types";
const ContactList = ({ contacts, filter, removeContact }) => {
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <ul>
      {filteredContacts.map((contact) => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          removeContact={removeContact}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      // Tutaj możesz dodać dodatkowe PropTypes dla innych pól kontaktu
    }),
  ).isRequired,
  filter: PropTypes.string.isRequired,
  removeContact: PropTypes.func.isRequired,
};

export default ContactList;
