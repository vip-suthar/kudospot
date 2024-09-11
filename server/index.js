const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
require("./db");
const authRouter = require("./routes/auth");
const kudoRouter = require("./routes/kudos");
const badgeRouter = require("./routes/badge");
const analyticsRouter = require("./routes/analytics");

dotenv.config({ path: path.join(__dirname, "./.env") });
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "..", "dist")));

app.use(cors());
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", kudoRouter);
app.use("/api", badgeRouter);
app.use("/api", analyticsRouter);
app.use("**/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist/index.html"));
});

app.listen(PORT, () => {
  console.log("Server started on port 3000");
});
