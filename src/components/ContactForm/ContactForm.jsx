import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import { Form, Input, Text, Button } from './ContactForm.styled';
import { selectContacts } from '../../redux/selectors';
import { nanoid } from 'nanoid';

function ContactForm() {

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts)
  const [form, setForm] = useState({name: '', number: ''} );
const {name, number} = form;

  const handleChange = (e) => {
    const {name , value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }))};

    
      

 const  handleSubmit = (e) => {
    e.preventDefault();
   
    if (contacts.some((contact) => contact.name.toLowerCase() === form.name.toLowerCase())) {
      alert(`${form.name} already in contacts`);
      return;
    }
    const contact = {
      name,
      number,
id: nanoid()
    };
    dispatch(addContact(contact));
   setForm({name: '', number: ''})
  };



    return (
      <Form onSubmit={handleSubmit}>
        <Text>Name</Text>
        <Input
          type="text"
          name="name"
          required
          value={name}
          onChange={handleChange}
        />
  
        <Text>Number</Text>
        <Input
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleChange}
        />
  
        <Button type="submit">Add</Button>
      </Form>
    );
  };

 

export default ContactForm;
