import React from 'react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import blogs from '../services/blogs'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      comments: []
    }
  }

  componentWillMount() {
    blogs.getComments().then(comments =>
      this.setState({ comments })
    )
  }
  like = (id) => async () => {
    const liked = this.props.blogs.find(b=>b._id===id)
    /*     console.log('like')
    console.log(liked) */

    this.props.likeBlog(liked)
    this.props.notify(`you liked '${liked.title}' by ${liked.author}`)
  }


  remove = (id) => async () => {
    const deleted = this.props.blogs.find(b => b._id === id)
    const ok = window.confirm(`remove blog '${deleted.title}' by ${deleted.author}?`)
    if ( ok===false) {
      return
    }
    await this.props.deleteBlog(id)
    this.props.notify(`blog '${deleted.title}' by ${deleted.author} removed`)
  }

  addComment = (id) => async () => {
    const newComment = await blogs.createComment(id, { content: this.state.comment })
    //console.log('addcomment')
    this.props.notify(`comment '${newComment.content}' added to blog  '${this.props.blog.title}'`)
    this.setState({
      comments: this.state.comments.concat(newComment),
      comment: ''
    })
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value })
  }


  render() {
    const { blog } = this.props


    if (blog === undefined)
      return null
    //console.log('blog.comments')
    //console.log(blog)

    /*     console.log('blogrender')
    console.log(this.props) */

    /*
    console.log('after init')
    console.log(this.state.comments) */

    const adder = blog.user ? blog.user.name : 'anonymous'
    const deletable = blog.user === undefined || blog.user.username === this.props.user.username

    const blogcomments = this.state.comments.filter(comment => comment.blog === blog._id)

    return (
      <div>
        <div>
          <h2>{blog.title} {blog.author}</h2>
        </div>
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={this.like(blog._id)}>like</button>
          </div>
          <div>
            added by {adder}
          </div>
          {deletable && <div><button onClick={this.remove(blog._id)}>delete</button></div>}
        </div>
        <h3>comments</h3>
        <input value={this.state.comment}
          name='comment'
          onChange={this.handleCommentChange}
        />
        <button onClick={this.addComment(blog._id)}>add comment</button>
        <ul>
          {blogcomments.map(comment => <li key={comment._id}>{comment.content}</li>)}
        </ul>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

Blog.propTypes = {
  blog: PropTypes.object,
  blogs: PropTypes.array,
  user: PropTypes.object
}



const ConnectedBlog = connect(
  mapStateToProps,
  { likeBlog, notify, deleteBlog }
)(Blog)


export default ConnectedBlog