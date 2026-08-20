import React from 'react';
import { FaMapMarkerAlt, FaPaperclip, FaEdit, FaTrash } from 'react-icons/fa';
import { WeatherBadge } from './WeatherBadge';

export const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className={`badge status-${task.status}`}>{task.status}</span>
          <span className={`priority-${task.priority}`}>{task.priority}</span>
        </div>
        <h3 style={{ fontSize: '18px', color: '#0066CC', marginBottom: '8px' }}>{task.title}</h3>
        <p style={{ fontSize: '14px', color: '#666666', marginBottom: '12px' }}>{task.description}</p>
        
        {task.location && (
          <div style={{ fontSize: '12px', color: '#555555', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FaMapMarkerAlt style={{ color: '#DC3545' }} /> {task.location}
          </div>
        )}
        
        <WeatherBadge weather={task.weather} />

        {task.fileUrl && (
          <div style={{ marginTop: '8px' }}>
            <a href={task.fileUrl} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: '#0066CC', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaPaperclip /> View Attachment
            </a>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button className="btn-action btn-edit" onClick={() => onEdit(task)}><FaEdit /></button>
        <button className="btn-action btn-delete" onClick={() => onDelete(task._id)}><FaTrash /></button>
      </div>
    </div>
  );
};