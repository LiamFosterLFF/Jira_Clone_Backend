import React from 'react'
import { Card, CardDeck, Button } from 'react-bootstrap'
import axios from 'axios'

const ProjectsCard = (props) => {

  const handleEditProjectClick = (project) => {
    props.setShowProjectModal(true)
    props.setProjectModalData(project)
    props.setProjectModalType('edit')
  }

  const handleDeleteProjectClick = (project) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      axios.delete(`http://localhost:3050/api/projects/${project._id}`)
        .then(response => console.log(response))
    }
  }

  const projectCards = props.projects.map(project => {
    const urlId = `/SingleProject/${project._id}`
    return (
      <Card key={project._id}>
        <Card.Title>{project.title}</Card.Title>
          <Card.Text></Card.Text>
          <Card.Text>{project.type} Project</Card.Text>
          <Card.Text>{project.description}</Card.Text>
          <div className='button-row'>
            <Button href={urlId}>View</Button>
            <Button onClick={() => handleEditProjectClick(project)}>Edit</Button>
            <Button onClick={() => handleDeleteProjectClick(project)}>Delete</Button>
          </div>
      </Card>
    )
  })

  return(
    <div>
      <h1>Projects</h1>
      <CardDeck>
      {projectCards}
      </CardDeck>
    </div>
  )
}

export default ProjectsCard;
