module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define("menu", {
      nombre: {
        type: DataTypes.STRING
      },
      descripcion: {
        type: DataTypes.STRING
      }
    });
  
    return Menu;
  };
 