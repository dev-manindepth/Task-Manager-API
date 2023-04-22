import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  getTasksByPriority,
  updateTask,
} from "../controller/tasks.controller.js";

const router = express.Router();

router.get("/", getAllTasks);
router.get("/:id", getTask);
router.get("/priority/:level", getTasksByPriority);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
