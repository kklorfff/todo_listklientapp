import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../api/api";


export default function Todo() {
  const { user, logout } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask() {
    if (!title.trim()) return;

    await createTask({
      title,
      desc: ""
    });

    setTitle("");
    loadTasks();
  }

  async function toggleDone(task) {
    await updateTask(task.id, {
      marked_as_done: !task.marked_as_done
    });

    loadTasks();
  }

  async function removeTask(id) {
    await deleteTask(id);
    loadTasks();
  }

  function startEdit(task) {
    setEditId(task.id);
    setEditText(task.title);
  }

  async function saveEdit(id) {
    if (!editText.trim()) return;

    await updateTask(id, {
      title: editText
    });

    setEditId(null);
    setEditText("");
    loadTasks();
  }

  return (
    <div className="todo-page">
      <div className="todo-container">

        <div className="todo-header">
          <h2>Todo List</h2>
          <div>
            <span>{user}</span>
            <button onClick={logout}>Logout</button>
          </div>
        </div>

        <div className="todo-add">
          <input
            placeholder="New task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <ul className="todo-list">
          {tasks.map((t) => (
            <li key={t.id} className="todo-item">

              <input
                type="checkbox"
                checked={t.marked_as_done}
                onChange={() => toggleDone(t)}
              />

              {editId === t.id ? (
                <>
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(t.id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span className={t.marked_as_done ? "done" : ""}>
                    {t.title}
                  </span>

                  <button onClick={() => startEdit(t)}>Edit</button>
                  <button onClick={() => removeTask(t.id)}>Delete</button>
                </>
              )}

            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}