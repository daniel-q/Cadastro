const {User} = require("../../settings.js")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();





class UserRepository{
    async getAllUsers(req, resp) {
        try {
          const users = await User.findAll();
          resp.status(200).json(users);
        } catch (error) {
          // Lidar com erros de consulta, se houver
          console.error(error);
          resp.status(500).json({ error: 'Erro ao buscar usuários.' });
        }
      }
      async getOneUser(req, resp) {
        try {
          const id = parseInt(req.params.id);
          const user = await User.findByPk(id);
          if (user) {
            resp.status(200).json(user);
          } else {
            resp.status(404).json({ error: 'Usuário não encontrado.' });
          }
        } catch (error) {
          console.error(error);
          resp.status(500).json({ error: 'Erro ao buscar o usuário.' });
        }
      }
      async insertUser(req, resp) {
        try {
          const {usernamevalue, emailvalue, passwordvalue,cepvalue,estadovalue,cidadevalue,bairrovalue,ruavalue,numerovalue,complementovalue } = req.body;
          const password = bcrypt.hashSync(passwordvalue, bcrypt.genSaltSync(10))

          const newUser = await User.create({
            nome: usernamevalue,
            email: emailvalue,
            senha: password,
            cep: cepvalue,
            estado: estadovalue,
            cidade: cidadevalue,
            bairro: bairrovalue,
            rua: ruavalue,
            numero: numerovalue,
            complemento: complementovalue,
          });
          resp.status(201).json(newUser);
        } catch (error) {
          console.error(error);
          resp.status(500).json({ error: 'Erro ao adicionar usuário.' });
        }
      }

    async  updateUser(req, resp) {
        const id = parseInt(req.params.id)
        let { name, email, senha } = req.body
        senha = bcrypt.hashSync(senha, 10)  
        pool.query(
          'UPDATE users SET name = ?, email = ?, senha = ?, cep = ?,estado = ?,cidade = ?,bairro = ?,rua = ?,numero = ?,complemento = ? WHERE id = ?',
          [usernamevalue, emailvalue,hashing,cepvalue,estadovalue,cidadevalue,bairrovalue,ruavalue,numerovalue,complementovalue, id],
          (error, results) => {
            if (error) {
              throw error
            }
            resp.status(200).send(`User modified with ID: ${id}`)
          }
        )
    }

    deleteUser(req, resp) {
        const id = parseInt(req.params.id)
  
        pool.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            throw error
        }
        resp.status(200).send(`User deleted with ID: ${id}`)
        })
    }
    async login(req, resp){
      console.log("teste")
      try {
        const {emailvalue,senha} = req.body;
        const user = await User.findOne({ where: { email: emailvalue } });
        if (user) {
          if(bcrypt.compareSync(senha, user.senha)){
            const token = jwt.sign({ sub: user.id}, process.env.KEY, {
              expiresIn: '1h' // Defina a expiração do token como apropriado
            });
          
            resp.json({ token });

          }
          else{
            resp.status(404).json({ error: 'Senha incorreta.' });
          }
        } else {
          resp.status(404).json({ error: 'Usuário não encontrado.' });
        }
      } catch (error) {
        console.error(error);
        resp.status(500).json({ error: 'Erro ao buscar o usuário.' });
      }
    }
    authorize(req, res, next) {
        const token = req.headers.authorization;
    
        if (!token) {
          return res.status(401).json({ message: 'Token não fornecido' });
        }
    
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'Token inválido' });
          }
          next();
        });
      
    }
    

}

module.exports = {UserRepository}


