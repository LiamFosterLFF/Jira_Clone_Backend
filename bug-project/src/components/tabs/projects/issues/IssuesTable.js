import React from 'react'
import { Tab, Nav, Row, Col, Button } from 'react-bootstrap'

// Parent is SingleProjectCard
const IssuesTable = (props) => {

  const issues = props.issueData

  const handleIssueEditClick = (issue) => {
    props.setShowIssueModal(true)
    props.setIssueModalData(issue)
    props.setIssueModalType('edit')
  }
  let issueTabs;
  if (issues) {
    issueTabs = issues.map(issue => {
      return (
        <Nav.Item key={issue._id}>
        <Nav.Link eventKey={issue._id}>{issue.summary}</Nav.Link>
        </Nav.Item>
      )
    })
  }

  let issueEntries;
  if (issues) {
     issueEntries = issues.map(issue => {
      return (
        <Tab.Pane key={issue._id} eventKey={issue._id} title={issue._id}>
          <table>
            <thead>
              <tr>
                <th>Summary</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created By (User ID)</th>
                <th>User ID</th>
                <th>Assignee</th>
                <th>Reporter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{issue.summary}</td>
                <td>{issue.description}</td>
              <td>
                <Button onClick={() => handleIssueEditClick(issue)}>Edit</Button>
              </td>
                <td>{issue.type}</td>
                <td>{issue._id}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </Tab.Pane>
      )
    })
  }



  if(!issues) return null;

  return(
    <div>
    <h1>Open Issues</h1>
    <Tab.Container id='left-tabs-example' defaultActiveKey={(issues.length ) ? issues[0]._id : null}>
      <Row>
        <Col sm={4}>
          <Nav variant='pills' className='flex-column'>
            {issueTabs}
          </Nav>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            {issueEntries}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
  )
}

export default IssuesTable;
