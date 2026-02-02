import React from "react";
import { useState } from "react";
import FilterControls from "./FilterControls";
import TodoItem from "./TodoItem";
import useLocalStorage from "../../hooks/useLocalStorage";

const TodoApp = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (!text.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        priority,
        completed: false,
      },
    ]);

    setText("");
    setPriority("LOW");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="bg-blue-100 p-20 flex items-center min-h-screen w-full flex-col">
      <h1 className="text-3xl font-bold text-black">My Tasks</h1>
      <h4 className="text-gray-600">Stay focused and organized today</h4>
      <div className="mt-4 p-4 bg-white rounded-xl shadow flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a new task"
          className="border-2 border-gray-300 p-2 rounded w-lg outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select
          className="ml-2 border-2 border-gray-300 p-2 rounded outline-none"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="LOW">Low Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="HIGH">High Priority</option>
        </select>
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          onClick={addTask}
        >
          + Add Task
        </button>
      </div>
      <div className="mt-6 ">
        <div className="flex justify-between items-center w-[40vw]">
          <h2 className="text-sm font-semibold text-slate-500 tracking-wide">
            TODAY'S FOCUS
          </h2>
          <FilterControls filter={filter} setFilter={setFilter} />
        </div>
        <div className="mt-5">
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
