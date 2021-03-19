const { ingrediente } = require('../models');
const db = require('../models');
const Ingrediente= db.ingrediente;
const Op=db.Sequelize.Op;

exports.create = (req, res) => {
    // validar qu el campo nobre este lleno
    if (!req.body.nombre) {
      res.status(400).send({
        message: "¡El contenido no puede estar vacío!"
      });
      return;
    }

  
    // crear objeto
    const ingrediente = {
        nombre: req.body.nombre,
        cantidad:req.body.cantidad,
        Descripcion: req.body.Descripcion
    };
  
    // guardar en Base de datos
    Ingrediente.create(ingrediente)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Se produjo un error al crear la información"
        });
      });
    
  };
//#########################   mostrar data  ###################################
  exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
  
    ingrediente.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Se produjo un error al recuperar la información."
        });
      });
  };
  //###########################################################################

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ingrediente.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al recuperar el ingrediente con id=" + id
        });
      });
  };
  //##################  Actualizar  ##########################################
  exports.update = (req, res) => {
    const id = req.params.id;
  
    ingrediente.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "El ingrediente se actualizó correctamente."
          });
        } else {
          res.send({
            message: `No se puede actualizar el ingrediente con id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar el ingrediente con id=" + id
        });
      });
  };

  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    ingrediente.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "¡El ingrediente se eliminó correctamente!"
          });
        } else {
          res.send({
            message: `No se puede eliminar el ingrediente con id = $ {id}. ¡Quizás no se encontró el ingrediente!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo eliminar el ingrediente con id=" + id
        });
      });
  };