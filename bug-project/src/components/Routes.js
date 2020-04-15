import React from 'react'
import { Switch, Route} from 'react-router-dom'

import KanbanTab from './KanbanTab';
import HomeTab from './tabs/home/HomeTab'
import ProjectsTab from './tabs/projects/ProjectsTab'
import SingleProjectTab from './tabs/projects/issues/SingleProjectTab'
import UsersTab from './tabs/users/UsersTab'
import SingleUserTab from './tabs/users/SingleUserTab'


const Router = (props) => {
  const users = props.users
  const issues = props.issues
  const projects = props.projects


  const singleProjectSelector = (pathname) => {
    const id = pathname.split('/')[2]

    const singleProject = projects.find(project => project._id === id)

    // singleProjectSelector(props.location.pathname)
    return singleProject;
  }

  const singleProjectIssuesSelector = (pathname) => {
    const singleProject = singleProjectSelector(pathname)
    const matchingIssues =[]
    if (singleProject && issues.length) {
      const issueIds = singleProject.issues
      issueIds.map((id) => {
        let matchingIssue = issues.find(issue => issue._id === id)
        matchingIssues.push(matchingIssue)
      })
      return matchingIssues
    }
  }

  const singleUserSelector = (pathname) => {
    const id = pathname.split('/')[2]
    const singleUser = users.find(project => project._id === id)

    // singleProjectSelector(props.location.pathname)
    return singleUser;
  }

  const singleUserIssuesSelector = (pathname) => {
    const singleUser = singleUserSelector(pathname)
    const matchingIssues = []
    if (singleUser && issues.length) {
      issues.map((issue) => {
        if (issue.assignee === singleUser._id) {
          matchingIssues.push(issue)
        }
      })
      return matchingIssues
    }
  }

  return(
    <Switch>
      <Route path='/board' render={(props) => <KanbanTab {...props} projects={projects} issues={issues} users={users}/>}/>
      <Route path="/login" component={props.login} />
      <Route path="/oauth_callback" component={props.loginCallback} />

      <Route
        path='/Home'
        render={
          props =>
            <HomeTab
              users={users}
              issues={issues}
              projects={projects}
            />
        }
      />
      <Route path='/Users' render={(props) => <UsersTab {...props} users={users}/>}/>
      <Route
      path='/SingleUser/:_id'
      render={
        (props) =>
          <SingleUserTab {...props}
            issueData={singleUserIssuesSelector(props.location.pathname)}
            singleUserData={singleUserSelector(props.location.pathname)}
          />
        }
      />

      <Route path='/Projects' render={(props) => <ProjectsTab {...props} projects={projects}/>}/>
      <Route
      path='/SingleProject/:_id'
      render={
        (props) =>
          <SingleProjectTab {...props}
            issueData={singleProjectIssuesSelector(props.location.pathname)}
            userData={users}
            singleProjectData={singleProjectSelector(props.location.pathname)}
          />
        }
      />

    </Switch>
  )

}

export default Router;
