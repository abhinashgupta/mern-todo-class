import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3000/todo").then((response) => {
      setTodos(response.data);
    }).catch((error) => {
      console.log("Error on fetching data" , error);
    })
  }, []);

  return (
    <div className="App">
      <h1>MERN TODO APPLICATION</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <h3>{todo.name}</h3>
            <h3>{todo.email}</h3>
            <h3>{todo.description}</h3>
            <h3>Status : {todo.status}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

