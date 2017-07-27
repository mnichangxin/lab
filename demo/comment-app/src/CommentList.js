import React, { Component } from 'react'
import Comment from './Comment'

class CommentList extends Component {
    static defaultProps = {
        comments: []
    }

    constructor() {
        super()
        this.handleDeleteComment = this.handleDeleteComment.bind(this)
    }

    handleDeleteComment(index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return (
            <div className="comment-list">
                {
                    this.props.comments.map((comment, i) => {
                        return (
                            <Comment comment={comment} index={i} key={i} onDeleteComment={this.handleDeleteComment} />
                        )
                    })
                }
            </div>
        )
    }
}

export default CommentList