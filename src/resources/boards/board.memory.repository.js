const Board = require("./board.model");
const Column = require("./column.model");

let boards = [
  new Board({
    title: 'board1',
    columns: [
      new Column({ title: 'backlog', order: 0 }),
      new Column({ title: 'in progress', order: 1 }),
      new Column({ title: 'qa', order: 2 }),
      new Column({ title: 'deployed', order: 3 }),
    ]
  }),
  new Board({
    title: 'board2',
    columns: [
      new Column({ title: 'backlog', order: 0 }),
      new Column({ title: 'in progress', order: 1 }),
      new Column({ title: 'qa', order: 2 }),
      new Column({ title: 'deployed', order: 3 }),
    ]
  })
];

const getAll = async () => boards

const getById = async (id) => boards.find((board) => board.id === id);

const insert = async (board) => {
  boards.push(board);
  return board;
};

const update = async (updatedBoard) => {
  boards = boards.map((board) => board.id === updatedBoard.id ? updatedBoard : board);
  return updatedBoard;
}

const remove = async (boardToDelete) => {
  boards = boards.filter((board) => board.id !== boardToDelete.id);
  return boardToDelete;
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};