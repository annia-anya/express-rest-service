const Board = require('./board.model');
const Column = require('./column.model');
const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const create = (params) => {
  if (!params.title) {
    throw new Error('Title is required');
  }

  if (!params.columns) {
    throw new Error('Columns is required');
  }

  const columns = params.columns.map((columnParams) => new Column(columnParams));
  const newBoard = new Board({ title: params.title, columns });
  return boardsRepo.insert(newBoard);
};

const update = async (boardId, params) => {
  let paramsCopy = params;
  const board = await boardsRepo.getById(boardId);
  if (!board) {
    throw new Error(`board with id: ${boardId} doesn't exist`);
  }
  if (paramsCopy.columns) {
    const columns = paramsCopy.columns.map((columnParams) => new Column(columnParams));
    paramsCopy = { ...paramsCopy, columns };
  }
  const updatedBoard = new Board({...board, ...paramsCopy});
  return boardsRepo.update(updatedBoard);
};

const remove = async (boardId) => {
  const board = await boardsRepo.getById(boardId);
  if (!board) {
    throw new Error(`Board with id: ${boardId} doesn't exist`);
  }
  const tasksToDelete = await tasksRepo.getAllForBoard(boardId);
  tasksToDelete.forEach((task) => tasksRepo.remove(task));
  return boardsRepo.remove(board);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
