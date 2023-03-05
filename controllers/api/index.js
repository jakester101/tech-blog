const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

router.use("/comments", commentRoutes);
router.use("/users", userRoutes);
router.use("/post", postRoutes);

module.exports = router;
