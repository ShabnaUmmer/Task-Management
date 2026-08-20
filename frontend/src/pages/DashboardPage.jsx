import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { TaskCard } from '../components/TaskCard';
import { TaskFormModal } from '../components/TaskFormModal';
import { FaPlus, FaSearch } from 'react-icons/fa';

export const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks', {
        params: { page, limit: 6, search, status, priority },
      });
      setTasks(data.data);
      setTotalPages(data.meta.lastPage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, status, priority]);

  const handleSaveTask = async (formData) => {
    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, formData);
      } else {
        await API.post('/tasks', formData);
      }
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      alert('Error saving task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (error) {
        alert('Error deleting task');
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="controls-bar">
        <div className="filters">
          <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid #CCCCCC', padding: '0 8px', borderRadius: '4px' }}>
            <FaSearch style={{ color: '#888888' }} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', outline: 'none', padding: '8px' }}
            />
          </div>
          <select className="form-control" style={{ width: 'auto' }} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
          <select className="form-control" style={{ width: 'auto' }} value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">All Priorities</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>
        <button className="btn-primary" style={{ width: 'auto' }} onClick={() => { setEditingTask(null); setIsModalOpen(true); }}>
          <FaPlus style={{ marginRight: '4px' }} /> Add Task
        </button>
      </div>

      <div className="card-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={(task) => { setEditingTask(task); setIsModalOpen(true); }}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button key={p} className={page === p ? 'active' : ''} onClick={() => setPage(p)}>
            {p}
          </button>
        ))}
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveTask}
        initialData={editingTask}
      />
    </div>
  );
};