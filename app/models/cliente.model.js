module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define("cliente", {
      nit: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING
      },
      apellido:{
        type: DataTypes.STRING
      },
      telefono: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      }

    });
  
    return Cliente;
  };
  