import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const ProjectModalForm = ({data, type}) => {

  const [form, setForm] = useState({
    title: "",
    type: "",
    abbreviation: "",
    description: ""
  })

  const handleFormChange = (e) => {
    setForm({...form,
      [e.target.id] : e.target.value
    })
  }
  console.log(type);

  const handleSubmitNewProject = (event) => {
    event.preventDefault()
    if (type==='create') {
      axios.post('http://localhost:3050/api/projects', form)
      .then((response) => console.log(response))
    } else {
      axios.put(`http://localhost:3050/api/projects/${data._id}`, form)
      .then((response) => console.log(response))
    }
  }

  return (
    <Form onChange={handleFormChange} onSubmit={handleSubmitNewProject}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" defaultValue={data.title} placeholder="Enter Project Title" required></Form.Control>
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Type</Form.Label>
        <Form.Control type="text" defaultValue={data.type} placeholder="Enter Project Type" required></Form.Control>
      </Form.Group>
      <Form.Group controlId="abbreviation">
        <Form.Label>Abbreviation</Form.Label>
        <Form.Control type="text" defaultValue={data.abbreviation} placeholder="Enter Project Abbreviation" required></Form.Control>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows='3' defaultValue={data.description} placeholder="Enter Project Description" required></Form.Control>
      </Form.Group>
      <Button type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default ProjectModalForm;
