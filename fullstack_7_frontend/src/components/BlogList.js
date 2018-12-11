import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as  Router, Link } from 'react-router-dom'

class BlogList extends React.Component {

  render(){
    const byLikes = (b1, b2) => b2.likes - b1.likes
    const blogsInOrder = this.props.blogs.sort(byLikes)
    
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div >
        
          <h2>blogs</h2>
          {blogsInOrder.map(blog => 
            <div key={blog._id} style={blogStyle}>

                <Link to={`/blogs/${blog._id}`}>{blog.title} {blog.author}</Link>  
            </div>  
          )}

          
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}


const ConnectedBlogList = connect(
  mapStateToProps,
  { /* likeBlog, notify, deleteBlog */ }
)(BlogList)


export default ConnectedBlogList