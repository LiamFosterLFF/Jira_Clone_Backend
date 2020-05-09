import React from 'react'
import { ListGroup } from 'react-bootstrap'
const ProjectHomeListGroup = ({projects}) => {

  const projectListGroupItems = projects.map(project => {
    return (
      <ListGroup.Item key={project._id}>
        <div><strong>{project.title}</strong></div>
        <div>Created on FIX CREATION DATE</div>
      </ListGroup.Item>
    )
  })

  return (
    <ListGroup variant='flush'>
      {projectListGroupItems}
    </ListGroup>
  )
}

export default ProjectHomeListGroup;
