const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../../presentation/controllers/userController')
const router = express.Router()



router.get('/', (req, resp) => {
    resp.json({info: 'teste'})
})
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.post('/adicionar-usuario', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)


module.exports = router