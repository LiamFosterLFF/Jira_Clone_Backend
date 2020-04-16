import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import Modal from './Modal';

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

    // styles we need to apply on draggables
    ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
    background: "#F4F5F7",
    padding: grid,
    minHeight: 300
});

const KanbanTab = () => {



    const columnsFromBackend = {
        [uuid()]: {
            name: "Backlog",
            items: getItems(3)
        },
        [uuid()]: {
            name: "Selected for Development",
            items: getItems(2)
        },
        [uuid()]: {
            name: "In Progress",
            items: getItems(2)
        },
        [uuid()]: {
            name: "Done",
            items: getItems(2)
        }

    }




    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [items, setItems] = useState(getItems(10))
    const [columns, setColumns] = useState(columnsFromBackend)
    const onDragEnd = (result, columns, setColumns) => {
        // dropped outside the list
        if (!result.destination) {
        return;
        }

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            })
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            })
        }

    }
    

    const handleIssueClick = (e, column) => {
        console.log(column, column.items.filter(item => item.id === e.target.dataset.rbdDraggableId))
        setModalIsOpen(true)
        
    }

    

    return (
    <div className="page">
        <div className="column" style={{display: "flex", width: "100%"}}>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
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
                                        {column.items.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        onClick={e => handleIssueClick(e, column)}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        {item.content}
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
        <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}></Modal>
        
    </div>
      
    );
}




export default KanbanTab;