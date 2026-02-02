import React from "react";

const badgeColors = {
  LOW: "bg-green-200 text-green-800",
  MEDIUM: "bg-yellow-200 text-yellow-800",
  HIGH: "bg-red-200 text-red-800",
};

const TodoItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center mt-4">
      <div className="flex gap-3 items-center text-lg">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5"
        />
        <p className={task.completed ? "line-through text-slate-600" : ""}>
          {task.text}
        </p>
      </div>

      <span
        className={`text-xs px-3 py-1 rounded-full font-semibold ${badgeColors[task.priority]}`}
      >
        {task.priority}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
