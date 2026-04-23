const express = require('express');
const app = express();

// IMPORTANT for Render
const port = process.env.PORT || 3000;

app.use(express.json());

// In-memory storage (temporary)
let users = [];

/*
========================
CREATE USER (POST)
========================
*/
app.post('/users', (req, res) => {
    const { name, age, email } = req.body;

    // Basic validation
    if (!name || !age) {
        return res.status(400).json({
            message: "Name and age are required"
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        age,
        email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User added",
        data: newUser
    });
});

/*
========================
GET ALL USERS (READ)
========================
*/
app.get('/users', (req, res) => {
    res.json(users);
});

/*
========================
UPDATE USER (PUT)
========================
*/
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age, email } = req.body;

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (name) user.name = name;
    if (age) user.age = age;
    if (email) user.email = email;

    res.json({
        message: "User updated",
        data: user
    });
});

/*
========================
DELETE USER
========================
*/
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(index, 1);

    res.json({
        message: "User deleted",
        data: deletedUser
    });
});

/*
========================
ROOT CHECK
========================
*/
app.get('/', (req, res) => {
    res.send('API is running');
});

/*
========================
START SERVER
========================
*/
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});