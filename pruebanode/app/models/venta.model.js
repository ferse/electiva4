module.exports = (sequelize, Sequelize) => {
    const Libro = sequelize.define("Libro", {
        titulo: {
            type: Sequelize.STRING
        },
        autor: {
            type: Sequelize.STRING
        },
        editorial: {
            type: Sequelize.STRING
        },
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Libro;
};