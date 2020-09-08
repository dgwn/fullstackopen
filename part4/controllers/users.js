const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  try {
    const body = request.body;

    if (!body.password || body.password.length < 3) {
      return response
        .status(400)
        .json({ error: "`password` must be at least 3 characters" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const users = await User.find({});
    const usernames = await users.map((u) => u.username);

    if (usernames.includes(user.username)) {
      return response.status(400).json({ error: "`username` must be unique" });
    }
    if (user.username.length < 3) {
      return response
        .status(400)
        .json({ error: "`username` must be at least 3 characters" });
    }

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (err) {
    response.status(400).json({
      status: "fail",
      message: err,
      error: "Invalid data entry"
    });
  }
});

module.exports = usersRouter;
