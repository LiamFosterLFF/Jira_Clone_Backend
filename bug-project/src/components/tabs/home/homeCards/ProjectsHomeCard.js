import React from 'react'
import { Card } from 'react-bootstrap'
import ProjectsHomeListGroup from './homeListGroups/ProjectsHomeListGroup'

const ProjectsHomeCard = (props) => {

  return(
    <Card>
      <Card.Title>Your Projects</Card.Title>
      <Card.Text>Projects</Card.Text>
      <Card.Text>List of Projects Under Development</Card.Text>
      <ProjectsHomeListGroup {...props}/>
    </Card>
  )
};

export default ProjectsHomeCard;
