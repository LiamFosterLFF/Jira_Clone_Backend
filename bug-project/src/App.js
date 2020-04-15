import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Routes from './components/Routes'
import appAvatar from './icons8-stack-48.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faSlidersH } from '@fortawesome/free-solid-svg-icons';


const App = () => {

  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [issues, setIssues] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3050/api/users')
    .then((response) => {
      setUsers(response.data)
    })
      .then(() => axios.get('http://localhost:3050/api/projects'))
        .then((response) => {
          setProjects(response.data)
        })
         .then(() => axios.get('http://localhost:3050/api/issues'))
          .then((response) => {
            setIssues(response.data)
          })

  }, [])

  const segmentRef = useRef()
  const [visible, setVisible] = useState(false)

  const Sidebar = styled.div`
    height: 100%;
    width: 140px;
    position: fixed;
    top: 0;
    left: 40px;
    background-color: #F4F5F7; 
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 20px;
  `;

  const Sidenav = styled.aside`
    height: 100vh;
    width: 40px;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    background-color: #0647A6; 
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 20px;

    &:hover {
      width: 110px;
    }
  `;

  const LinkList = styled.div`
    padding: 0;
    margin: 0;
  `;

  const Content = styled.div`
    padding-left: 180px;
  `;


  const ProjectBar = styled.div`
    display: flex;
    padding: 6px 8px;
  `;

  const ProjectIcon = styled.span`
    img {
      width: 30px;
      height: 30px;
    }
  `;

  const ProjectInfo = styled.div`
    padding: 0px 6px;
  `;

  const ProjectName = styled.div`
    font-size: 12px;
  `;
  
  const ProjectBlurb = styled.div`
    font-size: 10px;
  `;
 
  const Divider = styled.div`
    margin-top: 17px;
    padding-top: 17px;
    border-top: 1px solid #c1c7d0;
  `;


  
  // login={login} loginCallback={loginCallback}

  return (
    <div>
      <Sidenav>

      </Sidenav>
      <Sidebar>
        <ProjectBar>
          <ProjectIcon><img src={appAvatar}></img></ProjectIcon>
          <ProjectInfo>
            <ProjectName>FullStack 2.1</ProjectName>
            <ProjectBlurb>Software Project</ProjectBlurb>
          </ProjectInfo>
        </ProjectBar>
        <LinkList>
          {renderLinkItem('Kanban Board', faChalkboard, '/board')}
          {renderLinkItem('Project Settings', faSlidersH, '/settings')}
          <Divider/>
          {renderLinkItem('Home', faChalkboard, '/home')}
          {renderLinkItem('Users', faChalkboard, '/users')}
          {renderLinkItem('Projects', faChalkboard, '/projects')}
        </LinkList>
      </Sidebar>
      <Content>
        <Routes users={users} issues={issues} projects={projects} />
        
      </Content> 
    </div>
  )
}

const renderLinkItem = (name, icon, path) => {
  // const iconDictionary = {


  // };

  const LinkItem = styled.div`
    font-size: 11px;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 3px;
    display: flex;
    position: relative;
  `;

  const LinkIcon = styled.div`
    margin-right: 10px;
    width: 15px;
  `;

  const LinkText = styled.div`
    a {
      text-decoration: none;
      color: black;
    }
  `;

  return (
    <LinkItem>
      <LinkIcon>
        <FontAwesomeIcon icon={icon} size="lg"/>
      </LinkIcon>
      <LinkText>
        <Link to={path}>{name}</Link>
      </LinkText>
    
    </LinkItem>
  );
};



export default App;





//
// users = [
//   {
//     username: 'Joe',
//     firstname: 'Joe',
//     lastname: 'Malma',
//     password: '123',
//     admin: true
//   },
//   {
//     username: 'User',
//     firstname: 'You',
//     lastname: 'Sir',
//     password: '123',
//     admin: false
//   }
// ]
//
//
//  projects = [
//   {
//     title: 'project 1',
//     type: '1',
//     abbreviation: 'p1',
//     description: 'is a project'
//   },
//   {
//     title: 'project 2',
//     type: '2',
//     abbreviation: 'p2',
//     description: 'is also a project'
//   }
// ]
//
//  issues = [
//   {
//     summary: 'is broken',
//     description: 'just broke yo',
//     type: 'issue',
//     priority: 'LOW',
//     assignee: 'Liam Foster'
//   },
//   {
//     summary: 'is still broken',
//     description: 'just super broke yo',
//     type: 'issue',
//     priority: 'MEDIUM'    }
// ]

// axios.post('http://localhost:3050/api/users', users)
// .then(() => axios.post('http://localhost:3050/api/projects', projects))
// .then(() => axios.post('http://localhost:3050/api/issues', issues))
