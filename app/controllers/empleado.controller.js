const { empleado } = require('../models');
const db = require('../models');
const Empleado= db.empleado;
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
    const empleado = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      dpi: req.body.dpi,
      direccion: req.body.direccion,
      telefono: req.body.telefono
    }; 
  
    // guardar en Base de datos
    Empleado.create(empleado)
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
  
    empleado.findAll({ where: condition })
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
  
    empleado.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al recuperar el empleado con id=" + id
        });
      });
  };
  //##################  Actualizar  ##########################################
  exports.update = (req, res) => {
    const id = req.params.id;
  
    empleado.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "El empleado se actualizó correctamente."
          });
        } else {
          res.send({
            message: `No se puede actualizar el empleado con id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar el empleado con id=" + id
        });
      });
  };

  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    empleado.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "¡El empleado se eliminó correctamente!"
          });
        } else {
          res.send({
            message: `No se puede eliminar el empleado con id = $ {id}. ¡Quizás no se encontró el empleado!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo eliminar el empleado con id=" + id
        });
      });
  };