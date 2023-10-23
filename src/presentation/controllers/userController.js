const { UserRepository } = require("../../infra/db/repository/usersRepository.js")
const {User} = require("../../infra/settings.js")


const getUsers = (req, resp) => {
    const userRepository = new UserRepository()
    userRepository.getAllUsers(req, resp)
}
  
const getUserById = (req, resp) => {
  const userRepository = new UserRepository()
  userRepository.getOneUser(req, resp)
}
  
const createUser = (req, resp) => {
  const userRepository = new UserRepository()
  userRepository.insertUser(req, resp)
}
  
const updateUser = (req, resp) => {
  const userRepository = new UserRepository()
  userRepository.updateUser(req, resp)
}
  
const deleteUser = (req, resp) => {
  const userRepository = new UserRepository()
  userRepository.deleteUser(req, resp)
}
const login = (req, resp) => {
  const userRepository = new UserRepository()
  userRepository.login(req, resp)
}
const verify = (req, resp, next) => {
  const userRepository = new UserRepository()
  userRepository.authorize(req, resp, next)
}

  
  
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    verify,
}