# DevOps Project: Full workflow from code to deployment and automatizating builds
The aim of this project is to show the concept of DevOps on this simple NodeJS RESTful blog application that uses MongoDB database, developed by Dhruv Solanki.
The project will go over dockerization, orchestration, CI/CD pipeline and more.

### Tech Stack
* Node JS
* Semantic UI
* MongoDB
* npm
* HTML
* CSS

### NPM Packages
* express
* mongoose
* body-parser
* method-override

### RESTful Routes

| Name   | Path            | HTTP verb | Purpose                           |
|--------|-----------------|-----------|-----------------------------------|
| Index  | /blogs          | GET       | List all blogs                    |
| New    | /blogs/new      | GET       | Show new blog form                |
| Create | /blogs          | POST      | Create a new blog                 |
| Show   | /blogs/:id      | GET       | Show info about one specific blog |
| Edit   | /blogs/:id/edit | GET       | Shows edit form for one blog      |
| Update | /blogs/:id      | PUT       | Update a particular blog          |
| Delete | /blogs/:id      | DELETE    | Delete a particular blog          |

### Screen Shots
1) Index Page
![Index page](/images/index.png)

2) Show Page
![Show page](/images/show.png)

3) New Blog page
![New blog page](/images/new.png)

4) Edit Blog page
![Edit blog page](/images/edit.png)
