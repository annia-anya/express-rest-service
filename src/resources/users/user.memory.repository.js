const User = require('./user.model');

let users = [
  new User({ name: 'Anna', login: 'anna' })
];

const getById = async (id) => users.find((user) => user.id === id);

const getAll = async () => users;

const insert = async (user) => {
  users.push(user);
  return user;
};

const update = async (updatedUser) => {
  users = users.map((user) => user.id === updatedUser.id ? updatedUser : user);
  return updatedUser;
}

const remove = async (userToDelete) => {
  users = users.filter((user) => user.id !== userToDelete.id);
  return userToDelete;
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
