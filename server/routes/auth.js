const router = require("express").Router();

const User = require("../modals/user");

router.post("/login", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({
    username: { $regex: username, $options: "i" },
  });
  if (user) {
    res.json({ _id: user._id, username: user.username });
  } else {
    res.status(400).json({ error: "User does not exist" });
  }
});

router.get("/:user_id/users", async (req, res) => {
  const { user_id } = req.params;
  const users = await User.find({ _id: { $ne: user_id } }).select("-__v");
  if (users) {
    res.json(users);
  } else {
    res.status(400).json({ error: "User does not exist" });
  }
});

module.exports = router;
