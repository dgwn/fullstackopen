import React from "react";

const blogForm = ({
  addBlog,
  newTitle,
  setNewTitle,
  newAuthor,
  setNewAuthor,
  newUrl,
  setNewUrl
}) => (
  <form onSubmit={addBlog}>
    <div>
      Title:
      <input
        type="text"
        value={newTitle}
        onChange={({ target }) => setNewTitle(target.value)}
      />
    </div>

    <div>
      Author:
      <input
        type="text"
        value={newAuthor}
        onChange={({ target }) => setNewAuthor(target.value)}
      />
    </div>

    <div>
      URL:
      <input
        type="url"
        value={newUrl}
        onChange={({ target }) => setNewUrl(target.value)}
      />
    </div>

    <button type="submit">Submit</button>
    <br />
    <br />
  </form>
);

export default blogForm;
