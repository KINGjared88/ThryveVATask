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

  const handleAddTask = (day, taskText) => {
    if (!taskText) return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      notes: ''
    };
    setTasksByDay(prev => ({
      ...prev,
      [day]: [...prev[day], newTask]
    }));
  };

  const handleToggle = (day, taskId) => {
    setTasksByDay(prev => ({
      ...prev,
      [day]: prev[day].map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const handleNoteChange = (day, taskId, note) => {
    setTasksByDay(prev => ({
      ...prev,
      [day]: prev[day].map(task =>
        task.id === taskId ? { ...task, notes: note } : task
      )
    }));
  };

  const handleDelete = (day, taskId) => {
    setTasksByDay(prev => ({
      ...prev,
      [day]: prev[day].filter(task => task.id !== taskId)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
      <header className="flex flex-col items-center justify-center mb-10 md:mb-12">
        <img
          src="https://storage.googleapis.com/msgsndr/CK9edYkGjycMkpkeDDL9/media/6838be356ae59c047994b53f.svg"
          alt="Thryve Credit Logo"
          className="h-24 w-auto mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 tracking-tight">Thryve VA Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Empowering consistent growth, one task at a time.</p>
      </header>

      <div className="text-center mb-8">
        <button className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition duration-200 ease-in-out shadow-md">
          Reset for New Week (Admin Only)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 mb-12">
        {weekdays.map(day => (
          <div key={day} className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">{day}</h2>

            <div className="mb-4">
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                onChange={e => {
                  handleAddTask(day, e.target.value);
                  e.target.selectedIndex = 0;
                }}
              >
                <option value="" className="text-gray-500">+ Quick Add from Template</option>
                {taskTemplates.map(task => (
                  <option key={task} value={task}>{task}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <input
                className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out w-full"
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

            <div className="space-y-4">
              {tasksByDay[day].map(task => (
                <div
                  key={task.id}
                  className={`rounded-xl shadow-sm p-4 border border-gray-200 transition duration-200 ease-in-out ${task.completed ? 'bg-blue-50' : 'bg-white hover:shadow-md'}`}
                >
                  <div className="flex items-start justify-between">
                    <label className="flex items-start gap-3 flex-grow cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-offset-0"
                        checked={task.completed}
                        onChange={() => handleToggle(day, task.id)}
                      />
                      <span className={`text-base font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{task.text}</span>
                    </label>
                    <button
                      className="ml-4 text-sm text-red-500 hover:text-red-700 font-semibold transition duration-200 ease-in-out"
                      onClick={() => handleDelete(day, task.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <textarea
                    placeholder="Add notes..."
                    className="w-full text-sm mt-3 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out resize-y text-gray-700"
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
