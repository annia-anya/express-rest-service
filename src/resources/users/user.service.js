const User = require('./user.model');
const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.getById(id);

const create = (params) => {
  if (!params.login) {
    throw new Error('Login is required');
  }

  if (!params.name) {
    throw new Error('Name is required');
  }

  if (!params.password) {
    throw new Error('Password is required');
  }

  const newUser = new User(params);
  return usersRepo.insert(newUser);
};

const update = async (userId, params) => {
  const user = await usersRepo.getById(userId);
  if (!user) {
    throw new Error(`User with id: ${userId} doesn't exist`);
  }
  const updatedUser = new User({...user, ...params});
  return usersRepo.update(updatedUser);
};

const remove = async (userId) => {
  const user = await usersRepo.getById(userId);
  if (!user) {
    throw new Error(`User with id: ${userId} doesn't exist`);
  }
  return usersRepo.remove(user);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
