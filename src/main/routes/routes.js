const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser,login,verify } = require('../../presentation/controllers/userController')
const router = express.Router()



router.get('/', (req, resp) => {
    resp.json({info: 'teste'})
})
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)
router.post('/login',login)
router.get('/',verify)


module.exports = router