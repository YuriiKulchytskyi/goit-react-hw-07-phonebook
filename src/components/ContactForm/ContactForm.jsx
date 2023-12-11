import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import { Form, Input, Text, Button } from './ContactForm.styled';
import { selectContacts } from '../../redux/selectors';

function ContactForm() {

    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = event => {
      event.preventDefault();
  
      const trimmedName = name.trim();
      const trimmedNumber = number.trim();
  
      if (trimmedName === '' || trimmedNumber === '') {
        return;
      }
  
      const contactExists = contacts.some(
        contact =>
          contact.name === trimmedName || contact.number === trimmedNumber
      );
  
      if (contactExists) {
        alert('This contact already exists.');
        return;
      }
  
      dispatch(addContact(trimmedName, trimmedNumber));
      setName('');
      setNumber('');
    };

    const handleNameChange = event => {
      setName(event.target.value);
    };

    const handleNumberChange = event => {
      setNumber(event.target.value);
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Text>Name</Text>
        <Input
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
        />
  
        <Text>Number</Text>
        <Input
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleNumberChange}
        />
  
        <Button type="submit">Add</Button>
      </Form>
    );
  };

 

export default ContactForm;
