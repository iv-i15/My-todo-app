import { useState, useEffect } from "react";
import TodoList from "./app_components/TodoList";
import "./app_components/App.css";

function App() {
  const [inputValue, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);

      if (parsed.length > 0) {
        const fixedTodos = parsed.map(todo => ({
          ...todo,
          completedAt: todo.completedAt ? new Date(todo.completedAt) : null
        }));

        setTodos(fixedTodos);
        return;
      }
    }

    async function fetchTodos() {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();

      setTodos(
        data.map(todo => ({
          userId: todo.userId,
          id: todo.id,
          text: todo.title,
          completed: todo.completed,
          completedAt: null
        }))
      );
    }

    fetchTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [selectedUser, setSelectedUser] = useState("all");
  const userIds = [...new Set(todos.map(todo => todo.userId))].sort((a, b) => a - b);

  const [sortUncompleted, setSortUncompleted] = useState("asc");
  const [sortCompleted, setSortCompleted] = useState("asc");

  const [sortCompletedBy, setSortCompletedBy] = useState("text");

  const handleToggle = (id) => {
    setTodos(
      todos.map((t)=>{
        if (t.id === id) {
          const newCompleted = !t.completed;

          return {
            ...t,
            completed: newCompleted,
            completedAt: newCompleted ? new Date() : null
          };
        }
        return t;
      })
    );
  }

  const handleDelete = (id) => {
    setTodos(
      todos.filter((t) => t.id!== id)
    );
  }

  return (
    <div>
      <div className="header">
        <img src="/src/assets/img.jpg" alt="header" />

        <h1 className="header-title">My Todo App</h1>

        <div className="header-user">
          <div className="user_filter">
            <label>filter by User:</label>
            <select onChange={(e) => setSelectedUser(e.target.value)}>
              <option value="all">All</option>
              {userIds.map(id => (
                <option key={id} value={id}>
                  User {id}
                </option>
              ))}
            </select>
          </div>

        <div className="add_todo">
          <label>add new todo:</label>
          <div className="input-row">
            <input 
            value={inputValue}
            onChange={(e) => setValue(e.target.value)}/>

            <button onClick={() => {
              if (inputValue === "") return;
              setTodos([...todos, {
                userId: selectedUser ==="all" ? 1: Number(selectedUser),
                id:Date.now(),
                text: inputValue,
                completed: false,
                completedAt: null
              }])
              setValue("")
            }}>Add</button>
          </div>
        </div>
      </div>
      </div>


      <div className="lists">
        <div>
          <h2 className="list_title">Uncompleted</h2>
            <div className="sort_group">
              <label>sort:</label>
              <select onChange = {(e)=> setSortUncompleted(e.target.value)}>
                <option value="asc">A → Z</option>
                <option value="desc">Z → A</option>
              </select> 
            </div>
          
            <TodoList
              todos={todos}
              selectedUser={selectedUser}
              sortOrder={sortUncompleted}
              showCompleted={false}
              onToggle={handleToggle}
              onDelete={handleDelete}
              sortCompletedBy={sortCompletedBy}
            />
        </div>

        <div>
          <h2 className="list_title">Completed</h2>
            <div className="sort_group">
              <label>sort by:</label>
              <select onChange={(e) => setSortCompletedBy(e.target.value)}>
                <option value="text">Text</option>
                <option value="date">Date</option>
              </select>
            </div>

            <div className="sort_group">
              <label>sort:</label>
              <select onChange = {(e)=> setSortCompleted(e.target.value)}>
                <option value="asc">A → Z</option>
                <option value="desc">Z → A</option>
              </select> 
            </div>

            <TodoList
              todos={todos}
              selectedUser={selectedUser}
              sortOrder={sortCompleted}
              showCompleted={true}
              onToggle={handleToggle}
              onDelete={handleDelete}
              sortCompletedBy={sortCompletedBy}

            />
        </div>
      </div>
    </div>
  );
}

export default App;