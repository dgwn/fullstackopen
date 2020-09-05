const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await jest.setTimeout(50000);
  await Blog.deleteMany({});

  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(helper.initialBlogs[1]);
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
  expect(response.body).toHaveLength(helper.initialBlogs.length);
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
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);

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
  expect(response.body[helper.initialBlogs.length].likes).toEqual(0);
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

  expect(responseAfter.body).toHaveLength(helper.initialBlogs.length - 1);
});

test("successfully update the likes on a blog post", async () => {
  const initialBlogs = await api.get("/api/blogs");
  const blogToUpdate = await initialBlogs.body[0];

  const newLikes = {
    likes: 5
  };

  await api
    .patch(`/api/blogs/${blogToUpdate.id}`)
    .send(newLikes)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body[0].likes).toEqual(5);
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("PASSWORD", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "TBLee",
      name: "Tim Lee",
      password: "wwweb123"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
