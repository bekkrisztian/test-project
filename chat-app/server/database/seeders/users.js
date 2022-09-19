"use strict";

const bcrypt = require("bcrypt")

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.bulkInsert("Users", [
            {
                firstName: "Jakab",
                lastName: "Janos",
                email: "jakab.janos@gmail.com",
                password: bcrypt.hashSync("password", 10),
                gender: "male"
            },
            {
                firstName: "Lajos",
                lastName: "Bela",
                email: "lajos.bela@gmail.com",
                password: bcrypt.hashSync("password", 10),
                gender: "male"
            },
            {
                firstName: "Istvan",
                lastName: "Nagy",
                email: "istvan.nagy@gmail.com",
                password: bcrypt.hashSync("password", 10),
                gender: "female"
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    }
};
