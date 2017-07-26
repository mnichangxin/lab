import React, { Component } from 'react'
import Comment from './Comment'

class CommentList extends Component {
    static defaultProps = {
        comments: []
    }

    render() {
        return (
            <div className="comment-list">
                {
                    this.props.comments.map((comment, i) => {
                        return (
                            <div key={i}>
                                <Comment comment={comment} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default CommentList