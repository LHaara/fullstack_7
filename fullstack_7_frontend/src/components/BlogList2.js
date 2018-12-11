import React from 'react'
import { BrowserRouter as  Router, Route, Link } from 'react-router-dom'




const BlogList2 = ({ blogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  if (blogs === undefined)
    return null

    const byLikes = (b1, b2) => b2.likes - b1.likes
    const blogsInOrder = blogs.sort(byLikes)

  return(
    <div>
          <h2>Blogs</h2>
           <table>
               <tbody>
              {blogsInOrder.map(blog =>
                <tr key={blog._id}><td><Link to={`/blogs/${blog._id}`}>{blog.name}{blog.author}</Link></td></tr>
              )} 
            </tbody>    
          </table> 






{/*                {blogsInOrder.map(blog => 
                <Link to={`/blogs/${blog._id}`} style={blogStyle} >{blog.name}{blog.author}</Link>
              )}   */}



    </div>

 )
}

export default BlogList2