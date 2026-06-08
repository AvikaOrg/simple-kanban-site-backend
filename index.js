const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/kanban';

console.log("URI:", process.env.MONGODB_URI);
console.log("USERNAME:", process.env.MONGODB_USERNAME);
console.log("PASSWORD:", process.env.MONGODB_PASSWORD);

const connectMongodb = () => {
  console.log("Connecting Mongodb")
  mongoose.connect(MONGODB_URI, {
    auth: {
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD
    },
    authSource: 'admin'
  })
    .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
}

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort('order');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  console.log(req.body)
  const task = new Task(req.body);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk update for reordering
app.put('/api/tasks/reorder', async (req, res) => {
  const { tasks } = req.body;
  try {
    const updates = tasks.map(task =>
      Task.findByIdAndUpdate(task._id, { status: task.status, order: task.order })
    );
    await Promise.all(updates);
    res.json({ message: 'Reordered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK health check' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectMongodb();
});
