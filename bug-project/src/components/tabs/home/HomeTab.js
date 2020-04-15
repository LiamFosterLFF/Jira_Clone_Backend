import React from 'react'
import { CardDeck } from 'react-bootstrap'

import IssuesHomeCard from './homeCards/IssuesHomeCard'
import ProjectsHomeCard from './homeCards/ProjectsHomeCard'
import UsersHomeCard from './homeCards/UsersHomeCard'

const HomeTab = (props) => {

  return (
    <CardDeck>
      <IssuesHomeCard issues={props.issues}/>
      <ProjectsHomeCard projects={props.projects}/>
      <UsersHomeCard users={props.users}/>
    </CardDeck>
  )
}

export default HomeTab;
