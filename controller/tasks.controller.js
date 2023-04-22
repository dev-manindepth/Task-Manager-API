import { tasks } from "../data/data.js";
import { generateId } from "../helpers/generateId.js";
import { validator } from "../helpers/validator.js";

export const getAllTasks = async (req, res) => {
  // Get all query parameters
  let { completed, sortBy, priority } = req.query;

  let filteredTasks = tasks;

  // Filter by completion status
  if (completed !== undefined && (completed == true || completed == false)) {
    filteredTasks = filteredTasks.filter(
      (task) => task.completed === completed
    );
  }

  // Filter by priority level
  if (
    priority !== undefined &&
    (priority == "low" || priority == "medium" || priority == "high")
  ) {
    filteredTasks = filteredTasks.filter((task) => task.priority == priority);
  }

  // Sort by creation date
  if (sortBy !== undefined && sortBy === "createdAt") {
    filteredTasks = filteredTasks.sort(
      (task1, task2) => new Date(task2.createdAt) - new Date(task1.createdAt)
    );
  }
  const responseObj = {
    status: "success",
    message: filteredTasks.length ? "Available Tasks" : "No Tasks Available ",
    data: filteredTasks,
  };
  return res.status(200).json(responseObj);
};

export const getTask = async (req, res) => {
  const { id } = req.params;
  const task = tasks.filter((task) => task.id == id);
  if (!task.length) {
    return res.status(400).json({ status: "fail", message: "Invalid Id" });
  }
  const responseObj = {
    status: "success",
    message: task ? "Available Task" : "No Task exits for this id ",
    data: task,
  };
  return res.status(200).json(responseObj);
};

export const getTasksByPriority = async (req, res) => {
  const { level } = req.params;

  let filteredTasks;
  if (level && (level == "low" || level == "medium" || level == "high")) {
    filteredTasks = tasks.filter((task) => task.priority === level);
  } else {
    return res.status(400).json({
      status: "fail",
      message: `Invalid level , level must be only "low", "medium" or "high"`,
    });
  }

  const responseObj = {
    status: "success",
    message: filteredTasks.length
      ? `Tasks with priority ${level} Found`
      : `No tasks with priority ${level}`,
    data: filteredTasks,
  };

  return res.status(200).json(responseObj);
};

export const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  if (validator(title, description, priority)) {
    return res.status(400).json(validator(title, description, priority));
  }
  const id = generateId();
  const newTask = {
    id,
    title,
    description,
    priority,
    createdAt: new Date().toDateString(),
    completed: false,
  };
  tasks.push(newTask);
  res
    .status(200)
    .json({ status: "success", message: "task created", task: newTask });
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, completed } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id == id);
  if (taskIndex === -1) {
    return res.status(400).json({ status: "fail", message: "Invalid id" });
  }

  if (validator(title, description, priority, completed)) {
    return res
      .status(400)
      .json(validator(title, description, priority, completed));
  }

  const payload = { title, description, priority };
  if (completed !== undefined) {
    payload.completed = completed;
  }
  const updatedTask = { ...tasks[taskIndex], ...payload };
  tasks[taskIndex] = updatedTask;
  return res.status(201).json({
    status: "success",
    message: "Updated successfully",
    data: updatedTask,
  });
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const taskIndexToRemove = tasks.findIndex((task) => task.id == id);
  if (taskIndexToRemove !== -1) {
    tasks.splice(taskIndexToRemove, 1);
    return res
      .status(204)
      .json({ status: "success", message: "Task deleted successfully" });
  } else {
    return res.status(400).json({ status: "success", message: "Invalid Id" });
  }
};
