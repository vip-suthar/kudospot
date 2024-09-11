const router = require("express").Router();

const Badge = require("../modals/badge");

router.get("/badges", async (req, res) => {
  try {
    const badges = await Badge.find({}).select("-__v");
    res.json(badges);
  } catch (error) {
    res.send({ error: "some error occured" });
  }
});

module.exports = router;
