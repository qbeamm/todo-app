import React, { useState, useEffect } from "react";
import "./TodoItem.css";
import dots from "../assets/dots.svg";
import checked from "../assets/checked.svg";
import Todo from "../api/todos";

export default function TodoItem(props) {
  const [todo, setTodo] = useState(props.todo);
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleCheckboxChange = () => {
    setTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
    setIsModal(!isModal);
  };

  const handleInputChange = (e) => {
    setTodo({
      ...todo,
      title: e.target.value,
    });
  };

  const save = () => {
    setIsEdit(!isEdit);
  };

  const editTodoItem = async () => {
    try {
      await Todo.editTodo(todo);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const deleteTodoItem = async () => {
    toggleModal();
    try {
      await Todo.deleteTodo(todo);
      props.updateData(true);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    editTodoItem();
    props.updateData(true);
  }, [todo.completed]);

  useEffect(() => {
    if (!isEdit) {
      editTodoItem();
      props.updateData(true);
    }
  }, [isEdit]);

  return (
    <div className="cb-container">
      <label>
        {!isEdit ? (
          <div className={todo.completed ? "cb-checked" : "cb"}>
            <img className="img-checked" src={checked} alt="checked" />
          </div>
        ) : null}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
        <input
          type="text"
          value={todo.title}
          onChange={handleInputChange}
          disabled={!isEdit}
          className={todo.completed ? "checked" : ""}
        />
      </label>
      {isEdit ? (
        <div className="save-btn" onClick={save}>
          Save
        </div>
      ) : (
        <div className="dots">
          <img src={dots} alt="dots" onClick={toggleModal} />
          {isModal ? (
            <div className="modal">
              <div className="modal-item" onClick={toggleEdit}>
                Edit
              </div>
              <div
                className="modal-item"
                style={{ color: "red" }}
                onClick={deleteTodoItem}
              >
                Delete
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
