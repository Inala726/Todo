import { useEffect, useState } from "react";
import { TodoProps } from "./types";
import { v4 as uuidv4 } from "uuid";
import { BiTrash, BiEdit } from "react-icons/bi";
import './custom-styles.css';

const Todo = () => {
  const [todo, setTodo] = useState<TodoProps[]>([]);
  const [items, setItems] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todolist");
    if (storedTodos) {
      setTodo(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todo));
  }, [todo]);

  const addTodo = (text: string) => {
    const newItem: TodoProps = {
      id: uuidv4(),
      text,
      completed: false,
    };
    setTodo([...todo, newItem]);
  };

  const deleteTodo = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      setTodo(todo.filter((item) => item.id !== id));
    }
  };

  const toggleComplete = (id: string) => {
    setTodo(
      todo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (id: string, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTodo(todo.map(item => item.id === editId ? { ...item, text: editText } : item));
    setEditId(null);
    setEditText("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.trim()) {
      addTodo(items);
      setItems("");
    } else {
      throw new Error("Please fill in the field");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col max-sm:items-start max-sm:justify-start max-sm:w-full">
      
      <div className="bg-[#1f1e1e] flex flex-col w-[80%] gap-5 p-10 mx-8 mt-11 rounded-lg max-sm:mx-0 max-sm:mt-0 max-sm:bg-transparent max-sm:p-4 max-sm:w-full max-sm:gap-3">
      <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 hidden max-sm:block max-sm:mt-2">
          To Do
        </span>
        <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 max-sm:hidden">
          Whats the plan for today
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between rounded-lg bg-inherit border-2 border-[#111] w-full"
        >
          <input
            type="text"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            className="p-2 bg-transparent outline-none text-xl"
            placeholder="Add a todo"
          />
          <button className="px-7 h-[50px] text-xl bg-[#111] transition ease-in-out duration-300 max-sm:hidden">
            Add
          </button>
          <button className="hidden max-sm:block px-3 h-[50px] text-xl bg-[#111] transition ease-in-out duration-300 max-sm:text-2xl">
            +
          </button>
        </form>
        <ul className="text-xl rounded-lg ">
          {todo.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg bg-inherit text-[18px] mb-2 max-sm:bg-[#1f1e1e]"
            >
              {editId === item.id ? (
                <form onSubmit={handleEditSubmit} className="flex items-center gap-2 w-full ">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex justify-between h-[30px] bg-transparent outline-none text-xl w-full"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-4 max-sm:bg-[#1f1e1e]">
                    <span
                      className={`w-[20px] h-[20px] rounded-[50%] border  border-green-400 ${
                        item.completed ? "bg-green-300" : ""
                      }`}
                      onClick={() => toggleComplete(item.id)}
                      style={{ cursor: "pointer" }}
                    ></span>
                    <p className={`${item.completed ? "line-through" : ""} max-sm:bg-[#1f1e1e]`}>{item.text}</p>
                  </div>
                  <div className="flex items-center gap-2 max-sm:bg-[#1f1e1e]">
                    <BiEdit
                      fill="#fff"
                      size={20}
                      onClick={() => handleEdit(item.id, item.text)}
                      className="max-sm:bg-[#1f1e1e]"
                      style={{ cursor: "pointer" }}
                    />
                    <BiTrash
                      fill="#c44141"
                      size={20}
                      className="max-sm:bg-[#1f1e1e]"
                      onClick={() => deleteTodo(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
