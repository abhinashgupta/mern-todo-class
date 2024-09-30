import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import TodoForm from "./TodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/todo")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log("Error on fetching data", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/deleteTodo/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id)); 
        alert("Todo Task Deleted");
      })
      .catch((error) => {
        console.log("Error deleting task", error);
      });
  };

  const handleUpdate = (todo) => {
    setEditTodo(todo); 
  };

  return (
    <div className="App">
      <h1>MERN TODO APPLICATION</h1>
      <TodoForm
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        todos={todos}
        setTodos={setTodos}
      />
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <h3>{todo.name}</h3>
            <h3>{todo.email}</h3>
            <h3>{todo.description}</h3>
            <h3>Status: {todo.status}</h3>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
            <button onClick={() => handleUpdate(todo)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
