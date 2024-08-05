const Joi = require("joi");
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
    const schema = {
        name: Joi.string().min(3).required(),
    };
    const result = Joi.validate(req.body, schema);

    if (result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //rout handler:
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

// update resourses
app.put("/api/courses/:id", (req, res) => {
    //look up the course
    //if not existing, return 404
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("the course with the given ID was not found");

    // Validate
    //if invalid, return 400 - Bad requests
    const result = ValidateCourse(req.boby);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // Update the course
    //returt the updated course

    course.name = req.body.name;
    res.send(course);
});
function ValidateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(course, schema);
}
//port env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
