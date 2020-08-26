const blogsRouter = require("express").Router();

const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", (request, response) => {
  Blog.findById(request.params.id).then((blog) => {
    if (blog) {
      response.json(blog);
    }
    response.status(404).json({
      status: "fail"
    });
  });
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    // using promises
    //
    // const blog = new Blog(request.body);
    // blog
    //   .save()
    //   .then((result) => {
    //     response.status(201).json(result);
    //   })
    //   .catch((err) => {
    //      next(err);
    //   });

    const newBlog = await Blog.create(request.body);
    response.status(201).json({
      status: "success",
      data: {
        tour: newBlog
      }
    });
  } catch (err) {
    response.status(400).json({
      status: "fail",
      message: err
    });
  }
});

blogsRouter.delete("/:id", (request, response) => {
  Blog.findByIdAndDelete(request.params.id).then((blog) => {
    response.status(204).json({
      status: "success",
      data: null
    });
  });
});

module.exports = blogsRouter;
