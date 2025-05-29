import React, { useState } from 'react';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const taskTemplates = [
  'Create & schedule Post 1 (daily)',
  'Create & schedule Post 2 (daily)',
  'Monitor & Engage (daily)',
  'Draft Blog Post 1 (Topic)',
  'Edit & Finalize Blog Post 1',
  'Draft Blog Post 2 (Topic)',
  'Edit & Finalize Blog Post 2',
  'Review/Test Chat Lead Workflow',
  'Review/Test DIY Lead Workflow',
  'Review/Test Cold Lead Workflow',
  'Outline Long-Term Nurture Campaign',
  'Draft Nurture Emails 1–3',
  'Set Up Triggers for Nurture',
  'Test Nurture Campaign Flow',
  'Review Homepage & CTAs',
  'Review Services/Products',
  'Review About/Contact/Legal',
  'Review User Journey + Mobile',
  'Compile Feedback & Suggestions',
  'Explore AI Tools / GHL Features',
  'Organize Google Drive / Assets',
  'Add new ideas or suggestions'
];

const ThryveVAPortal = () => {
  const [tasksByDay, setTasksByDay] = useState(
    weekdays.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {})
  );

  const handleAddTask = (day, newTask) => {
    if (!newTask) return;
    setTasksByDay(prev => ({
      ...prev,
      [day]: [
        ...prev[day],
        { text: newTask, completed: false, notes: '', id: Date.now() }
      ]
    }));
  };

  const handleToggle = (day, id) => {
    setTasksByDay(prev => ({
      ...prev,
      [day]: prev[day].map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const handleNoteChange = (day, id, value) => {
    setTasksByDay(prev => ({
      ...prev,
      [day]: prev[day].map(task =>
        task.id === id ? { ...task, notes: value } : task
      )
    }));
  };

  const handleDelete = (day, id) => {
    setTasksByDay(prev => ({
      ...prev,
      [day]: prev[day].filter(task => task.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Thryve VA Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {weekdays.map(day => (
          <div key={day} className="bg-gray-100 rounded-2xl shadow p-4">
            <h2 className="text-xl font-semibold mb-3 text-center">{day}</h2>

            <div className="mb-3 flex gap-2">
              <select
                className="w-full border border-gray-300 rounded px-2 py-1"
                onChange={e => {
                  handleAddTask(day, e.target.value);
                  e.target.selectedIndex = 0;
                }}
              >
                <option value="">+ Quick Add from Template</option>
                {taskTemplates.map(task => (
                  <option key={task} value={task}>
                    {task}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex gap-2">
              <input
                className="flex-grow border border-gray-300 rounded px-2 py-1"
                type="text"
                placeholder="Type new task..."
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleAddTask(day, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>

            <div className="space-y-3">
              {tasksByDay[day].map(task => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl shadow-sm p-3 border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <label className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={task.completed}
                        onChange={() => handleToggle(day, task.id)}
                      />
                      <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.text}
                      </span>
                    </label>
                    <button
                      className="text-sm text-red-500 hover:underline"
                      onClick={() => handleDelete(day, task.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <textarea
                    placeholder="Add notes..."
                    className="w-full text-sm mt-2 p-2 border border-gray-300 rounded"
                    rows={2}
                    value={task.notes}
                    onChange={e => handleNoteChange(day, task.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThryveVAPortal;
