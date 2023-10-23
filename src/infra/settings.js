const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST, // A porta do MySQL, se não for a padrão (3306)
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

const User = sequelize.define('Formulario2', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  rua: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  complemento: {
    type: DataTypes.STRING(255),
  },
  created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'formulario2',
  timestamps: false,
});

module.exports = {sequelize,User};

