import React from 'react';
import { DeleteModalBackdrop, DeleteModalBox, DeleteModalContent } from './styles';

const DeleteModal = props => {
    
    return (
        <DeleteModalBackdrop modalIsOpen={props.modalIsOpen}>
            <DeleteModalBox>
                <DeleteModalContent>
                    <div>Are you sure you want to delete this?</div>
                    <div>Once you delete it, it's gone for good</div>
                    <div onClick={props.deleteIssue}>Delete Issue</div>
                    <div onClick={props.closeModal}>Cancel</div>
                </DeleteModalContent>
            </DeleteModalBox>
        </DeleteModalBackdrop>
    )
}

export default DeleteModal;