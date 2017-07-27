import React, { Component } from 'react'
import propTypes from 'prop-types'

class CommentInput extends Component {
    static propTypes = {
        onSubmit: propTypes.func
    }

    constructor() {
        super()
        this.state = {
            username: '',
            content: ''
        }
        this.handleUsernameBlur = this.handleUsernameBlur.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handleContentChange = this.handleContentChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.textarea.focus()
    }

    _saveUsername(username) {
        localStorage.setItem('username', username)
    }

    handleUsernameBlur(event) {
        this._saveUsername(event.target.value)
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username, 
                content: this.state.content,
                createdTime: + new Date()
            })
            this.setState({
                content: ''
            })
        }
    }

    render() {
        return (
            <div className="comment-input">
                <div className="comment-field">
                    <span className="commnet-field-name">用户名：</span>
                    <div className="comment-field-input">
                        <input value={this.state.username} onBlur={this.handleUsernameBlur} onChange={this.handleUsernameChange} />
                    </div>
                </div>
                <div className="comment-field">
                    <span className="commnet-field-name">评论内容：</span>
                    <div className="comment-field-input">
                        <textarea value={this.state.content} ref={(textarea) => this.textarea = textarea} onChange={this.handleContentChange} />
                    </div>
                </div>
                <div className="comment-field-button">
                    <button onClick={this.handleSubmit}>发布</button>
                </div>
            </div>
        )
    }
}

export default CommentInput