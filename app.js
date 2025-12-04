const express = require("express");
const app = express();
const usersRouter = require("./routers/router");
const path = require("path");


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRouter);

app.get("/", (req, res) => {
    res.redirect("/categories");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});