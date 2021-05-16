const Task = require("./task.model");

let tasks = [
  new Task({
    title: 'title',
    order: 0,
    description: 'description',
    userId: 1,
    boardId: '1',
    columnId: 1
  }),
  new Task({
    title: 'title2',
    order: 0,
    description: 'description2',
    userId: 1,
    boardId: '1',
    columnId: 1
  }),
];

const getAll = async () => tasks;

const getAllForBoard = async (boardId) => tasks.filter((task) => task.boardId === boardId)

const getAllForUser = async (userId) => tasks.filter((task) => task.userId === userId)

const getById = async (id) => tasks.find((task) => task.id === id);

const getForBoardById = async (boardId, id) => tasks.find((task) => task.boardId === boardId && task.id === id)

const insert = async (task) => {
  tasks.push(task);
  return task;
};

const update = async (updatedTask) => {
  tasks = tasks.map((task) => task.id === updatedTask.id ? updatedTask : task);
  return updatedTask;
}

const remove = async (taskToDelete) => {
  tasks = tasks.filter((task) => task.id !== taskToDelete.id);
  return taskToDelete;
}

module.exports = {
  getAll,
  getAllForBoard,
  getAllForUser,
  getById,
  getForBoardById,
  insert,
  update,
  remove,
};