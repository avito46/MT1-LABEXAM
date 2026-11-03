import express from 'express';

const app = express();
app.use(express.json());

let tasks = [
    { id: 1, taskName: "Develop Login Page", assignedTo: "Rahul Sharma", status: "Pending", priority: "High" },
    { id: 2, taskName: "Design Database", assignedTo: "Anita Singh", status: "Completed", priority: "High" },
    { id: 3, taskName: "Setup CI/CD", assignedTo: "John Doe", status: "In Progress", priority: "Medium" }
];

app.get('/tasks', (req, res) => res.status(200).json(tasks));

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    task ? res.status(200).json(task) : res.status(404).json({ error: "Task not found" });
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json({ message: "Task added successfully", task: newTask });
});

app.put('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        res.status(200).json({ message: "Task updated successfully", task: tasks[taskIndex] });
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

app.delete('/tasks/:id', (req, res) => {
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    if (tasks.length < initialLength) {
        res.status(200).json({ message: "Task deleted successfully" });
    } else {
        res.status(404).json({ error: "Task not found" });
    }
});

app.listen(4000, () => console.log('Express Server running at http://localhost:4000'));