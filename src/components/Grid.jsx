import React, { useState } from "react";

// Redux
import { DeleteTodo } from "../redux/todoReducer";
import { useSelector, useDispatch } from "react-redux";

// React Icons
import { FaEdit, FaTrash, FaPlus, FaFilter, FaTimes } from "react-icons/fa";

// Components
import Modal from "./Modal";
import FormGrid from "./FormGrid";
import Button from "./Button";

const Grid = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.Todos);

  const [searchValue, setSearchValue] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);

  // For Edit
  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setSelectedTodo(todoToEdit);
    setIsModalOpen(true);
  };

  // For Delete
  const handleDelete = (id) => {
    dispatch(DeleteTodo(id));
  };

  const handleCheckboxChange = (itemId) => {
    if (checkedItems.includes(itemId)) {
      setCheckedItems(checkedItems.filter((id) => id !== itemId));
    } else {
      setCheckedItems([...checkedItems, itemId]);
    }
  };

  const handleNewTask = () => {
    setSelectedTodo(null);
    setIsModalOpen(true);
  };

  const handleClearTasks = () => {
    localStorage.removeItem("todos");
    window.location.reload();
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col justify-between items-center gap-5 my-5 text-white md:flex-row md:p-5">
        <div className="flex flex-col gap-5 items-center md:w-full p-4 rounded-lg shadow-md">
          <div className="flex flex-row gap-5 items-center md:w-full p-4 ">
            <label className="text-3xl font-bold mb-2 md:mb-0">Search: </label>
            <input
              type="text"
              placeholder="Search by Name 'Task Name'"
              className="border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-blue-500 w-full text-black"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="flex justify-between flex-col items-center sm:flex-row gap-5 md:w-full p-4">
            <Button
              className="flex gap-2 justify-center items-center mx-5 p-4 bg-white border border-gray-300  rounded-lg shadow-md transition-transform transform hover:scale-105 text-blue-500 text-lg font-semibold"
              onClick={() => setShowCompleted(!showCompleted)}
              icon={<FaFilter className="mr-2" />}
              btnName={
                showCompleted ? "Show All Tasks" : "Show Incomplete Tasks"
              }
            />
            <Button
              className="flex gap-2 justify-center items-center mx-5 p-4 bg-white border border-gray-300  rounded-lg shadow-md transition-transform transform hover:scale-105 text-blue-500 text-lg font-semibold"
              onClick={handleClearTasks}
              icon={<FaTimes className="mr-2" />}
              btnName={"Clear all Tasks"}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleNewTask}
          className="flex gap-2 justify-center items-center mx-5 p-4 bg-white border border-gray-300  rounded-lg shadow-md transition-transform transform hover:scale-105 text-blue-500 text-lg font-semibold"
          icon={<FaPlus />}
          btnName={"Add New Task"}
        />
      </div>
      <div className="m-3 p-2 overflow-hidden grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:p-15">
        {[...todos]
          .filter((item) =>
            item.todoName.toLowerCase().includes(searchValue.toLowerCase())
          )
          .filter((item) =>
            showCompleted ? true : !checkedItems.includes(item.id)
          )
          .sort((a, b) => {
            const aIsChecked = checkedItems.includes(a.id);
            const bIsChecked = checkedItems.includes(b.id);

            if (aIsChecked && !bIsChecked) {
              return 1;
            } else if (!aIsChecked && bIsChecked) {
              return -1;
            }
            return 0;
          })
          .map((item) => (
            <div
              key={item.id}
              className={`mx-5 p-4 border border-gray-300 ${
                checkedItems.includes(item.id) ? "bg-red-200" : "bg-white"
              } rounded-lg shadow-md transition-transform transform hover:scale-105`}
            >
              <div className="flex justify-between items-center mb-4">
                <input
                  type="checkbox"
                  id={`checkbox-${item.id}`}
                  checked={checkedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="mr-2 cursor-pointer"
                />
                <div
                  className={`text-lg font-semibold ${
                    checkedItems.includes(item.id)
                      ? "line-through text-gray-500"
                      : "text-black"
                  }`}
                >
                  {item.todoName}
                </div>
              </div>

              <div className="flex flex-col justify-between items-center mb-2 space-x-2 gap-2 sm:flex-row">
                <span
                  className={`p-2 px-5 rounded-full w-full text-center text-white ${
                    item.todoStatus === "Normal"
                      ? "bg-blue-400"
                      : item.todoStatus === "Critical"
                      ? "bg-red-400"
                      : item.todoStatus === "High"
                      ? "bg-orange-400"
                      : item.todoStatus === "Medium"
                      ? "bg-yellow-400"
                      : item.todoStatus === "Low"
                      ? "bg-green-400"
                      : "bg-gray-400"
                  }`}
                >
                  {item.todoStatus}
                </span>
                <span
                  className={`p-2 px-5 rounded-full w-full text-center ${
                    item.todoType === "Global"
                      ? "bg-blue-200"
                      : item.todoType === "Work"
                      ? "bg-yellow-200"
                      : item.todoType === "Study"
                      ? "bg-red-200"
                      : item.todoType === "Sports"
                      ? "bg-green-200"
                      : item.todoType === "Other"
                      ? "bg-orange-200"
                      : "bg-gray-200"
                  }`}
                >
                  {item.todoType}
                </span>
              </div>

              <div className="flex justify-between mt-5">
                <Button
                  className="flex items-center text-blue-500 font-bold text-lg hover:underline"
                  onClick={() => handleEdit(item.id)}
                  icon={<FaEdit className="mr-2" />}
                  btnName={"Edit"}
                />
                <Button
                  className="flex items-center text-red-500 font-bold text-kg hover:underline ml-2"
                  onClick={() => handleDelete(item.id)}
                  icon={<FaTrash className="mr-2" />}
                  btnName={"Delete"}
                />
              </div>
            </div>
          ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FormGrid
          onClose={() => setIsModalOpen(false)}
          onSave={() => setIsModalOpen(false)}
          initialData={selectedTodo}
        />
      </Modal>
    </div>
  );
};

export default Grid;
