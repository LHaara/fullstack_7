import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

class BlogList extends React.Component {

  render(){
    const byLikes = (b1, b2) => b2.likes - b1.likes
    const blogsInOrder = this.props.blogs.sort(byLikes)

    return (
      <div >

        <h2>blogs</h2>
        <Table compact='very' color='blue'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {blogsInOrder.map(blog =>
              <Table.Row key={blog._id}>
                <Table.Cell selectable>
                  <Link to={`/blogs/${blog._id}`}>{blog.title} </Link>
                </Table.Cell>
                <Table.Cell>
                  {blog.author}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}


BlogList.propTypes = {
  blogs: PropTypes.array
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