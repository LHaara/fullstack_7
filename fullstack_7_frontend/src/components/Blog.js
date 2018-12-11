import React from 'react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class Blog extends React.Component {

  like = (id) => async () => {
    const liked = this.props.blogs.find(b=>b._id===id)
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

  render() {
    const { blog } = this.props

    if (blog === undefined)
      return null

    console.log('blog2')
    console.log(blog)

    const adder = blog.user ? blog.user.name : 'anonymous'
    const deletable = blog.user === undefined || blog.user.username === this.props.user.username

    return (
      <div>
        <div>
          {blog.title} {blog.author}
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


const ConnectedBlog = connect(
  mapStateToProps,
  { likeBlog, notify, deleteBlog }
)(Blog)


export default ConnectedBlog