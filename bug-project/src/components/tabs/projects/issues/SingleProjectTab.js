import React, { useState } from 'react'
import SingleProjectCard from './SingleProjectCard'
import IssuesTable from './IssuesTable'

// Parent is App.js via routes
const SingleProjectTab = (props) => {

  const [showIssueModal, setShowIssueModal] = useState(false)
  const [issueModalData, setIssueModalData] = useState({})
  const [issueModalType, setIssueModalType] = useState("create")

  const childProps = {
    ...props,
    showIssueModal,
    setShowIssueModal,
    issueModalData,
    setIssueModalData,
    issueModalType,
    setIssueModalType
  }

  return(
    <div>
      <SingleProjectCard {...childProps}/>
      <IssuesTable {...childProps}/>
    </div>
  )
}

export default SingleProjectTab;
