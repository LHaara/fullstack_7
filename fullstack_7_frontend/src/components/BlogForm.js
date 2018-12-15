import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Label } from 'semantic-ui-react'

const BlogForm = ({ title, author, url, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>Luo uusi blogi</h2>

      <Form onSubmit={handleSubmit}>
        <div>
          <Input
            placeholder='title'
            size='mini'
            value={title}
            name='title'
            onChange={handleChange}
          />
          <Label pointing='left'>Anna blogin tiedot</Label>
        </div>
        <div>
          <Input
            placeholder='author'
            size='mini'
            value={author}
            name='author'
            onChange={handleChange}
          />
        </div>
        <div>
          <Input
            placeholder='url'
            size='mini'
            value={url}
            name='url'
            label='http://'
            onChange={handleChange}
          />
        </div>

        <Button type="submit">Luo</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  author: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}


export default BlogForm