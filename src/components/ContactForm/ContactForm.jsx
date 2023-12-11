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

      const contact = {
        name: name,
        number: number,
      };

      const isContactExist = contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      );

      if (isContactExist) {
        alert(`Contact with name ${contact.name} already exists!`);
        return;
      }

      const isNumberExist = contacts.find(
        ({ number }) =>
          contact.number.replace(/\D/g, '') === number.replace(/\D/g, '')
      );

      if (isNumberExist) {
        alert(`Number ${contact.number} is already in contacts!`);
        return;
      }

      dispatch(addContact(contact));
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
