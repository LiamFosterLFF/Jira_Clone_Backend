import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Routes from './components/Routes'
import appAvatar from './icons8-stack-48.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard, faSlidersH, faSearch, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import CreateIssueModal from "./components/Modals/CreateIssueModal"


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



  const SidenavIcon = styled.div`
  width: 100%;
  line-height: 100%;
  padding: 10px;
  position: inline-block;

  & svg {
    color: white;
  }
  `;


  const SidenavIconText = styled.div `
    color: white;
    position: relative;
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



const App = () => {

  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [issues, setIssues] = useState([])
  //To eventually be replaced, when you get the backend set up properly
  const [allUsers] = useState([{ username: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { username: "Pickle Rick", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { username: "Lord Gaben", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }])

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

  const [createIssueModalIsOpen, setCreateIssueModalIsOpen] = useState(false)


  return (
    <div>

        <Sidenav>
          <SidenavIcon>
            <FontAwesomeIcon 
              icon={faPlusSquare}
              size="lg"
            />
            <SidenavIconText>
              Search Issue
            </SidenavIconText>
          </SidenavIcon>
          <SidenavIcon>
            <FontAwesomeIcon 
              icon={faSearch}
              size="lg"
              onClick={() => setCreateIssueModalIsOpen(true)}
            />
            <SidenavIconText>
              Create Issue
            </SidenavIconText>
          </SidenavIcon>
        </Sidenav>
        <Sidebar>
          <ProjectBar>
            <ProjectIcon><img src={appAvatar} alt={"App Avatar"}></img></ProjectIcon>
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
      <CreateIssueModal 
      modalIsOpen={createIssueModalIsOpen}
      setModalIsOpen={setCreateIssueModalIsOpen}
      allUsers={allUsers}
      /> 
          
        </Content> 
    </div>
  )
}


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

const renderLinkItem = (name, icon, path) => {
  // const iconDictionary = {


  // };



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
