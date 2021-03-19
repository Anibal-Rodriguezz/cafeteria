module.exports = (sequelize, DataTypes) => {
    const Ingrediente = sequelize.define("ingrediente", {
      nombre: {
        type: DataTypes.STRING
      },
      cantidad: {
        type: DataTypes.STRING
      },
      descripcion: {
        type: DataTypes.STRING
      }
    });
  
    return Ingrediente;
  };
  