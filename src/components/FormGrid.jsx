import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { AddTodo, UpdateTodo } from "../redux/todoReducer";

// React Hook Form
import { useForm } from "react-hook-form";

// Components
import Button from "./Button";

const FormGrid = ({ onClose, onSave, initialData }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.Todos);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  // Submit handler
  const onSubmit = (data) => {
    onSave(data);
    if (initialData) {
      dispatch(UpdateTodo(data));
    } else {
      dispatch(
        AddTodo({
          id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
          ...data,
        })
      );
    }
    onClose();
  };

  //   handle value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  return (
    <form
      className="bg-white rounded-lg shadow-md p-5 m-5 md:w-[450px] lg:w-[675px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Task</h2>
      <div className="mb-4">
        <label
          htmlFor="todoName"
          className="block text-sm font-medium text-gray-600"
        >
          Task Name
        </label>
        <input
          type="text"
          id="todoName"
          name="todoName"
          placeholder="What's your Task"
          {...register("todoName", {
            required: "Please enter the task name",
          })}
          className={`mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500 ${
            errors.todoName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.todoName && (
          <p className="mt-1 text-sm text-red-500">{errors.todoName.message}</p>
        )}
      </div>

      {/* Todo Type */}
      <div className="mb-4">
        <label
          htmlFor="todoType"
          className="block text-sm font-medium text-gray-600"
        >
          Todo Type
        </label>
        <select
          id="todoType"
          name="todoType"
          {...register("todoType")}
          onChange={handleChange}
          className={
            "mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          }
        >
          <option value="Global">Global</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Sports">Sports</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Todo Status */}
      <div className="mb-4">
        <label
          htmlFor="todoStatus"
          className="block text-sm font-medium text-gray-600"
        >
          Todo Status
        </label>
        <select
          id="todoStatus"
          name="todoStatus"
          {...register("todoStatus")}
          onChange={handleChange}
          className={
            "mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
          }
        >
          <option value="Normal">Normal</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="flex justify-center md:justify-end gap-5">
        <Button
          className="bg-blue-500 text-white px-8 py-3 rounded-lg transition-all duration-500 hover:bg-blue-400"
          btnName={"Save"}
          type={"submit"}
        />
        <Button
          className="bg-red-500 text-white px-8 py-3 rounded-lg transition-all duration-500 hover:bg-red-400"
          onClick={onClose}
          btnName={"Cancel"}
        />
      </div>
    </form>
  );
};

export default FormGrid;
