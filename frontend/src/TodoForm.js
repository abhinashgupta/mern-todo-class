import React, { useState } from 'react'
import axios from 'axios'

const TodoForm = () => {

  const [formdata , setFormData] = useState({name: '' , email: '' , description : '' , status :''})

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/createTodo", formdata).then(() => {
      alert("User Created Successfully");
      window.location.reload();
    })
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };


  return (
    <div>
      <h2>Create Todo</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="userId" onChange={handleInputChange} />
        <input
          type="text"
          name="name"
          placeholder="Enter Todo Title"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Todo Email"
          onChange={handleInputChange}
        />
        <input
          type="description"
          name="description"
          placeholder="Enter Todo description"
          onChange={handleInputChange}
        />
        <select
          name="status"
          id=""
          onChange={handleInputChange}
        >
          <option name="status">
            Pending
          </option>
          <option name="status">
            Done
          </option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default TodoForm
