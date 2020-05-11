import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

// Fed into by Issues Modal
const IssueModalForm = ({users, modalData, type}) => {
  // modalData comes from SingleProjectTab useState, in turn set by create or edit buttons


  const [form, setForm] = useState({
    summary: "",
    description: "",
    type: "",
    priority: "",
    assignee: "",
    project: modalData.project
  })

  const handleFormChange = (e) => {
    setForm({...form,
      [e.target.id] : e.target.value
    })
    console.log(form);
  }

  const handleSubmitNewIssues = (event) => {
    alert('Submitting')
    event.preventDefault()
    if (type === 'create') {
      axios.post('http://localhost:3050/api/issues/', form)
        .then((response) => console.log(response))
    } else {
      axios.put(`http://localhost:3050/api/issues/${modalData._id}`, form)
        .then((response) => console.log(response))
    }
  }


  const assigneeList = users.map(user => {
    // Maps through all users and creates a select box with choices of ID's (Might change to show names, later)
    return (
      <option selected={modalData.assignee===user._id}>{user._id}</option>
    )
  })

  return (
    <Form onChange={handleFormChange} onSubmit={handleSubmitNewIssues}>
      <Form.Group controlId="summary">
        <Form.Label>Issue Summary</Form.Label>
        <Form.Control type="text" defaultValue={modalData.summary} placeholder="Enter Issue Summary" required></Form.Control>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Issue Description</Form.Label>
        <Form.Control as="textarea" rows='3' defaultValue={modalData.description} placeholder="Enter Issue Description" required></Form.Control>
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Issue Type</Form.Label>
        <Form.Control as="select" required>
        <option selected={modalData.type === null}>Choose Issue Type</option>
        <option selected={modalData.type === 'task'}>Task</option>
        <option selected={modalData.type === 'issue'}>Issue</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="priority">
        <Form.Label>Issue Priority</Form.Label>
        <Form.Control as='select' required>
          <option selected={modalData.priority === null}>Choose Issue Priority</option>
          <option selected={modalData.priority === 'LOW'}>LOW</option>
          <option selected={modalData.priority === 'MEDIUM'}>MEDIUM</option>
          <option selected={modalData.priority === 'HIGH'}>HIGH</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="assignee">
        <Form.Label>Assignee</Form.Label>
        <Form.Control as='select' required>
        <option selected>Select Assignee</option>
        {assigneeList}
        </Form.Control>
      </Form.Group>
      <Button type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default IssueModalForm;
