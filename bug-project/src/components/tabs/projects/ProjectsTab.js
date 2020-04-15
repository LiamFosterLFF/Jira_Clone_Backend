import React, { useState } from 'react'
import ProjectsTable from './ProjectsTable'
import ProjectsCard from './ProjectsCard'

const ProjectsTab = (props) => {

  const [showProjectModal, setShowProjectModal] = useState(false)
  const [projectModalData, setProjectModalData] = useState({})
  const [projectModalType, setProjectModalType] = useState('create')
  const childProps = {
    ...props,
    showProjectModal,
    setShowProjectModal,
    projectModalData,
    setProjectModalData,
    projectModalType,
    setProjectModalType
  }

  return(
    <div>
      <ProjectsCard {...childProps}/>
      <ProjectsTable {...childProps}/>
    </div>
  )
}

export default ProjectsTab;
