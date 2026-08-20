const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../config/cloudinary');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

router.use(protect);

router.get('/', getTasks);
router.post('/', upload.single('file'), createTask);
router.put('/:id', upload.single('file'), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;