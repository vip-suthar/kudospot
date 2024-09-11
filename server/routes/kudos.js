const router = require("express").Router();

const Kudo = require("../modals/kudo");

router.post("/kudos", async (req, res) => {
  try {
    const { from, to, badge, reason } = req.body;

    const kudo = new Kudo({ from, to, badge, reason, likes: [] });
    await kudo.save();
    await kudo.populate("from to badge");
    res.json({
      _id: kudo._id,
      from: kudo.from,
      to: kudo.to,
      reason: kudo.reason,
      badge: kudo.badge,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Some err occured" });
  }
});

router.get("/kudos", async (req, res) => {
  try {
    const kudos = await Kudo.find({}).select("-__v").populate("from to badge");
    res.json(kudos);
  } catch (error) {
    res.status(400).json({ error: "Some err occured" });
  }
});

router.post("/like", async (req, res) => {
  try {
    const { post, user, add_like } = req.body;

    const kudo = await Kudo.findById(post);
    if (kudo) {
      if (add_like) {
        kudo.likes.push(user);
        await kudo.save();
        res.json({ message: "Like added successfully" });
      } else {
        kudo.likes.pull(user);
        await kudo.save();
        res.json({ message: "Like removed successfully" });
      }
    } else {
      res.status(404).json({ error: "Kudo not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Some err occured" });
  }
});

module.exports = router;
