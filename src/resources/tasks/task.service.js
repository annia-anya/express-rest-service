const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

const getAllForBoard = (boardId) => tasksRepo.getAllForBoard(boardId);

const getForBoardById = (boardId, id) => tasksRepo.getForBoardById(boardId, id);

const create = (params) => {
  const newTask = new Task(params);
  return tasksRepo.insert(newTask);
};

const update = async (boardId, taskId, params) => {
  const task = await tasksRepo.getForBoardById(boardId, taskId);
  if (!task) {
    throw new Error(`Task with id: ${taskId} & boardId: ${boardId} doesn't exist`);
  }
  const updatedTask = new Task({...task, ...params});
  return tasksRepo.update(updatedTask);
};

const remove = async (boardId, taskId) => {
  const task = await tasksRepo.getForBoardById(boardId, taskId);
  if (!task) {
    throw new Error(`Task with id: ${taskId} & boardId: ${boardId} doesn't exist`);
  }
  return tasksRepo.remove(task);
};

module.exports = {
  getAllForBoard,
  getForBoardById,
  create,
  update,
  remove,
};
