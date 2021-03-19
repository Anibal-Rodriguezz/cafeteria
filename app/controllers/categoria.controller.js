const { categoria } = require('../models');
const db = require('../models');
const Categoria= db.categoria;
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
    const categoria = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      
    }; 
  
    // guardar en Base de datos
    Categoria.create(categoria)
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
  
    Categoria.findAll({ where: condition })
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
  
    Categoria.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al recuperar el Categoria con id=" + id
        });
      });
  };
  //##################  Actualizar  ##########################################
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Categoria.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "El categoria se actualizó correctamente."
          });
        } else {
          res.send({
            message: `No se puede actualizar el categoria con id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error al actualizar el categoria con id=" + id
        });
      });
  };

  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Categoria.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "¡El categoria se eliminó correctamente!"
          });
        } else {
          res.send({
            message: `No se puede eliminar el categoria con id = $ {id}. ¡Quizás no se encontró el categoria!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo eliminar el categoria con id=" + id
        });
      });
  };