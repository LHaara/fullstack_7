import React from 'react'
import PropTypes from 'prop-types'

const User = (props) => {
/*   console.log('User')
  console.log(props) */
  if (props.user === undefined)
    return null

  return (
    <div>
      <h1>{props.user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {props.user.blogs.map(blog =>
          <li key={blog._id}>
            {blog.title} by {blog.author}
          </li>
        )}
      </ul>

    </div>
  )
}
User.propTypes = {
  user: PropTypes.object
}

export default User