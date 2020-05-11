import React, { useState } from 'react';
import { IssueAddCommentsForm, CommentsDisplay } from './styles';
import BigAvatar from '../Shared/BigAvatar'
import TextareaAutosize from 'react-textarea-autosize';
import { v4 as uuid } from 'uuid';

const IssueAddComments = (props) => {

    const [showCommentsButtons, setShowCommentsButtons]= useState(false)
    const [newCommentText, setNewCommentText] = useState("")

    const commentsContentRender = props.issueComments.map((comment) => {
        return (
            <div key={uuid()}>
                <div className="avatar-icon-box">
                    <BigAvatar image={comment.user.avatar} />
                    <div className="username">{comment.user.username}</div>
                </div>
                <div className="comment-content">
                    <div className="comment-date">{comment.date}</div>
                    <div className="comment-text">{comment.text}</div>
                    <div className="edit-btn">Edit</div>
                    <div className="delete-btn">Delete</div>
                </div>
            </div>
        )
    })


    return (
        <IssueAddCommentsForm className="issue-comments" show={showCommentsButtons}>
            <div>Comments </div>
            <BigAvatar className="big-avatar" image={props.image} />
            <TextareaAutosize
                key="input"
                placeholder="Add a comment"
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                onFocus={() => setShowCommentsButtons(true)}
            />
            <div className="save-button">Save</div>
            <div className="cancel-button">Cancel</div>
            <div className="comments-tip">Press m for magic</div>
            <CommentsDisplay>
                {commentsContentRender}
            </CommentsDisplay>
        </IssueAddCommentsForm>
    )
}

export default IssueAddComments;