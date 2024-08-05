const express = require("express");
const app = express();
app.use(express.json());

const courses = [
    {
        id: 1,
        name: "course1",
    },
    {
        id: 2,
        name: "course2",
    },
];

//home api
app.get("/", (req, res) => {
    res.send("hello!");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

// /api/courses/1

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("the course with the given ID was not found");
    res.send(course);
});

// /api/posts/2024/11   res: {"sortBy":"name"}
app.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.query);
});

//POST REQUEST
app.post("/api/courses", (req, res) => {
    if (!req.body.name || req.body.name.lenght < 3)
        // 400 Bad Request
        res.status(400).send(
            "name is requared and should be mininmum 3 characters."
        );
    return;

    //rout handler:
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

//port env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
