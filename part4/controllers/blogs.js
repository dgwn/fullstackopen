const blogsRouter = require("express").Router();

const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1
  });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (err) {
    next(err);
  }

  // Blog.findById(request.params.id).then((blog) => {
  //   if (blog) {
  //     response.json(blog);
  //   }
  //   response.status(404).json({
  //     status: "fail"
  //   });
  // });
});

blogsRouter.post("/", async (request, response) => {
  try {
    const body = request.body;

    const user = await User.findById(body.userId);

    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id
    });

    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json({
      status: "success",
      data: {
        blog: newBlog
      }
    });

    //   const newBlog = await Blog.create(request.body);
    //   response.status(201).json({
    //     status: "success",
    //     data: {
    //       blog: newBlog
    //     }
    //   });
  } catch (err) {
    response.status(400).json({
      status: "fail",
      message: err
    });
  }

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
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response
      .status(204)
      .json({
        status: "success",
        data: null
      })
      .end();
  } catch (err) {
    next(err);
  }
});

blogsRouter.patch("/:id", async (request, response, next) => {
  try {
    const body = await request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      {
        likes: body.likes
      },
      { new: true }
    );
    response
      .status(200)
      .json({
        status: "success",
        data: {
          blog: await updatedBlog
        }
      })
      .end();
  } catch (err) {
    response.status(400).json({
      status: "fail",
      message: err
    });
  }
});

module.exports = blogsRouter;
