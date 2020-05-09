import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const UserModalForm = ({data, type}) => {
  console.log(data);
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: ""
  })

  const handleFormChange = (e) => {
    setForm({...form,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmitNewUser = (event) => {
    event.preventDefault()
    if (type==="create") {
      axios.post('http://localhost:3050/api/users', form)
      .then((response) => console.log(response))
    } else {
      axios.put(`http://localhost:3050/api/users/${data._id}`, form)
      .then((response) => console.log(response))
    }
  }

  return (
    <Form onChange={handleFormChange} onSubmit={handleSubmitNewUser} >
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" defaultValue={data.username} placeholder="Enter Username" required></Form.Control>
      </Form.Group>
      <Form.Group controlId="firstname">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" defaultValue={data.firstname} placeholder="Enter First Name" required></Form.Control>
      </Form.Group>
      <Form.Group controlId="lastname">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" defaultValue={data.lastname} placeholder="Enter Last Name" required></Form.Control>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" defaultValue={data.password} placeholder="Enter Password" required></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" required></Form.Control>
      </Form.Group>
      <Button type="sumbit">
        Submit
      </Button>
    </Form>
  )
}

export default UserModalForm;
