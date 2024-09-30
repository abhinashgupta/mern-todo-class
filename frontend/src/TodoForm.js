import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoForm = ({ editTodo, setEditTodo, todos, setTodos }) => {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    status: "Pending",
  });

  useEffect(() => {
    if (editTodo) {
      setFormData({
        name: editTodo.name,
        email: editTodo.email,
        description: editTodo.description,
        status: editTodo.status,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        description: "",
        status: "Pending",
      });
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTodo) {
      // Update existing todo
      axios
        .put(`http://localhost:3000/updateTodo/${editTodo._id}`, formdata)
        .then((response) => {
          alert("Todo Updated Successfully");
          setTodos(
            todos.map((todo) =>
              todo._id === editTodo._id ? response.data : todo
            )
          );
          setEditTodo(null);
        })
        .catch((error) => {
          console.log("Error Updating Todo", error);
        });
    } else {
      // Create a new todo
      axios
        .post("http://localhost:3000/createTodo", formdata)
        .then((response) => {
          alert("Todo Created Successfully");
          setTodos([...todos, response.data]);
          setFormData({
            name: "",
            email: "",
            description: "",
            status: "Pending",
          });
        })
        .catch((error) => {
          console.log("Error Creating Todo", error);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  return (
    <div>
      <h2>{editTodo ? "Update Todo" : "Create Todo"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formdata.name}
          placeholder="Enter Todo Title"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={formdata.email}
          placeholder="Enter Todo Email"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          value={formdata.description}
          placeholder="Enter Todo Description"
          onChange={handleInputChange}
        />
        <select
          name="status"
          value={formdata.status}
          onChange={handleInputChange}
        >
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit">{editTodo ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default TodoForm;
