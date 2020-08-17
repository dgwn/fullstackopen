const blogsRouter = require("express").Router();

const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get("/:id", (request, response) => {
  Blog.findById(request.params.id).then((blog) => {
    response.json(blog);
  });
});

blogsRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((err) => {
      console.log("undefined error");
      next();
    });
});

blogsRouter.delete("/:id", (request, response) => {
  Blog.findByIdAndDelete(request.params.id).then((blog) => {
    response.status(204).json({
      status: "success",
      data: null,
    });
  });
});

module.exports = blogsRouter;
