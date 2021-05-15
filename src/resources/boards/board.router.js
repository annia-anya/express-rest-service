const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(200).json(boards);
});

router.route('/:boardId').get(async (req, res) => {
  const board = await boardsService.getById(req.params.boardId);
  if (board) {
    res.status(200).json(board);
  } else {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const board = await boardsService.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    res.status(400).send({ errors: [error.message] })
  }
});

router.route('/:boardId').put(async (req, res) => {
  try {
    const board = await boardsService.update(req.params.boardId, req.body);
    res.json(board);
  } catch (error) {
    res.status(400).send({ errors: [error.message] });
  }
});

router.route('/:boardId').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.boardId);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).send({ errors: [error.message] });
  }
});

module.exports = router;