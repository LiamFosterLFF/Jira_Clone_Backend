import React from 'react'
import { Button } from 'react-bootstrap'

import ProjectModal from './ProjectModal'

const ProjectsTable = (props) => {


  const handleCreateNewProjectClick = () => {
    props.setShowProjectModal(true)
    props.setProjectModalData({})
    props.setProjectModalData('create')
  }


  const projectEntries = props.projects.map(project => {
    return (
      <tr key={project._id}>
        <td>{project.title}</td>
        <td>{project.type}</td>
        <td>{project.abbreviation}</td>
        <td>{project.description}</td>
      </tr>
    )
  })

  return(
    <div>
      <ProjectModal
        show={props.showProjectModal}
        hide={props.setShowProjectModal}
        data={props.projectModalData}
        type={props.projectModalType}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Abbreviation</th>
            <th>Owner</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {projectEntries}
          <tr>
            <td>
              <Button onClick={() => handleCreateNewProjectClick()}>Create New Project</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ProjectsTable;
