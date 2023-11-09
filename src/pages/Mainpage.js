import React, { useState, useEffect } from "react";
import "./Mainpage.css";
import TodoItem from "../components/TodoItem";
import Filter from "../components/Filter";
import Todo from "../api/todos";

export default function Mainpage() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [progress, setProGress] = useState(0);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [select, setSelect] = useState("All");

  const calculateProgress = (todo) => {
    let completedCount = 0;
    let completedProgress = 0;
    if (todo) {
      for (let i = 0; i < todo.length; i++) {
        if (todo[i].completed == true) {
          completedCount += 1;
        }
      }
      completedProgress = (completedCount / todo.length) * 100;
      setProGress(completedProgress);
      setCount(completedCount);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const fetchTodo = async () => {
    try {
      await Todo.getTodo().then((res) => {
        setTodos(res);
        calculateProgress(res);
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      await Todo.addTodo(input).then(() => {
        fetchTodo();
        setInput("");
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const updateData = (childData) => {
    setUpdate(childData);
  };

  const filterData = (children) => {
    setSelect(children);
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  useEffect(() => {
    fetchTodo();
    setUpdate(false);
  }, [update]);

  useEffect(() => {
    calculateProgress();
  }, []);

  return (
    <div className="mainpage">
      <div className="todo-container">
        <div className="progress-container">
          <h1>Progress</h1>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="completed">{count} completed</div>
        </div>
        <div className="tasks">
          <h2>Tasks</h2>
          <Filter filterData={filterData} />
        </div>
        <div className="tasks-item">
          {select == "All"
            ? todos.map((todo, index) => (
                <div key={index}>
                  <TodoItem todo={todo} updateData={updateData} />
                </div>
              ))
            : select == "Done"
            ? todos
                .map((todo, index) => (
                  todo.completed ? (
                    <div key={index}>
                      <TodoItem todo={todo} updateData={updateData} />
                    </div>
                  ) : null
                ))
            : todos
                .map((todo, index) => (
                  !todo.completed ? (
                    <div key={index}>
                      <TodoItem todo={todo} updateData={updateData} />
                    </div>
                  ) : null
                ))}
          <div className="add-task">
            <input
              type="text"
              placeholder="Add your todo..."
              value={input}
              onChange={handleInputChange}
            />
            {input.length > 0 ? (
              <div className="add-btn" onClick={addTodo}>
                Add
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
