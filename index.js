const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "pandu-66",
        content: "This is about REST concepts"
    },
    {
        id: uuidv4(),
        username: "mark-zuck",
        content: "Hello guys!!"
    },
    {
        id: uuidv4(),
        username: "Zoro",
        content: "Hey its been long time"
    },
];

app.get("/", (req, res) =>{
    res.send("hello");
});

app.get("/posts", (req, res) =>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) =>{
    res.render("new.ejs");
});

app.get("/posts/:id", (req, res) =>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

app.get("/posts/:id/edit", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

app.post("/posts", (req, res) =>{
    let post = req.body;
    post.id = uuidv4();
    posts.push(post);
    res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let newCont = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newCont;
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) =>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () =>{
    console.log("listening to port 8080");
});