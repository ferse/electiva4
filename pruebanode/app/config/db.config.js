module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "admin",
    PORT: 5432, //3333
    DB: "bdpwb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};