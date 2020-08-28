const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Google",
    author: "Larry Page",
    url: "http://www.google.com",
    likes: 5,
    __v: 0
  },
  {
    title: "Facebook",
    author: "Mark Zuck",
    url: "http://www.facebook.com",
    likes: 0,
    __v: 0
  }
];

beforeEach(async () => {
  await jest.setTimeout(50000);
  await Blog.deleteMany({});

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are 2 blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("the blog has the property 'id'", async () => {
  const response = await api.get("/api/blogs");
  for (const blog of response.body) {
    expect(blog.id).toBeDefined();
  }
});

test("successful new blog POST", async () => {
  const newBlog = {
    id: "5f4302d0ce01de27c3caaa94",
    title: "Wikipedia",
    author: "Jimmy Wales",
    url: "http://www.wikipedia.org",
    likes: 6,
    __v: 0
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length + 1);

  const titles = response.body.map((n) => n.title);
  expect(titles).toContain(newBlog.title);
});

test("if 'likes' property is missing, default to 0", async () => {
  const newBlog = {
    id: "5f4302d0ce01de27c3caaa94",
    title: "Wikipedia",
    author: "Jimmy Wales",
    url: "http://www.wikipedia.org"
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body[initialBlogs.length].likes).toEqual(0);
});

test("blog POST missing title returns '400 Bad Request'", async () => {
  const newBlog = {
    id: "5f4302d0ce01de27c3caaa94",
    author: "Jimmy Wales",
    url: "http://www.wikipedia.org",
    likes: 6,
    __v: 0
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("succesful DELETE blog request", async () => {
  const response = await api.get("/api/blogs");
  const idToDelete = await response.body[0].id;
  await api.delete(`/api/blogs/${idToDelete}`).expect(204);
  const responseAfter = await api.get("/api/blogs");

  expect(responseAfter.body).toHaveLength(initialBlogs.length - 1);
});

// MOVE SOME REPEATED CALLS AND BLOG OBJECTS/COLLECTIONS TO A HELPER FILE

// move tests into suites?

// create test for DELETE a blog

afterAll(() => {
  mongoose.connection.close();
});
