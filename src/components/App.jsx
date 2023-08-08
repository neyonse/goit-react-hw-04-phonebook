import { useState, useEffect } from 'react';
import { Section } from './Section';
import { AddContactForm } from './AddContactForm';
import { Filter } from './Filter';
import { ContactsList } from './ContactsList';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');
  const [localStorageInitialized, setLocalStorageInitialized] = useState(false);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    const contactsParsed = JSON.parse(storedContacts);

    if (contactsParsed !== null) {
      setContacts(contactsParsed);
    } else {
      setContacts(initialContacts);
    }

    if (!localStorageInitialized) {
      setLocalStorageInitialized(true);
    }
  }, [localStorageInitialized]);

  useEffect(() => {
    if (localStorageInitialized) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts, localStorageInitialized]);

  const handleAddContact = newContact => {
    const isAdded = isContactAlreadyAdded(newContact);

    if (isAdded !== -1) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const isContactAlreadyAdded = newContact => {
    const newContactLowerCase = newContact.name.toLowerCase();

    return contacts.findIndex(
      contact => contact.name.toLowerCase() === newContactLowerCase
    );
  };

  const handleFilterChange = filterWord => {
    setFilter(filterWord);
  };

  const getFilteredContacts = () => {
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <div className="main-wrapper">
      <Section className="addContactSection" title="Phonebook">
        <AddContactForm onAddContact={handleAddContact} />
      </Section>
      {contacts.length !== 0 && (
        <Section className="contactListSection" title="Contacts">
          <Filter value={filter} onFilterChange={handleFilterChange} />
          <ContactsList
            contacts={getFilteredContacts()}
            onDeleteContact={deleteContact}
          />
        </Section>
      )}
    </div>
  );
}
