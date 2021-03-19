const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

//verifica el token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "¡No se ha proporcionado ningún token!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "¡No autorizado!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
//verifica rol admin
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "¡Requiere rol de administrador!"
      });
      return;
    });
  });
};
//verifica rol mesero
iswaiter = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "waiter") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require waiter Role!"
      });
    });
  });
};
//verifica dos roles admin y usuario
isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};
//tipos de permisos para acceder servicios
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  iswaiter: iswaiter,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
