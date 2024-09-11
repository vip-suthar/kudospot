const router = require("express").Router();

const Kudo = require("../modals/kudo");

router.get("/analytics", async (req, res) => {
  try {
    const kudos_given = await Kudo.aggregate([
      {
        $group: {
          _id: "$badge",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $lookup: {
          from: "badges",
          localField: "_id",
          foreignField: "_id",
          as: "badge",
        },
      },
      {
        $project: {
          _id: 0,
          badge: {
            __v: 0,
          },
        },
      },
    ]);
    const kudos_received = await Kudo.aggregate([
      {
        $group: {
          _id: "$to",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          _id: 0,
          user: {
            __v: 0,
          },
        },
      },
    ]);

    const most_liked_post_agg = await Kudo.aggregate([
      {
        $group: {
          _id: "$_id",
          likes_count: { $sum: { $size: "$likes" } },
        },
      },
      {
        $sort: {
          likes_count: -1,
        },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          likes_count: 0,
        },
      },
    ]);

    const most_liked_post = await Kudo.findById(most_liked_post_agg?.[0]?._id)
      .populate("from to badge likes")
      .select({
        __v: 0,
      });
    // const users = await Kudo.aggregate
    res.json({
      kudos_given: kudos_given.map((item) => ({
        count: item.count,
        badge: item.badge[0],
      })),
      kudos_received: kudos_received.map((item) => ({
        count: item.count,
        user: item.user[0],
      })),
      most_liked_post,
    });
  } catch (error) {
    console.log(error);
    res.send({ error: "some error occured" });
  }
});

module.exports = router;
