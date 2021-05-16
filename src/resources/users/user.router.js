const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.status(200).json(users.map(User.toResponse));
});

router.route('/:userId').get(async (req, res) => {
  const user = await usersService.getById(req.params.userId);
  if (user) {
    res.status(200).json(User.toResponse(user));
  } else {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.create(req.body);
    res.status(201).json(User.toResponse(user));
  } catch (error) {
    res.status(400).send({ errors: [error.message] })
  }
});

router.route('/:userId').put(async (req, res) => {
  try {
    const user = await usersService.update(req.params.userId, req.body);
    res.json(User.toResponse(user));
  } catch (error) {
    res.status(400).send({ errors: [error.message] });
  }
});

router.route('/:userId').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).send({ errors: [error.message] });
  }
});

module.exports = router;