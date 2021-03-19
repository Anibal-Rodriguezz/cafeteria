const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const ingrediente = db.ingrediente;
const menu = db.menu;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('elimina base de datos y crea una nueva base de datos');
  initial();
});

// ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "api cafeteria" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/ingrediente.routes")(app);
require("./app/routes/menu.routes")(app);
require("./app/routes/empleado.routers")(app);
require("./app/routes/categoria.routers")(app);
require("./app/routes/cliente.routers")(app);



// puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
}); 

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "waiter"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });


  ingrediente.create({
    id: 1,
    nombre: "azucar",
    cantidad: "5",
    descripcion: "azucar endulsante"
  });
 
  ingrediente.create({
    id: 2,
    nombre: "cocoa",
    cantidad: "5",
    descripcion: "complemento artificial sabor chocolate"
  });

  menu.create({
    id: 1,
    nombre: "cafe",
    cantidad: "70",
    descripcion: "menu de cocina",
    ingredienteId:["2"]
  });
 
  menu.create({
    id: 2,
    nombre: "fresco",
    cantidad: "30",
    descripcion: "platio fuerte",
    ingredienteId:["1"]
  });
  
}