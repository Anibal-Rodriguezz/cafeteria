const { cliente } = require('../models');
const db = require('../models');
const Cliente= db.cliente;
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
    const cliente = {
      nit: req.body.nit,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      email: req.body.email      
    }; 
  
    // guardar en Base de datos
    Cliente.create(cliente)
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
  
    Cliente.findAll({ where: condition })
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
  
    Cliente.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al recuperar el cliente con id=" + id
        });
      });
  };
  //##################  Actualizar  ##########################################
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Cliente.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "El cliente se actualizó correctamente."
          });
        } else {
          res.send({
            message: `No se puede actualizar el cliente con id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar el cliente con id=" + id
        });
      });
  };

  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Cliente.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "¡El cliente se eliminó correctamente!"
          });
        } else {
          res.send({
            message: `No se puede eliminar el cliente con id = $ {id}. ¡Quizás no se encontró el cliente!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo eliminar el cliente con id=" + id
        });
      });
  };