const Task = require('../models/Task');
const sendEmail = require('../utils/emailService');
const { getWeatherByCity } = require('../utils/weatherService');

const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 6, status, priority, search } = req.query;
    const query = { user: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const numericPage = Number(page);
    const numericLimit = Number(limit);
    const skip = (numericPage - 1) * numericLimit;

    const [tasks, total] = await Promise.all([
      Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(numericLimit),
      Task.countDocuments(query),
    ]);

    const tasksWithWeather = await Promise.all(
      tasks.map(async (task) => {
        const taskObj = task.toObject();
        if (taskObj.location) {
          taskObj.weather = await getWeatherByCity(taskObj.location);
        }
        return taskObj;
      })
    );

    res.json({
      data: tasksWithWeather,
      meta: {
        total,
        page: numericPage,
        lastPage: Math.ceil(total / numericLimit) || 1,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, location } = req.body;
    const fileUrl = req.file ? req.file.path : undefined;

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      status,
      priority,
      dueDate,
      location,
      fileUrl,
    });

    sendEmail(
      req.user.email,
      'New Task Created',
      `Your task "${title}" was created successfully.`
    );

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const previousStatus = task.status;
    const { title, description, status, priority, dueDate, location } = req.body;

    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || task.dueDate;
    task.location = location !== undefined ? location : task.location;
    if (req.file) task.fileUrl = req.file.path;

    const updatedTask = await task.save();

    if (previousStatus !== 'DONE' && updatedTask.status === 'DONE') {
      sendEmail(
        req.user.email,
        'Task Completed',
        `Congratulations! Task "${updatedTask.title}" has been marked as DONE.`
      );
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };