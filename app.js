const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require('dotenv').config();

mongoose.set('strictQuery', true);

// APP CONFIG
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// MONGOOSE MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
const Blog = mongoose.model("Blog", blogSchema);

// CREATE DUMMY DATA TO TEST
// Blog.create({
//     title: "First Blog Post",
//     image: "https://images.unsplash.com/photo-1578403414495-5bb49bf9447b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
//     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
// });

// REST FUL ROUTES

// HOME ROUTE
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
    // create blog
    Blog.create(req.body.blog, function(err, blog) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
    const id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body.blog, function(err, blog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + id);
        }
    });
});

// DESTROY ROUTE
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err, blog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

const port = 3000;
const ip = "0.0.0.0";
app.listen(port, ip, function() {
    console.log("Server is running ", ip, ":", port);
});