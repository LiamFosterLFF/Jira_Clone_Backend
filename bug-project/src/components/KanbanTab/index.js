import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import Modal from '../Modals/DisplayIssueModal';
import axios from 'axios';
import Breadcrumbs from "../Modals/ModalComponents/Shared/Breadcrumbs";


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: "white",
    cursor: "pointer",
    boxShadow: isDragging ? "10px 10px 10px #e3e3e5" : "none",
    fontSize: "10px",

    // styles we need to apply on draggables
    ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
    background: "#F4F5F7",
    padding: grid,
    minHeight: 300
});

const KanbanTab = () => {


    const [allUsers] = useState([{ username: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { username: "Pickle Rick", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { username: "Lord Gaben", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }])
    const [columnIds] = useState({
        "Backlog": [uuid()],
        "Selected for Development": [uuid()],
        "Done": [uuid()],
        "In Progress": [uuid()]
    })
    const [columns, setColumns] = useState({
        [columnIds["Backlog"]]: {
            name: "Backlog",
            issues: []
        },
        [columnIds["Selected for Development"]]: {
            name: "Selected for Development",
            issues: []
        },
        [columnIds["In Progress"]]: {
            name: "In Progress",
            issues: []
        },
        [columnIds["Done"]]: {
            name: "Done",
            issues: []
        }

    })


    useEffect(() => {
        axios.get('http://localhost:3050/api/issues')
            .then((response) => {
                const columnsCopy = Object.assign({}, columns)
                response.data.forEach((issue) => {
                    const columnId = columnIds[issue.issueStatus]
                    const issueObject = {
                        id: issue._id,
                        card: issue
                    }
                    
                    columnsCopy[columnId].issues.push(issueObject)
                })
                setColumns(columnsCopy)
            })
    }, [])
    
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const onDragEnd = (result, columns, setColumns) => {
        // dropped outside the list
        if (!result.destination) {
        return;
        }

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceIssues = [...sourceColumn.issues];
            const destIssues = [...destColumn.issues];
            const [removed] = sourceIssues.splice(source.index, 1);
            destIssues.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    issues: sourceIssues
                },
                [destination.droppableId]: {
                    ...destColumn,
                    issues: destIssues
                }
            })
            const updatedStatus = destColumn.name
            const updatedCard = {
                ...removed.card,
                ["issueStatus"]: updatedStatus
            }
            axios.put(`http://localhost:3050/api/issues/${removed.id}`, updatedCard)
        } else {
            const column = columns[source.droppableId];
            const copiedIssues = [...column.issues];
            const [removed] = copiedIssues.splice(source.index, 1);
            copiedIssues.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    issues: copiedIssues
                }
            })

        }

    }
    
    const [currentModalCard, setCurrentModalCard] = useState({
        issueType: "Task",
        issueTitle: "",
        issueDescription: '',
        issueComments: [{ user: { username: "", avatar: "" }, date: "", text: "" }],
        issueEstimatedTime: 0,
        issueTimeLogged: 0,
        issueStatus: "",
        issuePriority: "Medium",
        issueReportingUser: { name: "", avatar: "" },
        issueAssignedUsers: [{ name: "", avatar: "" }],
    })
    const [currentModalCardId, setCurrentModalCardId] = useState("")
    const handleIssueClick = (e, issue) => {
        setModalIsOpen(true)
        setCurrentModalCard(issue.card)
        setCurrentModalCardId(issue.id)
    }

    const updateIssue = (issueId, updatedCard) => {
        axios.put(`http://localhost:3050/api/issues/${issueId}`, updatedCard)
            .then(() => axios.get(`http://localhost:3050/api/issues/${issueId}`)
                .then((updatedIssue) => {
                    // Copy columns, get column by ID, find updating issue by ID, make a new issue, and add to column, then replace previous column and set to columns
                    const updatedColumns = Object.assign({}, columns)
                    const columnId = columnIds[updatedIssue.data.issueStatus]
                    const issueIndex = updatedColumns[columnId].issues.findIndex((issue) => issue.id === updatedIssue.data._id)
                    const updatedIssueObject = {
                        id: updatedIssue.data._id,
                        card: updatedIssue.data
                    }
                    updatedColumns[columnId].issues[issueIndex] = updatedIssueObject
                    setColumns(updatedColumns);
                })
            )
    }


    const deleteIssue = (issueId) => {
        axios.delete(`http://localhost:3050/api/issues/${issueId}`)
            .then((deletedIssue) => {
                const updatedColumns = Object.assign({}, columns)
                const columnId = columnIds[deletedIssue.data.issueStatus]
                const updatedIssues = updatedColumns[columnId].issues.filter((issue) => issue.id !== deletedIssue.data._id)
                updatedColumns[columnId].issues = updatedIssues
                setColumns(updatedColumns);
            })
    }



    return (
    <div className="page">
        <Breadcrumbs /> 
        <div className="column" style={{display: "flex", width: "100%"}}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <div key={id} style={{width: "25%", margin: "0px 5px"}}>
                            <h4>{column.name}</h4>
                            <Droppable droppableId={id} key={id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                    >
                                        {column.issues.map((issue, index) => (
                                            <Draggable key={issue.id} draggableId={issue.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        onClick={e => handleIssueClick(e, issue)}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        {issue.card.issueTitle}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    )

                })}
            </DragDropContext>
        </div>
        <Modal 
        modalIsOpen={modalIsOpen} 
        setModalIsOpen={setModalIsOpen} 
        card={currentModalCard} 
        setCard={setCurrentModalCard}
        updateIssue={updateIssue}
        issueId={currentModalCardId}
        allUsers={allUsers}
        deleteIssue={deleteIssue}
        >
        </Modal>
        
    </div>
      
    );
}




export default KanbanTab;