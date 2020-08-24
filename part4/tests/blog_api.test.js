const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    id: "5f4302d0ce01de27c3caaa9d",
    title: "Google",
    author: "Larry Page",
    url: "http://www.google.com",
    likes: 5,
    __v: 0
  },
  {
    id: "5f4302d0ce01de27c3caaa93",
    title: "Facebook",
    author: "Mark Zuck",
    url: "http://www.facebook.com",
    likes: 0,
    __v: 0
  }
];

beforeEach(async () => {
  await jest.setTimeout(30000);
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

afterAll(() => {
  mongoose.connection.close();
});
