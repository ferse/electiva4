const db = require("../models");
const Libros = db.Libro;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.titulo) {
        res.status(400).send({
            message: "Debe enviar el titulo del libro!"
        });
        return;
    }
    // crea una venta
    const libro = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial
    };
    // Guardamos a la base de datos
    Libros.create(libro)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ha ocurrido un error al crear el libro."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Libros.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener libro con id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { titulo: { [Op.iLike]: `%${nombre}%` } } : null;
    Libros.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrio un error al obtener los libros."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Libros.destroy({ where: { id: id } })
        .then(() => {
            res.send({ message: 'Libros eliminado exitosamente.' });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al eliminar libro con id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Libros.findByPk(id)
        .then(libro => {
            if (!libro) {
                return res.status(404).send({ message: "Libro no encontrado." });
            }

            // Actualiza los campos con los datos del cuerpo de la solicitud
            libro.titulo = req.body.titulo;
            console.log('libro.titulo', libro.titulo)
            libro.autor = req.body.autor;
            console.log('libro.autor', libro.autor)
            libro.editorial = req.body.editorial;
            console.log('libro.editorial', libro.editorial)

            // Guarda la venta actualizada
            libro.save()
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error al actualizar el libro con id=" + id
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al obtener libro con id=" + id
            });
        });
};