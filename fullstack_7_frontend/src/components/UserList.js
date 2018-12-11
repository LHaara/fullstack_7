import React from 'react'
import { BrowserRouter as  Router, Link } from 'react-router-dom'




const UserList = ({ users/* , blogs */ }) => {


  if (users === '')
    return null

  return(
    <div>
          <h2>Users</h2>
           <table>
               <tbody>
                 <tr><th></th><th>blogs added</th></tr>
              {users.map(user =>
                <tr key={user._id}><td><Link to={`/users/${user._id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
              )} 
            </tbody>    
          </table> 


    </div>

 )
}

export default UserList