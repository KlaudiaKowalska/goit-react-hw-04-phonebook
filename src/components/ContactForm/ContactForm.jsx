import React, { useState } from "react";
import PropTypes from "prop-types"; // Importowanie PropTypes
import { nanoid } from "nanoid";
import styles from "./ContactForm.module.scss";

const ContactForm = ({ contacts, addContact }) => {
  const [state, setState] = useState({
    name: "",
    number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      const filteredValue = value.replace(/[^\d+\-().\s]/g, "");
      setState((prevState) => ({ ...prevState, [name]: filteredValue }));
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const validatePhoneNumber = (number) => {
    const phoneNumberPattern =
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return phoneNumberPattern.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === state.name.toLowerCase(),
    );

    if (isDuplicate) {
      alert(`${state.name} is already in the contacts.`);
      return;
    }

    if (state.name.trim() === "" || state.number.trim() === "") {
      alert("Name and number cannot be empty.");
      return;
    }

    if (!validatePhoneNumber(state.number)) {
      alert("Invalid phone number format.");
      return;
    }

    const newContact = {
      id: nanoid(),
      name: state.name.trim(),
      number: state.number.trim(),
    };
    addContact(newContact);
    setState({ name: "", number: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p className={styles.paragraphForm}>Name</p>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Name"
        pattern="^[a-zA-Zа-яА-Я '-]+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <p className={styles.paragraphForm}>Number</p>
      <input
        type="tel"
        name="number"
        value={state.number}
        onChange={handleChange}
        inputMode="numeric"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        placeholder="Phone Number"
        required
      />
      <button type="submit" className={styles.buttonForm}>
        Add Contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
