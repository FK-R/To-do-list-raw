import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // const addTask = () => {
  //   if (newTask.trim() !== "") {
  //     setTasks([...tasks, newTask]);
  //     setNewTask("");
  //   }
  // };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index]);
  };

  const saveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = editingText;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  // const apiCall = () => {
  //   axios.get("http://192.168.68.103:8080/").then((data) => {});
  // };

  async function postData() {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
    const response = await fetch("http://192.168.68.103:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        tasks: tasks.join(", "),
      }),
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div className="flex mx-auto items-center justify-center min-h-screen bg-gray-100">
      <button onClick={postData}>Make API Call</button>

      <div>
        <h1 className="text-2xl font-bold mb-4">React To Do App</h1>
        <div className="input-container">
          <input
            className="border border-gray-300 rounded-md p-1.5 mr-2"
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="bg-yellow-300 border p-1.5 rounded-md"
            onClick={postData}>
            Add
          </button>
        </div>

        <div className="py-2">
          <div>
            <ul>
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="border border-gray-300 rounded-md p-2 my-2">
                  {editingIndex === index ? (
                    <div>
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />

                      <button
                        className="bg-green-500 text-white py-0.5 px-1.5 rounded-md"
                        onClick={() => saveEdit(index)}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-1">
                        {task}
                        <div className="flex gap-1">
                          <button
                            className="bg-red-500 text-white py-0.5 px-1.5 rounded-md"
                            onClick={() => removeTask(index)}>
                            X
                          </button>

                          <button
                            className="bg-green-500 text-white py-0.5 px-1.5 rounded-md"
                            onClick={() => editTask(index)}>
                            Edit
                          </button>

                          <button
                            className="bg-green-500 text-white py-0.5 px-1.5 rounded-md"
                            onClick={() => saveEdit(index)}>
                            Save
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoApp;
