/* 
 * React评论框 
 */

/* 单纯写法 */
/*
var CommentBox = React.createClass({
    render: function() {
        return (
            React.createElement('div', {className: 'CommentBox'}, 'Hello, World! I am a CommentBox')
        );                
    }
});
ReactDOM.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
);
*/


/* JSX写法 */

// 评论框架
var CommentBox = React.createClass({
    loadCommentsFormServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),  
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleCommentSubmit: function(comment) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            data: []
        };
    },
    componentDidMount: function() {
        this.loadCommentsFormServer();
        setInterval(this.loadCommentsFormServer, 2000);
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

// 评论列表
var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

// 评论
var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});

// 提交表单
var CommentForm = React.createClass({
    getInitialState: function() {
        return {
            author: '',
            text: ''
        };
    },
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    }, 
    handleSubmit: function(e) {
        e.preventDefault();

        var author = this.state.author.trim();
        var text = this.state.text.trim();

        if (!text || !author) {
            return;
        }

        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    }, 
    render: function() {
        return (
            <form className="commentForm">
                <p>
                    <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
                </p>
                <p>
                    <input type="text" placeholder="Say something" value={this.state.text} onChange={this.handleTextChange} />
                </p>
                <p>
                    <input type="submit" value="Post" onClick={this.handleSubmit} />
                </p>
            </form>
        );
    }
});

// 渲染DOM树
ReactDOM.render(
    <CommentBox url="/api/comments" />,
    document.getElementById('content')
);