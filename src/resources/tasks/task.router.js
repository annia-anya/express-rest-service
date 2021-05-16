const router = require('express').Router();
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAllForBoard(req.parentParams.boardId);
  // map user fields to exclude secret fields like "password"
  res.status(200).json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const task = await taskService.getForBoardById(req.parentParams.boardId, req.params.taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const task = await taskService.create({ ...req.body, boardId: req.parentParams.boardId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).send({ errors: [error.message] })
  }
});

router.route('/:taskId').put(async (req, res) => {
  try {
    const task = await taskService.update(req.parentParams.boardId, req.params.taskId, req.body);
    res.json(task);
  } catch (error) {
    res.status(400).send({ errors: [error.message] });
  }
});

router.route('/:taskId').delete(async (req, res) => {
  try {
    await taskService.remove(req.parentParams.boardId, req.params.taskId);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).send({ errors: [error.message] });
  }
});

module.exports = router;