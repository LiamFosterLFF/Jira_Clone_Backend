import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import Modal from '../Modals/IssueDisplay';
import axios from 'axios';

// fake data generator
const getItems = count =>
Array.from({ length: count }, (v, k) => k).map(k => ({
    id: uuid(),
    content: `item ${k}`
}));


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


    

    
    const [allUsers, setAllUsers] = useState([{ username: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { username: "Pickle Rick", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { username: "Lord Gaben", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }])
    const [columnIds, setColumnIds] = useState({
        "Backlog": [uuid()],
        "Selected for Development": [uuid()],
        "Done": [uuid()],
        "In Progress": [uuid()]
    })
    const [columns, setColumns] = useState({
        [columnIds["Backlog"]]: {
            name: "Backlog",
            issues: [
                {
                    id: uuid(),
                    card: {
                        issueType: { name: "Bug" },
                        issueTitle: { value: "Finish modal structure, so it looks right." },
                        issueDescription: { value: 'Try assigning Pickle Rick to this issue. 🥒 🥒 🥒' },
                        issueComments: [{ user: { username: "Lord Gaben", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, date: "3 days ago", text: "In the moonlight, The color and scent of the wisteria Seems far away." }],
                        issueEstimatedTime: {value: 6},
                        issueStatus: {name: "backlog"},
                        issuePriority: { name: "High" },
                        issueReportingUser: { name: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" },
                        issueAssignedUsers: [{ name: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { name: "Pickle Rick", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }]
                    }
                },

                {
                    id: uuid(),
                    card: {
                        issueType: { name: "Bug" },
                        issueTitle: { value: "Set up cancel buttons, so they actually close the mini-modal." },
                        issueDescription: { value: 'Try assigning Pickle Rick to this issue. 🥒 🥒 🥒' },
                        issueComments: [{ user: { username: "Lord Gaben", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, date: "3 days ago", text: "In the moonlight, The color and scent of the wisteria Seems far away." }],
                        issueEstimatedTime: { value: 6 },
                        issueStatus: { name: "backlog" },
                        issuePriority: { name: "High" },
                        issueReportingUser: { name: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" },
                        issueAssignedUsers: [{ name: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { name: "Pickle Rick", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }]
                    }
                },

                {
                    id: uuid(),
                    card: {
                        issueType: { name: "Bug" },
                        issueTitle: { value: "Fix hours entry button, so it can be changed." },
                        issueDescription: { value: 'Try assigning Pickle Rick to this issue. 🥒 🥒 🥒' },
                        issueComments: [{ user: { username: "Lord Gaben", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, date: "3 days ago", text: "In the moonlight, The color and scent of the wisteria Seems far away." }],
                        issueEstimatedTime: { value: 6 },
                        issueStatus: { name: "backlog" },
                        issuePriority: { name: "High" },
                        issueReportingUser: { name: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" },
                        issueAssignedUsers: [{ name: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { name: "Pickle Rick", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }]
                    }
                },
                 
                {
                    id: uuid(),
                    card: {
                        issueType: { name: "Bug" },
                        issueTitle: { value: "Set data so that it uses the backend instead of front." },
                        issueDescription: { value: 'Try assigning Pickle Rick to this issue. 🥒 🥒 🥒' },
                        issueComments: [{ user: { username: "Lord Gaben", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, date: "3 days ago", text: "In the moonlight, The color and scent of the wisteria Seems far away." }],
                        issueEstimatedTime: { value: 6 },
                        issueStatus: { name: "backlog" },
                        issuePriority: { name: "High" },
                        issueReportingUser: { name: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" },
                        issueAssignedUsers: [{ name: "Baby Yoda", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }, { name: "Pickle Rick", avatar: "https://i.ibb.co/6n0hLML/baby-yoda.jpg" }]
                    }
                },
                
            ]
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
                        id: uuid(),
                        card: issue
                    }
                    columnsCopy[columnId].issues.push(issueObject)
                })
                console.log(columnsCopy);
                setColumns(columnsCopy)
            })
    }, [])
    
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [items, setItems] = useState(getItems(10))
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
        issueType: { name: "" },
        issueTitle: { value: "" },
        issueDescription: { value: '' },
        issueComments: [{ user: { username: "", avatar: "" }, date: "", text: "" }],
        issueEstimatedTime: {value: 0},
        issueStatus: { name: "" },
        issuePriority: {name: ""},
        issueReportingUser: { name: "", avatar: "" },
        issueAssignedUsers: [{ name: "", avatar: "" }]
    })

    const handleIssueClick = (e, issue) => {
        setModalIsOpen(true)
        setCurrentModalCard(issue.card)
    }

    

    return (
    <div className="page">
        <div className="column" style={{display: "flex", width: "100%"}}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    console.log(column);
                    
                    return (
                        <div style={{width: "25%", margin: "0px 5px"}}>
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
                                                        {issue.card.issueTitle.value}
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
        allUsers={allUsers}></Modal>
        
    </div>
      
    );
}




export default KanbanTab;