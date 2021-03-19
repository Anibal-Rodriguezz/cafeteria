module.exports = (sequelize, DataTypes) => {
    const Empleado = sequelize.define("empleado", {
      nit: {
        type: DataTypes.STRING
      },
      apellido: {
        type: DataTypes.STRING
      },
      dpi:{
        type: DataTypes.STRING
      },
      direccion: {
        type: DataTypes.STRING
      },
      telefono: {
        type: DataTypes.STRING
      }

    });
  
    return Empleado;
  };
  