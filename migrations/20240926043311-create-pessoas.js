'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pessoas', {
      id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      nome:{
        type: Sequelize.STRING(150),
        allowNull: false
      },
      createdAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },

    })
    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

 
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pessoas');

    // Aqui, criamos a tabela inversa na reversão
    await queryInterface.createTable('pessoas_inversas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      nomeInverso: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      emailInverso: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      inativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,  // Pessoas nesta tabela são inativas
      },
      createdAtInverso: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAtInverso: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
};
