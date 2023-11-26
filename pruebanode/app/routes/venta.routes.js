module.exports = app => {
    const libro = require("../controllers/ventadao.controller.js");
    var router = require("express").Router();
    router.post("/", libro.create);
    router.get("/", libro.findAll);
    router.get("/:id", libro.findOne);

    // Agregar una ruta para la eliminación de ventas por ID
    router.delete("/:id", libro.delete);

    // Agregar una ruta para la edición de ventas por ID
    router.put("/:id", libro.update)
    app.use('/api/venta', router);
};