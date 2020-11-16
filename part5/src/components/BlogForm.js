import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("http://")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("http://")
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <TextField
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          label="Title"
        />
      </div>

      <div>
        <TextField
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          label="Author"
        />
      </div>

      <div>
        <TextField
          value={newUrl}
          type="url"
          onChange={({ target }) => setNewUrl(target.value)}
          label="URL"
        />
      </div>

      <Button
        variant="outlined"
        color="primary"
        type="submit"
        style={{ marginTop: 10 }}
      >
        Submit
      </Button>
      <br />
      <br />
    </form>
  )
}
export default BlogForm
