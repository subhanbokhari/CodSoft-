import React, { useState } from "react";
import TextBox from "./../text-box/text-box";
import "./todolist.css";

const Todolist = () => {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value) {
      setList((prevList) => [...prevList, value]);
      setValue("");
    }
  };

  const handleRemoveItem = (index) => {
    setList((prevList) => prevList.filter((_, idx) => idx !== index));
  };

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <div className="todolist-container">
      <div className="header">
        <h1>To-do List</h1>
        <form onSubmit={handleSubmit}>
          <TextBox
            type="text"
            placeholder="Task"
            value={value}
            onChange={handleChange}
          />
          <input type="submit" value="Add" className="btnSubmit" />
        </form>
      </div>
      <div className="list-items">
        <ul>
          {list.map((item, index) => (
            <li key={index}>
              {item}
              <span onClick={() => handleRemoveItem(index)}>&#10006;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
